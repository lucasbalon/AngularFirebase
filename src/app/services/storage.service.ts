import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {getDownloadURL, ref, uploadBytesResumable, Storage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }



  /**
   * Upload un fichier dans Firebase Storage
   * @param file Fichier à uploader
   * @param path Chemin de stockage (ex: 'images/profile.jpg')
   * @returns Observable de l'URL du fichier une fois uploadé
   */
  uploadFile(file: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable(observer => {
      uploadTask.on('state_changed',
        snapshot => {
          // Optionnel : gérer la progression ici
          console.log(`Progression : ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
        },
        error => observer.error(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          observer.next(url);
          observer.complete();
        }
      );
    });
  }
}
