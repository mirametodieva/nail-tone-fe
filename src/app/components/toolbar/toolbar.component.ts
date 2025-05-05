import { Component } from '@angular/core';
import {Language, LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private readonly languageService: LanguageService) {
  }

  changeLanguage(language: Language) {
    this.languageService.switchLanguage(language);

  }
  protected readonly Languages = Language;
}
