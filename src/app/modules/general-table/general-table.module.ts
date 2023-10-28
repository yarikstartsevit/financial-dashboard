import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralTableComponent } from './general-table.component';
import { SharedElementsModule } from 'src/app/shared/components/shared-elements.module';

@NgModule({
  declarations: [GeneralTableComponent],
  imports: [
    CommonModule,
    SharedElementsModule
  ]
})
export class GeneralTableModule { }
