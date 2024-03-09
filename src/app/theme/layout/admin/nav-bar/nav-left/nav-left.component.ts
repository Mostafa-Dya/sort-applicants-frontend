import { Component } from '@angular/core';
import { TranslationService } from 'src/app/theme/shared/services/translation.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss'],
})
export class NavLeftComponent {
  constructor(private translationService: TranslationService) {}

  changeLanguage(language: string): void {
    localStorage.setItem('i18nextLng',language)
    this.translationService.setLanguage(language);
  }
}
