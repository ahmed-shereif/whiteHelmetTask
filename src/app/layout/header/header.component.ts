import { Component, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuTrigger } from '@angular/material/menu';
import { User } from 'src/app/features/users/models/user';
import { LoginService } from 'src/app/features/login/services/login-service.service';
@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private layoutService = inject(LayoutService);
  private router = inject(Router);
  protected userData = signal<User | null>(null);
  private loginService = inject(LoginService);

  constructor() {
  }

  ngOnInit(): void{
    this.loginService.user$.subscribe((userData) => {
      this.userData.set(userData) 
    });
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  toggleSidenav() {
    this.layoutService.toggleSidenav();
  }



}
