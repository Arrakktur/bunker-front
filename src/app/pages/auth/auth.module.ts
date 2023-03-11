import { NgModule } from '@angular/core';
import {AuthComponent} from "./auth.component";
import {SignInModule} from "./sign-in/sign-in.module";
import {SignUpModule} from "./sign-up/sign-up.module";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SignInModule,
    SignUpModule
  ]
})
export class AuthModule { }
