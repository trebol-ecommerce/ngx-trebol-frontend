/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ProductCategoryPickerDialogComponent } from 'src/app/shared/dialogs/product-category-picker/product-category-picker-dialog.component';
import { ProductSearchQuery } from 'src/models/StoreSearchQuery';
import { StoreSearchService } from '../../../store-search.service';

@Component({
  selector: 'app-store-header-search-form',
  templateUrl: './store-header-search-form.component.html',
  styleUrls: ['./store-header-search-form.component.css']
})
export class StoreHeaderSearchFormComponent
  implements OnInit, OnDestroy {

  private productSearchChanges: Subscription;

  formGroup: FormGroup;

  get nameLike() { return this.formGroup.get('nameLike') as FormControl; }
  get categoryCode() { return this.formGroup.get('categoryCode') as FormControl; }

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: MatDialog,
    private searchService: StoreSearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      nameLike: [''],
      categoryCode: [null]
    });
  }

  ngOnInit(): void {
    this.productSearchChanges = this.formGroup.valueChanges.pipe(
      debounceTime(400),
      tap(value => {
        if ((value.nameLike as string)?.trim() === '') { value.nameLike = ''; }
        this.searchService.searchQuery = (value as ProductSearchQuery);
        this.searchService.pageIndex = 0;
      }),
      switchMap(() => this.searchService.reload())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.productSearchChanges?.unsubscribe();
  }

  onTouched(): void {
    if (this.route.firstChild.routeConfig.path !== 'search') {
      this.router.navigateByUrl('/store/search');
    }
  }

  onClickOpenCategoryPicker(): void {
    this.dialogService.open(
      ProductCategoryPickerDialogComponent,
      {
        width: '24rem'
      }
    ).afterClosed().pipe(
      tap(next => {
        if (next?.code) {
          this.categoryCode.setValue(next.code);
          this.categoryCode.markAsDirty();
        } else if (next === null) {
          this.categoryCode.reset({ value: null });
        }
      })
    ).subscribe();
  }

  onClickResetForm(): void {
    this.formGroup.reset({
      nameLike: '',
      categoryCode: null
    });
    this.searchService.searchQuery = new ProductSearchQuery();
  }

}
