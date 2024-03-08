import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiBasicRoutingModule } from './ui-basic-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [CommonModule, UiBasicRoutingModule,SharedModule],
  declarations: [

    
  ],
})
export class UiBasicModule {}
