import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SchedulingModelRoutingModule } from './scheduling-routing.module';
import { SchedulingTypeService } from '../../services/scheduling/scheduling-type.service';
import { SchedulingListComponent } from './scheduling-list/scheduling-list.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {SchedulingService} from "../../services/scheduling/scheduling.service";

@NgModule({
  declarations: [
    SchedulingListComponent,
  ],
    imports: [
        CommonModule,
        SchedulingModelRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ModalModule.forRoot(),
    ],
  providers: [
    SchedulingTypeService,
    SchedulingService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SchedulingModule { }
