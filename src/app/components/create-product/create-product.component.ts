import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  standalone: false,

  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      pointCost: [0, [Validators.required, Validators.min(1)]]
    });
  }

  // Soumettre le formulaire pour créer un produit
  async onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      await this.productService.addProduct(
        productData.name,
        productData.description,
        productData.pointCost
      );
      console.log('Produit créé avec succès:', productData);
    } else {
      console.log('Formulaire invalide');
    }
  }
}
