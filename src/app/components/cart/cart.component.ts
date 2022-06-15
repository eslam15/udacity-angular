import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('removeFromCartAlert', { static: false }) removeFromCartAlert: AlertPopupComponent = {} as AlertPopupComponent;

  cartItems: ProductInterface[] = [];
  cartTotal: number = 0;
  paymentFullName: string = '';
  paymentAddress: string = '';
  paymentCard: string = '';
  removedFromCartBody: string = '';
  removedFromCartHeader: string = '';
  confirmationUrl: string = '/confirmation'

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')!) || [];
    if (this.cartItems?.length) {
      this.calculateCartTotal();
    }
  }

  onChangeAmount(cartItem: ProductInterface, itemIndex: number): void {
    this.resetCartTotal();
    this.productsService.updateCartItems(cartItem);
    if (!cartItem?.amount) {
      this.removeFromCart(cartItem, itemIndex);
    }
  }

  removeFromCart(cartItem: ProductInterface, itemIndex: number): void {
    this.removedFromCartBody = `${cartItem?.name} has been removed from cart successfully!`;
    this.removedFromCartHeader = `Removed from cart`;
    this.removeFromCartAlert.showModal(); 
    this.cartItems.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.resetCartTotal();
  }

  calculateCartTotal(): number {
    for (let product of this.cartItems) {
      this.cartTotal += product.amount === 1 ? product.price : product.price * product.amount;
    }
    return this.cartTotal;
  }

  resetCartTotal () {
    this.cartTotal = 0;
    if (this.cartItems?.length) {
      this.calculateCartTotal();
    }
  }

  onSubmit() {
    localStorage.setItem('cartItems', JSON.stringify([]));
    this.productsService.confirmPayment(this.paymentFullName, this.cartTotal);
    this.router.navigateByUrl(this.confirmationUrl);
  }

}
