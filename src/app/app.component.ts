import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './core/http/spinner/component/spinner.component';
import { IconsService } from '@shared/services/icons-service/icons.service';
import { iconsArray } from '@shared/services/icons-service/icons-names-paths';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WhiteHelmetTask';

  constructor(
    private IconsService: IconsService
  ) {
    this.IconsService.registerIcons(iconsArray);
  }
}
