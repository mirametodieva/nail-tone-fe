import {NgModule} from "@angular/core";
import {LogInComponent} from "./log-in/log-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AppCommonModule} from "../../app-common.module";
import {AuthRoutingModule} from "./auth-routing.module";


@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    AppCommonModule,
    AuthRoutingModule
  ],
  exports: [
    LogInComponent,
    SignUpComponent
  ]
})
export class AuthModule {
}
