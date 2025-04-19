import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './core/http/spinner/component/spinner.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WhiteHelmetTask';
}
