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
import { Observable, Subscription, timer } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
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
  nestedNodeMap: Map<ProductCategory, ProductCategoryTreeFlatNode>;
  flatNodeMap: Map<ProductCategoryTreeFlatNode, ProductCategory>;

  @ViewChild(MatTree, { static: true }) matTree: MatTree<ProductCategory>;

  constructor(
    private service: ProductCategoryTreeService,
    private snackbarService: MatSnackBar,
    private dialogService: MatDialog,
    private sharedDialogService: SharedDialogService
  ) {
    this.treeControl = new FlatTreeControl(
      (node: ProductCategoryTreeFlatNode) => node.level,
      (node: ProductCategoryTreeFlatNode) => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      (category: ProductCategory, level: number) => this.transformer(category, level),
      (node: ProductCategoryTreeFlatNode) => node.level,
      (node: ProductCategoryTreeFlatNode) => node.expandable,
      (category: ProductCategory) => category.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.nestedNodeMap = new Map<ProductCategory, ProductCategoryTreeFlatNode>();
    this.flatNodeMap = new Map<ProductCategoryTreeFlatNode, ProductCategory>();
  }

  ngOnInit(): void {
    this.service.reloadCategories();
    this.dataChangesSubscription = this.service.categories$.pipe(
      tap(next => {
        this.nestedNodeMap.clear();
        this.flatNodeMap.clear();
        this.dataSource.data = next;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.dataChangesSubscription?.unsubscribe();
    this.selection.complete();
  }

  hasChild = (_: number, node: ProductCategoryTreeFlatNode) => (node.expandable);

  toggleNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to show or hide subcategories of parent of name {{ parentName }}:Expand/collapse '${n.name}:parentName:'`);
  addChildNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to create a subcategory in parent of name {{ parentName }}:New subcategory in '${n.name}:parentName:'`);
  editNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to edit category of name {{ name }}:Edit category '${n.name}:name:'`);
  deleteNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to delete category of name {{ name }}:Delete category '${n.name}:name:'`);

  onClickAddChildNodeTo(parentNode: ProductCategoryTreeFlatNode): void {
    if (this.editable) {
      const category = this.flatNodeMap.get(parentNode);
      if (category) {
        this.requestCategoryData({
          item: {
            parent: {
              code: category.code,
              name: category.name
            }
          } as ProductCategory
        }).pipe(
          switchMap(newNode => this.service.add(newNode)),
          tap(
            next => {
              this.treeControl.expand(parentNode);
              this.snackbarService.open($localize`:Message of success after creating subcategory with name {{ name }}:Subcategory '${next.name}:name:' was created`, COMMON_DISMISS_BUTTON_LABEL);
            },
            error => {
              this.snackbarService.open($localize`:Message of error during creation of subcategory:Subcategory could not be created`, COMMON_DISMISS_BUTTON_LABEL);
            }
          )
        ).subscribe();
      }
    }
  }

  onClickEditNode(treeNode: ProductCategoryTreeFlatNode): void {
    if (this.editable) {
      const category = this.flatNodeMap.get(treeNode);
      this.requestCategoryData({
        item: category,
        isNewItem: false
      }).pipe(
        switchMap(result => this.service.edit(result, category)),
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
  }

  onClickDeleteNode(treeNode: ProductCategoryTreeFlatNode): void {
    if (this.editable) {
      this.sharedDialogService.requestConfirmation({
        title: $localize`:Title of dialog prompt to confirm deletion:Confirm deletion`,
        message: $localize`:Paragraph asking confirmation to delete a category, and explaining that deleting it cascades to its descendants, but not to related products which are detached from the relationship:Are you sure to delete the category? This will include all its descendants. Related products will not be deleted, and instead will be marked as not having a category.`
      }).pipe(
        filter(didConfirm => didConfirm),
        map(() => this.flatNodeMap.get(treeNode)),
        switchMap(category => this.service.remove(category)),
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
  }

  onClickTreeNode(treeNode: ProductCategoryTreeFlatNode): void {
    if (this.selectionEnabled) {
      const category = this.flatNodeMap.get(treeNode);
      this.selection.emit(category);
    }
  }

  private transformer(category: ProductCategory, level: number) {
    const flatNode = new ProductCategoryTreeFlatNode();
    flatNode.name = category.name;
    flatNode.level = level;
    flatNode.expandable = !!(category.children?.length);
    this.flatNodeMap.set(flatNode, category);
    this.nestedNodeMap.set(category, flatNode);
    return flatNode;
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
