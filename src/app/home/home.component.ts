import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule,PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductService) {
    console.log("test!!");
  }
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  // this will be called when the productOutput event is emitted
  onProductOutput(product: Product) {
    console.log(product);
  
  }
  fetchProducts(page: number, perPage: number) {
    this.productsService
    .getProducts('http://localhost:3000/clothes',{page,perPage})
    .subscribe((products: Products) => {
      this.products = products.items;
      this.totalRecords = products.total;
    });
  }
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }
  ngOnInit() {
    console.log("test!!");
    this.fetchProducts(0, 5);
  }
}
