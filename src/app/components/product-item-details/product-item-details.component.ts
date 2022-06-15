import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.css']
})
export class ProductItemDetailsComponent implements OnInit {
  @ViewChild('addToCartAlert', { static: false }) addToCartAlert: AlertPopupComponent = {} as AlertPopupComponent;
  productDetails: ProductInterface  = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
    amount: 1
  };
  addToCartBody: string = '';
  addToCartHeader: string = '';

  constructor(private acivedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    const PRODUCT_ID = +this.acivedRoute?.snapshot?.params['id'];
    if (PRODUCT_ID) this.getProductDetails(PRODUCT_ID);
  }

  getProductDetails(productId: number) {
    this.productsService.fetchProductDetails(productId).subscribe({
      next: (res: ProductInterface) => {
        this.productDetails = res;
        this.productDetails.amount = 1;
      }
    });
  }

  addToCart(product: ProductInterface) {
    this.addToCartBody = `${product?.name} has been added to cart successfully!`;
    this.addToCartHeader = `Added to cart`;
    this.addToCartAlert.showModal(); 
    this.productsService.updateCartItems(product);
  }

}
