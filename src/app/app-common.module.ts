import {NgModule} from "@angular/core";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MaterialModule} from "./modules/material.module";
import {TranslocoModule} from "@ngneat/transloco";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NailPolishCardComponent} from "./components/nail-polish-card/nail-polish-card.component";
import {JsonPipe} from "@angular/common";

@NgModule({
  declarations: [
    ToolbarComponent,
    NailPolishCardComponent
  ],
  imports: [
    MaterialModule,
    TranslocoModule,
    ReactiveFormsModule,
    RouterModule,
    JsonPipe
  ],
  exports: [
    MaterialModule,
    ToolbarComponent,
    TranslocoModule,
    ReactiveFormsModule,
    RouterModule,
    NailPolishCardComponent
  ]
})
export class AppCommonModule { }
