import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    CommonModule,
    RouterModule
  ],
  standalone: true
})

export class SidebarComponent {
  protected readonly navList: { icon: string, url: string, displayName: string }[] = [
    { icon: 'bar_chart_4_bars', url: '/dashboard', displayName: "Dashboard" },
    { icon: 'group', url: '/users', displayName: "Users" },
    { icon: 'location_on', url: '/attractions', displayName: "Attraction" },
    { icon: 'finance_mode', url: '/pest-sales', displayName: "Pet Sales" },
  ];
  protected readonly isMobile = signal(false);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  private layoutService = inject(LayoutService);
  isSidenavOpen = true; // Default state
  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  
  ngOnInit(): void {
    // Subscribe to sidenav state changes
    this.layoutService.sidenavState$.subscribe((state) => {
      this.isSidenavOpen = state;
    });
  }
  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
