import {NgModule} from "@angular/core";
import {LogInComponent} from "./log-in/log-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AppCommonModule} from "../../app-common.module";
import {AuthRoutingModule} from "./auth-routing.module";
import {JsonPipe, NgClass} from "@angular/common";


@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    AppCommonModule,
    AuthRoutingModule,
    JsonPipe,
    NgClass
  ]
})
export class AuthModule {
}
