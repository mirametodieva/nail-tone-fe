import {NgModule} from "@angular/core";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MaterialModule} from "./modules/material.module";
import {TranslocoModule} from "@ngneat/transloco";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NailPolishCardComponent} from "./components/nail-polish-card/nail-polish-card.component";
import {AsyncPipe, JsonPipe, NgClass} from "@angular/common";
import {UploadImageComponent} from "./components/upload-image/upload-image.component";
import {PrimeNgModule} from "./modules/primeNg.module";

@NgModule({
  declarations: [
    ToolbarComponent,
    NailPolishCardComponent,
    UploadImageComponent
  ],
  imports: [
    MaterialModule,
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    JsonPipe,
    PrimeNgModule,
    NgClass,
    AsyncPipe
  ],
  exports: [
    MaterialModule,
    ToolbarComponent,
    TranslocoModule,
    ReactiveFormsModule,
    RouterModule,
    NailPolishCardComponent,
    UploadImageComponent,
    PrimeNgModule
  ]
})
export class AppCommonModule { }
