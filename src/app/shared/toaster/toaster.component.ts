import { Component, Inject, signal } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToasterTypes } from './enums/toasterTypes';
import { MatIconModule } from '@angular/material/icon';

import { Direction } from '@angular/cdk/bidi';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  public lang = signal<string>('');
  @Inject(MAT_SNACK_BAR_DATA) public data: any
  public type = signal<ToasterTypes>(ToasterTypes.info)
  public title = signal<string>('')
  public message = signal<string>('')
  constructor(public snackBarRef: MatSnackBarRef<ToasterComponent>
  ) {
    const { type, title, message } = this.snackBarRef.containerInstance.snackBarConfig.data
    const { horizontalPosition } = this.snackBarRef.containerInstance.snackBarConfig
    this.type.set(type)
    this.title.set(title)
    this.message.set(message)

  }

  close() {
    this.snackBarRef.dismiss()
  }

}
