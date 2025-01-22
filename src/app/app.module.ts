import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from "./app.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PopupModule } from '@progress/kendo-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  imports: [
    BrowserModule,
    PopupModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {}
