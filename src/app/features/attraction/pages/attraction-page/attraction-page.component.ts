import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AttractionTableComponent } from '../../components/attraction-table/attraction-table.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAttractionComponent } from '../../components/add-edit-attraction/add-edit-attraction.component';

@Component({
  selector: 'app-attraction-page',
  imports: [
    MatButtonModule,
    MatIconModule,
   AttractionTableComponent
  ],
  templateUrl: './attraction-page.component.html',
  styleUrl: './attraction-page.component.scss'
})
export class AttractionPageComponent {
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditAttractionComponent, {
        data: { user: null, dialogType: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }
}
