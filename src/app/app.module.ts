import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RoutingModule } from './bounded-contexts/bounded-contexts.module';
import { LayoutModule } from './shared/layout/layout.module';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {CanDeactivateGuard} from "./core/interfaces/guard";
import {FormsModule} from "@angular/forms";
import {PhasesGuard} from "./core/interfaces/phasesGuard";

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RoutingModule,
    HttpClientModule,
    CoreModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    CanDeactivateGuard,
    PhasesGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
