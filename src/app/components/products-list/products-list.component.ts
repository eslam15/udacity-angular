import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  productsList: ProductInterface[] = [];
  selectedProductsCount: number = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(): void {
    this.productsService.fetchProductsList().subscribe((res: ProductInterface[]) => { 
      this.productsList = res;
      this.productsList.map((el: ProductInterface) => { 
        el.amount = 1;
        el.isSelected = false;
      });
    });
  }

  updateSelectedProductsCount(): void {
    this.selectedProductsCount = this.productsList.filter((el: ProductInterface) => el.isSelected).length;
  }
}
