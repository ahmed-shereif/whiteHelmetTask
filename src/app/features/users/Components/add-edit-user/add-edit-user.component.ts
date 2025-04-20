import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import {
  MAT_DIALOG_DATA,

  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControlErrorComponent } from '@shared/form-control-error/form-control-error.component';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { CreateUserForm } from 'src/app/features/login/models/createUserForm';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';
import { ApiResponse } from '@shared/services/baseApi/models/api-response';


@Component({
  selector: 'app-add-edit-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormControlErrorComponent,

  ],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditUserComponent>);
  readonly data = inject<{ user: User, dialogType: "edit" | 'add', id: number }>(MAT_DIALOG_DATA);
  destroyRef: DestroyRef = inject(DestroyRef);
  private toasterService = inject(ToasterService);
  userService: UserService = inject(UserService);
  hidePassword = true;
  createUserForm: FormGroup



  ngOnInit(): void {
    if (this.data.dialogType == 'edit') {
      this.createUserForm.patchValue(this.data.user)
    }
  }




  onNoClick(): void {
    this.dialogRef.close();
  }




  constructor(private fb: FormBuilder) {
    this.createUserForm = this.fb.group<CreateUserForm>({
      fname: this.fb.control('', { nonNullable: true }),
      lname: this.fb.control('', { nonNullable: true }),
      username: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      email: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      password: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      avatar: this.fb.control('', { nonNullable: true }),
    });
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      console.log('User Data:', this.createUserForm.value);
      if (this.data.dialogType == 'edit') {
        this.callEditUserApi()
      } else {

        this.callCreateUserAPi()
      }
      // send the user data to the backend here
    }
  }

  callEditUserApi() {
    this.userService.update(this.data.id, this.createUserForm.value as User)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: ApiResponse<'user', User>) => {
          if (res.status == 'ok') {
          }

          this.toasterService.openToaster(res.status == 'error' ? ToasterTypes.error : ToasterTypes.info, {
            data: {
              title: res.status,
              message: res.message,
            },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.dialogRef.close();


        },
        error: () => {
        }
      })


  }
  callCreateUserAPi() {
    this.userService.create(this.createUserForm.value as User)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: ApiResponse<'user', User>) => {
          if (res.status == 'ok') {
          }

          this.toasterService.openToaster(res.status == 'error' ? ToasterTypes.error : ToasterTypes.info, {
            data: {
              title: res.status,
              message: res.message,
            },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.dialogRef.close();


        },
        error: () => {
        }
      })

  }


  onCancel() {
    this.createUserForm.reset();
    this.dialogRef.close();

  }






}
