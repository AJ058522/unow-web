import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordType: string = 'password';
  errorMessage: string = null;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      showPassword: [false,]
    });

  }

  onSubmit() {

    this.errorMessage = null;

    this.authService.login(this.loginForm.value)
      .then(data => {
        this.router.navigate(['users']);
        this.loginForm.reset();
      }, error => {
        this.errorMessage = (error.error.error) ? error.error.error : null;
      });

  }

  showPasswordToogle() {
    const showPassword = this.loginForm.get('showPassword').value;
    this.passwordType = (showPassword) ? 'text' : 'password';
  }

}
