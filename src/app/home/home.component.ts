import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule, Paginator } from 'primeng/paginator';

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
  @ViewChild('paginator') paginator: Paginator | undefined;
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
  // this will be called when the component is initialized
  ngOnInit() {
    console.log("test!!");
    this.fetchProducts(0, 5);
  }
  
  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        //if success, fetch products again
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }
}
