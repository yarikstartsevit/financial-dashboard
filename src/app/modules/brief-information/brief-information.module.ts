import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BriefInformationComponent } from './brief-information.component';
import { SharedElementsModule } from 'src/app/shared/components/shared-elements.module';



@NgModule({
  declarations: [BriefInformationComponent],
  imports: [
    CommonModule,
    SharedElementsModule
  ]
})
export class BriefInformationModule {

}
