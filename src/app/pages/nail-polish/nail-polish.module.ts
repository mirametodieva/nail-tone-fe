import {NgModule} from "@angular/core";
import {AppCommonModule} from "../../app-common.module";
import {NailPolishRoutingModule} from "./nail-polish-routing.module";
import {AddNewNailPolishComponent} from "./add-new-nail-polish/add-new-nail-polish.component";


@NgModule({
  declarations: [
    AddNewNailPolishComponent
  ],
  imports: [
    AppCommonModule,
    NailPolishRoutingModule
  ]
})
export class NailPolishModule {
}
