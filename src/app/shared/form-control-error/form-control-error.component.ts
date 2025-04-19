// form-control-error.component.ts
import { Component, Input, computed, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-control-error',
  standalone: true,
  templateUrl: './form-control-error.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    
  ],
})
export class FormControlErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() errorMessages: Record<string, string> = {};

  defaultMessages: Record<string, string> = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    minlength: 'Too short.',
    maxlength: 'Too long.',
    pattern: 'Invalid format.',
  };

  get messages() {
    return { ...this.defaultMessages, ...this.errorMessages };
  }

  get errorKeys(): string[] {
    if (!this.control?.errors) return [];
    return Object.keys(this.control.errors);
  }
}
