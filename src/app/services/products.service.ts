import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { map } from 'rxjs/operators';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  APIUrl = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) {}

  fetchProductsList(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.APIUrl);
  }

  fetchProductDetails(productId: number): Observable<ProductModel> {
    return this.http
      .get<any>(this.APIUrl)
      .pipe(
        map((el) =>
          el.find((product: ProductInterface) => product?.id === productId)
        )
      );
  }

  updateCartItems(product: ProductInterface) {
    const CART_ITEMS = JSON.parse(localStorage.getItem('cartItems')!) || [];
    let isItemExist = CART_ITEMS.some(
      (el: ProductInterface) => el.id === product.id
    );
    if (!isItemExist) {
      CART_ITEMS.push(product);
    } else {
      let currentItem = CART_ITEMS.find(
        (el: ProductInterface) => el.id === product.id
      );
      if (currentItem) {
        currentItem.amount = product?.amount;
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(CART_ITEMS));
  }

  confirmPayment(name: string, total: number) {
    localStorage.setItem(
      'paymentDetails',
      JSON.stringify({ name: name, total: total })
    );
  }
}
