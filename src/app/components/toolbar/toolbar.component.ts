import {Component, OnInit} from '@angular/core';
import {Language, LanguageService} from "../../services/language.service";
import {MatDialog} from "@angular/material/dialog";
import {UploadImageComponent} from "../upload-image/upload-image.component";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private readonly languageService: LanguageService,
              private readonly dialog: MatDialog,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  ngOnInit() {
  }

  changeLanguage(language: Language) {
    this.languageService.switchLanguage(language);
  }

  openUploadImageDialog() {
    this.dialog.open(UploadImageComponent, {
      panelClass: 'upload-image-dialog',
      autoFocus: false,
      data: {
        mainStepsOnly: false
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth', 'sign-in']);
  }

  protected readonly Languages = Language;
}
