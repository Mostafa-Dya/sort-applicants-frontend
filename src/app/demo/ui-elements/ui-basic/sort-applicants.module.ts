import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortApplicantsModule } from './sort-applicants-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [CommonModule,SortApplicantsModule ,SharedModule],
  declarations: [

    
  ],
})
export class UiBasicModule {}
