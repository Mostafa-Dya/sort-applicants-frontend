import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {}

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
  getTranslationSnackBar(key: string): Observable<string> {
    return this.translate.get(key);
  }
}
