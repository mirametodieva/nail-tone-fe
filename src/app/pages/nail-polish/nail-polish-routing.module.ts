import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddNewNailPolishComponent} from "./add-new-nail-polish/add-new-nail-polish.component";

const routes: Routes = [
  {
    path: 'add', component: AddNewNailPolishComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'add'
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
export class NailPolishRoutingModule {
}
