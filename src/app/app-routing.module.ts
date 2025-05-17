import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home/home.component";
import {authGuard} from "./services/auth.guard";

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'nail-polish',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/nail-polish/nail-polish.module').then(m => m.NailPolishModule)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
