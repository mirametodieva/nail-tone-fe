import { Injectable } from '@angular/core';
import { TranslocoService, } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translocoService: TranslocoService) { }

  switchLanguage(language: Language) {
    this.translocoService.setActiveLang(language);
  }
}

export enum Language {
  EN = 'en',
  BG = 'bg'
}
