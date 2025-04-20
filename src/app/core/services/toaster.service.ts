import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';
import { ToasterData } from '@shared/toaster/models/toasterDate';
import { ToasterComponent } from '@shared/toaster/toaster.component';



@Injectable({
  providedIn: 'root',
})


export class ToasterService {
  private _snackBar = inject(MatSnackBar);

  constructor() { }

  openToaster(type: ToasterTypes, config?: MatSnackBarConfig) {
    this._snackBar.openFromComponent(ToasterComponent, {
      duration: 55 * 1000,
      ...config,
      data: { ...config?.data, type }
    });
  }
}


