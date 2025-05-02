import {NgModule} from "@angular/core";
import {MaterialModule} from "./modules/material-modules";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    MaterialModule,
    ToolbarComponent
  ]
})
export class AppCommonModule { }
