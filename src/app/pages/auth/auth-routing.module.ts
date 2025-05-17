import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LogInComponent} from "./log-in/log-in.component";

const routes: Routes = [
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'sign-in', component: LogInComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'sign-in'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AuthRoutingModule { }
