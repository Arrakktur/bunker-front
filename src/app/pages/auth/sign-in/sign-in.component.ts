import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  authForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    this.authorizationService.login(
      {
        login: this.authForm.get('login')?.value,
        password: this.authForm.get('password')?.value,
      }
    );
  }

  navigate(link: string): Promise<boolean> {
    return this.router.navigateByUrl(link);
  }
}
