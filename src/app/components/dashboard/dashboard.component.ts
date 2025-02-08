import { Component } from '@angular/core';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products: Product[] = [];

  displayedColumns: string[] = ['name', 'description', 'pointCost']; // Colonnes à afficher dans la table

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Charger tous les produits depuis le service
  async loadProducts() {
    this.products = await this.productService.getProducts();
    console.log(this.products);
  }
}
