import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersTableComponent } from '../../Components/users-table/users-table.component';

@Component({
  selector: 'app-users-page',
  imports: [
    MatButtonModule,
    MatIconModule,
    UsersTableComponent
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {

}
