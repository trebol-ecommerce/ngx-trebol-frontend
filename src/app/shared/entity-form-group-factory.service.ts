/*
 * Copyright (c) 2022 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EntityTypeName } from 'src/models/EntityTypeNames';

@Injectable({ providedIn: 'root' })
export class EntityFormGroupFactoryService {

  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }

  // TODO support setting initial value for every one of these forms
  createFormGroupFor(typeName: EntityTypeName): UntypedFormGroup | null {
    switch (typeName) {
      case 'address': return this.createAddressFormGroup();
      case 'image': return this.createImageFormGroup();
      case 'person': return this.createPersonFormGroup();
      case 'product': return this.createProductFormGroup();
      case 'productCategory': return this.createProductCategoryFormGroup();
      case 'productList': return this.createProductListFormGroup();
      case 'sell': return this.createSellFormGroup();
      case 'shipper': return this.createShipperFormGroup();
      case 'user': return this.createUserFormGroup();
    }
  }

  private createAddressFormGroup() {
    return this.formBuilder.group({
      city: ['', Validators.required],
      municipality: ['', Validators.required],
      firstLine: ['', Validators.required],
      secondLine: [''],
      notes: ['']
    });
  }


  private createImageFormGroup() {
    return this.formBuilder.group({
      filename: ['', Validators.required],
      url: ['', Validators.required],
      code: [null]
      // file: ['', Validators.required]
    });
  }

  private createPersonFormGroup() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['', Validators.required],
      email: ['', Validators.required],
      phone1: [''],
      phone2: ['']
    });
  }

  private createProductFormGroup() {
    return this.formBuilder.group({
      images: [[]],
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      category: [null],
      price: [null, Validators.required],
      // stock: [''],
      // criticalStock: [''],
      description: ['']
    });
  }

  private createProductCategoryFormGroup() {
    return this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      parent: [null]
    });
  }

  private createProductListFormGroup() {
    return this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      totalCount: [0]
    });
  }

  private createSellFormGroup() {
    return this.formBuilder.group({
      date: [{ value: new Date(), disabled: true }],
      billingType: ['', Validators.required],
      salesperson: [null],
      customer: [null, Validators.required]
    });
  }

  private createShipperFormGroup() {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  private createUserFormGroup() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      password: [null],
      person: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

}
