import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async createRobot(name: string, color: string, age: string) {
    try {
      const currentUser = await firstValueFrom(user(this.auth));

      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      // Add userId to match the Firestore security rule
      const docRef = await addDoc(collection(this.firestore, 'robots'), {
        name,
        color,
        age
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating robot:", error);
    }
  }
}
