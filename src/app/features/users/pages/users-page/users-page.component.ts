import { Component, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersTableComponent } from '../../Components/users-table/users-table.component';
import { AddEditUserComponent } from '../../Components/add-edit-user/add-edit-user.component';
import {
  MatDialog,

} from '@angular/material/dialog';
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


  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
        data: { user: null, dialogType: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }
}
