import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpCodesModule } from './http-codes/http-codes.module';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpCodesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule { }
