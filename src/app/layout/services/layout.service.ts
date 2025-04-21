import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  // BehaviorSubject to manage sidenav state
  private sidenavStateSubject = new BehaviorSubject<boolean>(true);
  public sidenavState$ = this.sidenavStateSubject.asObservable();

  toggleSidenav(): void {
    this.sidenavStateSubject.next(!this.sidenavStateSubject.value);
  }

  setSidenavState(isOpen: boolean): void {
    this.sidenavStateSubject.next(isOpen);
  }
}
