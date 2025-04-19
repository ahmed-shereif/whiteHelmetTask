import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-footer',
  imports: [MatCardModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  testApiCall(): void {
    this.http.get('https://jsonplaceholddder.typicode.com/posts/1').subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.snackBar.open('API call successful!', 'Close', { duration: 3000 });
      },
      error: (error) => {
        // console.error('API Error:', error);
        // this.snackBar.open('Warning: API call failed!', 'Close', { duration: 3000, panelClass: ['warning-toaster'] });
      }
    });
  }
}
