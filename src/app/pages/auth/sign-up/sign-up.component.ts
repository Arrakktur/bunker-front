import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  regForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  navigate(link: string): Promise<boolean> {
    return this.router.navigateByUrl(link);
  }

  registration(){
    this.authorizationService.registration({
      login: this.regForm.get('login')?.value,
      password: this.regForm.get('password')?.value,
      name: this.regForm.get('name')?.value,
    });
  }
}
