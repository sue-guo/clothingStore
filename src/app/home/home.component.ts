import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductService) {
    console.log("test!!");
  }
  products: Product[] = [];

  ngOnInit() {
    console.log("test!!");
    this.productsService
    .getProducts('http://localhost:3000/clothes',{page:0,perPage:5})
    .subscribe((products: Products) => {
      console.log(products.items);
      this.products = products.items;
    });
  }
}
