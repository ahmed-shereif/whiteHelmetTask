import { Component, inject } from '@angular/core';
import { SpinnerService } from '../service/spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  imports: [MatProgressSpinnerModule]
})
export class SpinnerComponent {
  spinnerService = inject(SpinnerService)
  showSpinner = this.spinnerService.showSpinner;
}
