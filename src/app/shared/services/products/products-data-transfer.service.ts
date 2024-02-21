import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/request/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null); //Quando uma propriedade retornar um Observable, deve-se usar o $ por convenção
  public productsDatas: Array<GetAllProductsResponse> = [];



  constructor() { }

  setProductsDatas(products: Array<GetAllProductsResponse>): void {
    if(products) {
      this.productsDataEmitter$.next(products);
      this.getProductsData();
    }
  }

  getProductsData() {
    this.productsDataEmitter$.pipe(
      take(1),
      map((data) => data?.filter((product) => product.amount > 0))
    ).subscribe({
      next: (response) => {
        if (response) {
          this.productsDatas = response;
        }
      }
    });
    return this.productsDatas;
  }

}
