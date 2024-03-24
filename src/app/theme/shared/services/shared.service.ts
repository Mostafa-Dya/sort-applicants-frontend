import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslationService } from './translation.service';

export enum Category {
  Category1 = '1',
  Category2 = '2',
  Category3 = '3',
  Category4 = '4',
  Category5 = '5',
}

export enum Status {
  Audited = 1,
  NotAudited = 0,
}

enum DesireOrder {
  FirstDesire = 1,
  SecondDesire = 2,
  ThirdDesire = 3,
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zon: NgZone,
    private translate: TranslationService,
  ) {}

  getCategoryString(category: Category) {
    switch (category) {
      case '1':
        return 'Category 1';
      case '2':
        return 'Category 2';
      case '3':
        return 'Category 3';
      case '4':
        return 'Category 4';
      case '5':
        return 'Category 5';
      default:
        return '';
    }
  }

  getStatusString(status: Status) {
    switch (status) {
      case 1:
        return 'Audited';
      case 0:
        return 'Not Audited';
      default:
        return '';
    }
  }

  getDesireOrderString(desires: DesireOrder) {
    switch (desires) {
      case 1:
        return 'First Desire';
      case 2:
        return 'Second Desire';
      case 3:
        return 'Third Desire';
      default:
        return '';
    }
  }

  openSnackBar(messageKey: string, actionKey: string) {
    this.translate
      .getTranslationSnackBar(messageKey)
      .subscribe((translatedMessage: string) => {
        this.translate
          .getTranslationSnackBar(actionKey)
          .subscribe((translatedAction: string) => {
            this.snackBar.open(translatedMessage, translatedAction, {
              duration: 4000,
              horizontalPosition: 'center',
              panelClass: ['blue-snackbar'],
            });
          });
      });
  }
}
