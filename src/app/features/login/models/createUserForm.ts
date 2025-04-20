import { FormControl, FormGroup } from '@angular/forms';

export interface CreateUserForm {
  fname: FormControl<string>;
  lname: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  avatar: FormControl<string>;
}
