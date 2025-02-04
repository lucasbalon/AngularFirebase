import { Component } from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-upload',
  standalone: false,

  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  uploadProgress = 0;
  downloadURL: string | null = null;

  constructor(private storageService: StorageService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.storageService.uploadFile(file, `uploads/${file.name}`).subscribe({
        next: (url) => {
          this.downloadURL = url;
          console.log('Fichier disponible à :', url);
        },
        error: (err) => console.error('Erreur lors de l’upload :', err)
      });
    }
  }
}
