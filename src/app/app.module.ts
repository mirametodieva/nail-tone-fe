import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppCommonModule} from "./app-common.module";
import {MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions} from "@angular/material/core";
import {TranslocoRootModule} from './transloco-root.module';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthModule} from "./pages/auth/auth.module";
import {authInterceptorFn} from "./services/auth.interceptor";
import {HomeComponent} from "./pages/home/home/home.component";
import {NailPolishModule} from "./pages/nail-polish/nail-polish.module";
import {ConfirmationDialogComponent} from "./pages/home/confirmation-dialog/confirmation-dialog.component";

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 0,
    exitDuration: 0
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppCommonModule,
    AppRoutingModule,
    TranslocoRootModule,
    AuthModule,
    NailPolishModule
  ],
  providers: [
    provideHttpClient(withInterceptors([
      authInterceptorFn
    ])),
    provideAnimationsAsync(),
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
