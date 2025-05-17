import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, takeUntil} from "rxjs";
import {Destroyable} from "./components/destroyable.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Destroyable implements OnInit {
  displayToolbar = false;

  constructor(private readonly router: Router) {
    super();
  }

  ngOnInit() {
    this.displayToolbar = this.checkUrl(this.router.url);
    this.router.events.pipe(
      takeUntil(this.destroyed$),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const navigationEndEvent = event as NavigationEnd;
      this.displayToolbar = this.checkUrl(navigationEndEvent.urlAfterRedirects);
    });
  }

  private checkUrl(urlPath: string): boolean {
    return !urlPath.includes('auth');
  }
}
