import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllowedErrorKeys, ErrorMessages, ALLOWED_ERROR_KEYS } from './ErrorMessages';

@Component({
  selector: 'app-form-control-error',
  standalone: true,
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss'],
  imports: [CommonModule, MatFormFieldModule],
})
export class FormControlErrorComponent  {
  @Input() control!: AbstractControl | null;
  @Input() errorMessages: ErrorMessages = {};

  defaultMessages: ErrorMessages = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    minlength: 'Too short.',
    maxlength: 'Too long.',
    pattern: 'Invalid format.',
  };

  get messages() {
    return { ...this.defaultMessages, ...this.errorMessages };
  }

  get errorKeys(): AllowedErrorKeys[] {
    if (!this.control?.errors) return [];
    return Object.keys(this.control.errors).filter((key): key is AllowedErrorKeys =>
      ALLOWED_ERROR_KEYS.includes(key as AllowedErrorKeys)
    );
  }
}