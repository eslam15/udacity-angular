import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @ViewChild('addToCartAlert', { static: false })
  addToCartAlert: AlertPopupComponent = {} as AlertPopupComponent;
  @Output() onSelectProduct: EventEmitter<void> = new EventEmitter<void>();
  @Input() product: ProductInterface = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
    amount: 0,
    isSelected: false,
  };

  addToCartBody: string = '';
  addToCartHeader: string = '';

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  getProductDetails(product: ProductInterface): void {
    this.router.navigateByUrl(`product-details/${product?.id}`);
  }

  addToCart(product: ProductInterface): void {
    this.addToCartBody = `${product?.name} has been added to cart successfully!`;
    this.addToCartHeader = `Added to cart`;
    this.addToCartAlert.showModal();
    this.productsService.updateCartItems(product);
  }

  selectProduct(product: ProductInterface): void {
    product.isSelected = !product.isSelected;
    this.onSelectProduct.emit();
  }
}
