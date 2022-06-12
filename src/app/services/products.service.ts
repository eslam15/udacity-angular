import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { map } from 'rxjs/operators';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  APIUrl = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) { }

  fetchProductsList(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.APIUrl);
  }

  fetchProductDetails(productId: number): Observable<ProductModel> {
    return this.http.get<any>(this.APIUrl).pipe(
      map(el => el.find((product: ProductInterface) => product.id === productId),
    ));
  }
}
