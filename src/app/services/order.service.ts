import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import {User} from '../models/User';
import {Order} from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async placeOrder(items: { productId: string; name: string; quantity: number; pointCost: number }[]) {
    try {
      const currentUser = await firstValueFrom(user(this.auth));
      if (!currentUser) throw new Error("User not authenticated");

      const userRef = doc(this.firestore, `users/${currentUser.uid}`);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw new Error("User not found");

      const userData = userSnap.data() as User;
      let totalPoints = items.reduce((sum, item) => sum + item.pointCost * item.quantity, 0);
      if (userData.points < totalPoints) {
        throw new Error("Not enough points to complete the purchase");
      }

      await updateDoc(userRef, { points: userData.points - totalPoints });
      await addDoc(collection(this.firestore, 'orders'), { userId: currentUser.uid, items, totalPoints, status: "pending", createdAt: new Date() } as Order);

      console.log("Order placed successfully.");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }

  async getOrders(): Promise<Order[]> {
    const querySnapshot = await getDocs(collection(this.firestore, 'orders'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }

  async updateOrderStatus(orderId: string, status: 'pending' | 'approved' | 'rejected') {
    await updateDoc(doc(this.firestore, 'orders', orderId), { status });
  }
}
