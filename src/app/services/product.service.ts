import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  // Méthode pour récupérer tous les produits
  async getProducts() {
    const querySnapshot = await getDocs(collection(this.firestore, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Product);
  }

  // Méthode pour ajouter un produit
  async addProduct(name: string, description: string, pointCost: number) {
    const product: Product = { name, description, pointCost };
    await addDoc(collection(this.firestore, 'products'), product);
  }

  // Méthode pour mettre à jour un produit
  async updateProduct(productId: string, data: Partial<Product>) {
    await updateDoc(doc(this.firestore, 'products', productId), data);
  }

  // Méthode pour supprimer un produit
  async deleteProduct(productId: string) {
    await deleteDoc(doc(this.firestore, 'products', productId));
  }
}
