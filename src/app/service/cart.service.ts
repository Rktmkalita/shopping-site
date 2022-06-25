import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartList: any = [];
  public productList = new BehaviorSubject<any>([]); //Requires an initial value and emits the current value to new subscribers
  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.cartList.push(product);
    this.productList.next(this.cartList);
    this.getGrandTotal();
    console.log(this.cartList);
  }

  getGrandTotal() {
    let grandTotal = 0;
    this.cartList.map((prd: any) => {
      grandTotal += prd.total;
    });
  }

  removeCartItem(product: any) {
    this.cartList.map((prd: any, index: any) => {
      if (product.id === prd.id) {
        this.cartList.splice(index, 1);
      }
    });
  }

  emptyCart() {
    this.cartList = [];
    this.productList.next(this.cartList);
  }
}