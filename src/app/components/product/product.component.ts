import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductComponent,RatingModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  // Define the product input property, this will be passed from the parent component
  @Input() product!: Product;
  // Define the productOutput event, this will be (emitted)(发射) to the parent component
  @Output()  productOutput: EventEmitter<Product>  = new EventEmitter<Product>();

  ngOnInit(){
    this.productOutput.emit(this.product);
  }
}
