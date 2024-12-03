import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from "./app.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



@NgModule({
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {}
