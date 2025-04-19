import { Component, Input, signal, SimpleChanges, OnChanges, computed } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { IValidationError } from './IValidationError';

@Component({
  selector: 'app-validation-error-message',
  standalone: true,
  providers: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './validation-error-message.component.html',
  styleUrl: './validation-error-message.component.scss',
})
export class ValidationErrorMessageComponent implements OnChanges {
  @Input() validationFormControl!: FormControl;
  @Input() customErrorMessages?: IValidationError;
  @Input() displayName?: string;
  errorMessage = signal<{ [key: string]: string }>({});
  errors = computed<Record<string, string>>(() => ({
    required: `${this.displayName} is required.`,
    email: `Invalid email format.`,
    maxlength: `${this.displayName} exceeds the maximum length.`,
    minlength: `${this.displayName} is below the minimum length.`,
    pattern: `${this.displayName} has an invalid format.`,
    min: `${this.displayName} value is too low.`,
    max: `${this.displayName} value is too high.`,
  }));

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const { customErrorMessages, validationFormControl } = changes;
    if (
      (customErrorMessages && customErrorMessages.currentValue) ||
      (validationFormControl && validationFormControl.currentValue)
    ) {
      // this.displayName.set(displayName);
      this.errorMessage.set(this.errors());
      this.errorMessage.set({ ...this.errorMessage(), ...this.customErrorMessages });
    }
  }
}