import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AttractionService } from '../../services/attraction.service';
import { Attraction } from '../../models/attractions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';
import { ApiResponse } from '@shared/services/baseApi/models/api-response';
import { FormControlErrorComponent } from '@shared/form-control-error/form-control-error.component';

@Component({
  selector: 'app-add-edit-attraction',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormControlErrorComponent
  ],
  templateUrl: './add-edit-attraction.component.html',
  styleUrl: './add-edit-attraction.component.scss',
})
export class AddEditAttractionComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddEditAttractionComponent>);
  readonly data = inject<{ attraction: Attraction; dialogType: 'edit' | 'add'; id: number }>(MAT_DIALOG_DATA);
  destroyRef: DestroyRef = inject(DestroyRef);
  private toasterService = inject(ToasterService);
  attractionService: AttractionService = inject(AttractionService);
  createAttractionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createAttractionForm = this.fb.group({
      name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      detail: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      coverimage: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      longitude: this.fb.control('', { nonNullable: true }),
      latitude: this.fb.control('', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    if (this.data.dialogType === 'edit') {
      this.createAttractionForm.patchValue(this.data.attraction);
    }
  }

  onSubmit() {
    if (this.createAttractionForm.valid) {
      if (this.data.dialogType === 'edit') {
        this.callEditAttractionApi();
      } else {
        this.callCreateAttractionApi();
      }
    }
  }

  callEditAttractionApi() {
    this.attractionService
      .update(this.data.id, this.createAttractionForm.value as Attraction)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: ApiResponse<'data', Attraction>) => {
          if (res.status == 'ok') {
          }else{
            this.toasterService.openToaster(
              res.status === 'error' ? ToasterTypes.error : ToasterTypes.info,
              {
                data: {
                  title: res.status,
                  message: res.message,
                },
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          }
          this.dialogRef.close();
        },
        error: () => {
          console.error('Failed to update attraction.');
        },
      });
  }

  callCreateAttractionApi() {
    this.attractionService
      .create(this.createAttractionForm.value as Attraction)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: ApiResponse<'data', Attraction>) => {
          this.toasterService.openToaster(
            res.status === 'error' ? ToasterTypes.error : ToasterTypes.info,
            {
              data: {
                title: res.status,
                message: res.message,
              },
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
          this.dialogRef.close();
        },
        error: () => {
          console.error('Failed to create attraction.');
        },
      });
  }

  onCancel() {
    this.createAttractionForm.reset();
    this.dialogRef.close();
  }
}