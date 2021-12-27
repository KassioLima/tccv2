import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SchedulingRoutingModule } from "./routes/scheduling-routing.module";


@NgModule({
  imports: [SchedulingRoutingModule],
  exports: [SchedulingRoutingModule],
  declarations: [
  ],
})
export class BackofficeModule { }
