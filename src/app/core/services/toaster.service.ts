import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';
import { ToasterComponent } from '@shared/toaster/toaster.component';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);
  defaultData: Record<ToasterTypes, { type: ToasterTypes; title: string; message: string }> = {
    success: {
      type: ToasterTypes.success,
      title: "savedSuccessfully",
      message: "theEntryIsUpdatedSuccessfully"
    },
    error: {
      type: ToasterTypes.error,
      title: "savingFailed",
      message: "theEntrySavingIsFailed"
    },
    warning: {
      type: ToasterTypes.warning,
      title: "Warning",
      message: "PleaseCheckTheSystemForPossibleErrors."
    },
    info: {
      type: ToasterTypes.info,
      title: "Information",
      message: "PleaseBeAwareOfTheFollowingInformation."
    },
  }

  constructor() { }

  openToaster(type: ToasterTypes, config?: MatSnackBarConfig) {
    this._snackBar.openFromComponent(ToasterComponent, {
      duration: 55 * 1000,
      ...config,
      data: config?.data ? { ...config.data, type } : { ...this.defaultData[type], type },
    });
  }
}


