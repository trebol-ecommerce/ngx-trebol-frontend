/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { COMMON_DISMISS_BUTTON_LABEL } from 'src/text/messages';
import { EntityFormDialogComponent } from '../../../management/dialogs/entity-form/entity-form-dialog.component';
import { EntityFormDialogData } from '../../../management/dialogs/entity-form/EntityFormDialogData';
import { SharedDialogService } from '../../dialogs/shared-dialog.service';
import { ProductCategoryTreeService } from './product-category-tree.service';
import { ProductCategoryTreeFlatNode } from './ProductCategoryTreeFlatNode';

@Component({
  selector: 'app-product-category-tree',
  templateUrl: './product-category-tree.component.html',
  styleUrls: ['./product-category-tree.component.css']
})
export class ProductCategoryTreeComponent
  implements OnInit, OnDestroy {

  private dataChangesSubscription: Subscription;
  private treeFlattener: MatTreeFlattener<ProductCategory, ProductCategoryTreeFlatNode>;

  @Input() editable = false;
  @Input() selectionEnabled = false;
  @Output() selection = new EventEmitter<ProductCategory>();

  dataSource: MatTreeFlatDataSource<ProductCategory, ProductCategoryTreeFlatNode>;
  treeControl: FlatTreeControl<ProductCategoryTreeFlatNode>;

  @ViewChild(MatTree, { static: true }) matTree: MatTree<ProductCategory>;

  constructor(
    private service: ProductCategoryTreeService,
    private snackbarService: MatSnackBar,
    private dialogService: MatDialog,
    private sharedDialogService: SharedDialogService
  ) { }

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl(
      (node: ProductCategoryTreeFlatNode) => node.level,
      (node: ProductCategoryTreeFlatNode) => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      (node: ProductCategory, level: number) => this.service.transformNode(node, level),
      (node: ProductCategoryTreeFlatNode) => node.level,
      (node: ProductCategoryTreeFlatNode) => node.expandable,
      (node: ProductCategory) => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.service.reloadCategories();
    this.dataChangesSubscription = this.service.categories$.pipe(
      tap(next => { this.dataSource.data = next; })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.dataChangesSubscription?.unsubscribe();
  }

  hasChild = (_: number, node: ProductCategoryTreeFlatNode) => (node.expandable);

  toggleNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to show or hide subcategories of parent of name {{ parentName }}:Expand/collapse '${n.name}:parentName:'`);
  addChildNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to create a subcategory in parent of name {{ parentName }}:New subcategory in '${n.name}:parentName:'`);
  editNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to edit category of name {{ name }}:Edit category '${n.name}:name:'`);
  deleteNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to delete category of name {{ name }}:Delete category '${n.name}:name:'`);

  onClickAddChildNodeTo(parentNode: ProductCategoryTreeFlatNode): void {
    const category = this.service.fetchCategoryFromNode(parentNode);
    this.requestCategoryData({
      item: {
        parent: {
          code: category.code,
          name: category.name
        }
      } as ProductCategory,
      isNewItem: true
    }).pipe(
      switchMap(newNode => this.service.addNode(newNode)),
      tap(
        next => {
          this.matTree.renderNodeChanges(this.dataSource.data); // TODO can this be optimized further?
          this.treeControl.expand(parentNode);
          this.snackbarService.open($localize`:Message of success after creating subcategory with name {{ name }}:Subcategory '${next.name}:name:' was created`, COMMON_DISMISS_BUTTON_LABEL);
        },
        error => {
          console.error(error);
          this.snackbarService.open($localize`:Message of error during creation of subcategory:Subcategory could not be created`, COMMON_DISMISS_BUTTON_LABEL);
        }
      )
    ).subscribe();
  }

  onClickEditNode(treeNode: ProductCategoryTreeFlatNode): void {
    const category = this.service.fetchCategoryFromNode(treeNode);
    this.requestCategoryData({
      item: category,
      isNewItem: false
    }).pipe(
      switchMap(newNode => this.service.editNode(newNode, category)),
      tap(
        (next: ProductCategory) => {
          this.snackbarService.open($localize`:Message of success after renaming category to {{ name }}:Category was renamed to '${next.name}:name:'`, COMMON_DISMISS_BUTTON_LABEL);
        },
        error => {
          this.snackbarService.open($localize`:Message of error while renaming category:Category could not be renamed`, COMMON_DISMISS_BUTTON_LABEL);
        }
      )
    ).subscribe();
  }

  onClickDeleteNode(treeNode: ProductCategoryTreeFlatNode): void {
    const category = this.service.fetchCategoryFromNode(treeNode);
    this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of dialog prompt to confirm deletion:Confirm deletion`,
      message: $localize`:Paragraph asking confirmation to delete a category, and explaining that deleting it cascades to its descendants, but not to related products which are detached from the relationship:Are you sure to delete the category? This will include all its descendants. Related products will not be deleted, and instead will be marked as not having a category.`
    }).pipe(
      filter(didConfirm => didConfirm),
      switchMap(() => this.service.deleteNode(category)),
      tap(
        next => {
          this.matTree.renderNodeChanges(this.dataSource.data); // TODO optimize this?
          this.snackbarService.open($localize`:Message of success after deleting category:Category was deleted`, COMMON_DISMISS_BUTTON_LABEL);
        },
        error => {
          this.snackbarService.open($localize`:Message of error while deleting category:Category could not be deleted`, COMMON_DISMISS_BUTTON_LABEL);
        }
      )
    ).subscribe();
  }

  onClickTreeNode(treeNode: ProductCategoryTreeFlatNode): void {
    if (this.selectionEnabled) {
      const category = this.service.fetchCategoryFromNode(treeNode);
      this.selection.emit(category);
    }
  }

  private requestCategoryData(withData?: Partial<EntityFormDialogData<ProductCategory>>): Observable<ProductCategory> {
    const data: EntityFormDialogData<ProductCategory> = Object.assign(
      {
        isNewItem: true,
        entityType: 'productCategory'
      },
      withData
    );
    return this.dialogService.open(
      EntityFormDialogComponent,
      {
        width: '30rem',
        data
      }
    ).afterClosed().pipe(
      filter(category => (!!category))
    );
  }

}
