import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';



@NgModule({
  declarations: [DatePickerComponent, NavigationComponent],
  exports: [DatePickerComponent, NavigationComponent],
  imports: [
    CommonModule,
    NgbDatepickerModule,
  ]
})
export class SharedElementsModule { }
