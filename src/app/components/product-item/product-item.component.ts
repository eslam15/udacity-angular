import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: ProductInterface = { id: 0, name: '', price: 0, url: '', description: ''};

  constructor(private productsService: ProductsService, private router: Router) { }

  getProductDetails(product: ProductInterface) {
    this.router.navigateByUrl(`product-details/${product?.id}`);
    this.productsService.fetchProductDetails(product?.id).subscribe((res: ProductInterface) => {
      console.log(res);
    })
  }

}
