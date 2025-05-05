import {NgModule} from "@angular/core";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MaterialModule} from "./modules/material.module";
import {TranslocoModule} from "@ngneat/transloco";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ToolbarComponent,
  ],
  imports: [
    MaterialModule,
    TranslocoModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    ToolbarComponent,
    TranslocoModule,
    ReactiveFormsModule
  ]
})
export class AppCommonModule { }
