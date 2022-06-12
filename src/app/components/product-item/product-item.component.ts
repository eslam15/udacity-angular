import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: ProductInterface= { id: 0, name: '', price: 0, url: '', description: ''};

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  getProductDetails(product: ProductInterface) {
    debugger
    this.router.navigateByUrl(`product-details/${product?.id}`);
    this.productsService.fetchProductDetails(product?.id).subscribe(res => {
      console.log(res);
    })
  }

}
