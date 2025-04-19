import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  numberOfRequests: number = 0;
  #loading = signal(false);
  showSpinner = this.#loading.asReadonly();


  constructor() { }

  incrementRequests(): void {
    this.numberOfRequests++;
    this.updateLoadingState();
  }

  decrementRequests(): void {
    if (this.numberOfRequests > 0) {
      this.numberOfRequests--;
    }
    this.updateLoadingState();
  }

  private updateLoadingState(): void {
    this.#loading.set(this.numberOfRequests > 0);
  }
}
