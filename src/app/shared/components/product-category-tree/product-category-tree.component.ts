/*
 * Copyright (c) 2021 The Trébol eCommerce Project
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
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { COMMON_DISMISS_BUTTON_LABEL } from 'src/text/messages';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation/confirmation-dialog.component';
import { ConfirmationDialogData } from '../../dialogs/confirmation/ConfirmationDialogData';
import { EntityFormDialogComponent } from '../../dialogs/entity-form-dialog/entity-form-dialog.component';
import { EntityFormDialogData } from '../../dialogs/entity-form-dialog/EntityFormDialogData';
import { ProductCategoryFormComponent } from '../product-category-form/product-category-form.component';
import { ProductCategoryTreeService } from './product-category-tree.service';
import { ProductCategoryTreeFlatNode } from './ProductCategoryTreeFlatNode';

@Component({
  selector: 'app-product-category-tree',
  templateUrl: './product-category-tree.component.html',
  styleUrls: ['./product-category-tree.component.css'],
  providers: [ ProductCategoryTreeService ]
})
export class ProductCategoryTreeComponent
  implements OnInit, OnDestroy {

  private flatNodeMap = new Map<ProductCategoryTreeFlatNode, ProductCategory>();
  private nestedNodeMap = new Map<ProductCategory, ProductCategoryTreeFlatNode>();
  private dataChangesSubscription: Subscription;
  private treeFlattener: MatTreeFlattener<ProductCategory, ProductCategoryTreeFlatNode>;

  @Input()
  get categories() { return this.dataSource.data; }
  set categories(v: ProductCategory[]) {
    this.service.setRootCategories(v);
  }

  @Input() editable = false;
  @Input() selectionEnabled = false;
  @Output() selection = new EventEmitter<ProductCategory>();

  dataSource: MatTreeFlatDataSource<ProductCategory, ProductCategoryTreeFlatNode>;
  treeControl: FlatTreeControl<ProductCategoryTreeFlatNode>;

  @ViewChild(MatTree, { static: true }) matTree: MatTree<ProductCategory>;

  constructor(
    private service: ProductCategoryTreeService,
    private snackbarService: MatSnackBar,
    private dialogService: MatDialog
  ) {
    this.initialize();
  }

  ngOnInit(): void {
    this.dataChangesSubscription = this.service.categories$.pipe(
      debounceTime(100)
    ).subscribe(next => (this.dataSource.data = next));
  }

  ngOnDestroy(): void {
    this.dataChangesSubscription?.unsubscribe();
  }

  hasChild = (_: number, node: ProductCategoryTreeFlatNode) => (node.expandable);

  toggleNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to show or hide subcategories of parent of name {{ parentName }}:Expand/collapse '${n.name}':parentName:`);
  addChildNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to create a subcategory in parent of name {{ parentName }}:New subcategory in '${n.name}':parentName:`);
  editNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to edit category of name {{ name }}:Edit category '${n.name}':name:`);
  deleteNodeLabel = (n: ProductCategoryTreeFlatNode) => ($localize`:Label for action button to delete category of name {{ name }}:Delete category '${n.name}':name:`);

  onClickAddChildNodeTo(parentNode: ProductCategoryTreeFlatNode): void {
    const parent = this.flatNodeMap.get(parentNode);
    this.requestCategoryName().pipe(
      switchMap(newNode => this.service.addNode(newNode, parent)),
      tap(() => this.matTree.renderNodeChanges(this.dataSource.data)), // TODO optimize this?
      tap(() => this.treeControl.expand(parentNode))
    ).subscribe(
      (next: ProductCategory) => {
        this.snackbarService.open($localize`:Message of success after creating subcategory with name {{ name }}:Subcategory '${next.name}':name: was created`, COMMON_DISMISS_BUTTON_LABEL);
      },
      error => {
        this.snackbarService.open($localize`:Message of error during creation of subcategory:Subcategory could not be created`, COMMON_DISMISS_BUTTON_LABEL);
      }
    );
  }

  onClickEditNode(treeNode: ProductCategoryTreeFlatNode): void {
    const node = this.flatNodeMap.get(treeNode);
    this.requestCategoryName(node).pipe(
      switchMap(newNode => this.service.editNode(node, newNode))
    ).subscribe(
      (next: ProductCategory) => {
        this.snackbarService.open($localize`:Message of success after renaming category to {{ name }}:Category was renamed to '${next.name}'`, COMMON_DISMISS_BUTTON_LABEL);
      },
      error => {
        this.snackbarService.open($localize`:Message of error while renaming category:Category could not be renamed`, COMMON_DISMISS_BUTTON_LABEL);
      }
    );
  }

  onClickDeleteNode(treeNode: ProductCategoryTreeFlatNode): void {
    const node = this.flatNodeMap.get(treeNode);
    this.requestConfirmation(
      '¿Segur@ que desea eliminar la categoría? ' +
      'Esto incluirá todas las categorías descendientes. ' +
      'Los productos asociados no serán eliminados, pero quedarán sin categoría alguna.'
    ).pipe(
      switchMap(() => this.service.deleteNode(node)),
      tap(() => this.matTree.renderNodeChanges(this.dataSource.data)) // TODO optimize this?
    ).subscribe(
      next => {
        this.snackbarService.open($localize`:Message of success after deleting category:Category was deleted`, COMMON_DISMISS_BUTTON_LABEL);
      },
      error => {
        this.snackbarService.open($localize`:Message of error while deleting category:Category could not be deleted`, COMMON_DISMISS_BUTTON_LABEL);
      }
    );
  }

  onClickTreeNode(treeNode: ProductCategoryTreeFlatNode): void {
    if (this.selectionEnabled) {
      const sel = this.flatNodeMap.get(treeNode);
      this.selection.emit(sel);
    }
  }

  private initialize(): void {
    this.treeControl = new FlatTreeControl(
      (node: ProductCategoryTreeFlatNode) => node.level,
      (node: ProductCategoryTreeFlatNode) => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      (node: ProductCategory, level: number) => this.transformNode(node, level),
      (node: ProductCategoryTreeFlatNode) => node.level,
      (node: ProductCategoryTreeFlatNode) => node.expandable,
      (node: ProductCategory) => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  private transformNode(node: ProductCategory, level: number) {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = (existingNode) ? existingNode : new ProductCategoryTreeFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  private requestCategoryName(item?: ProductCategory): Observable<ProductCategory> {

    // USE
    const data: EntityFormDialogData<ProductCategory> = {
      item,
      formComponent: ProductCategoryFormComponent,
      service: null
    };
    return this.dialogService.open(
      EntityFormDialogComponent,
      {
        width: '30rem',
        data
      }
    ).afterClosed().pipe(
      filter(name => (!!name))
    );
  }

  private requestConfirmation(message: string): Observable<string> {
    const data: ConfirmationDialogData = {
      title: 'Confirme la acción',
      message
    };
    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        data,
        disableClose: true,
        maxWidth: '30rem'
      }
    ).afterClosed().pipe(
      filter(confirmed => (confirmed === true))
    );
  }

}
