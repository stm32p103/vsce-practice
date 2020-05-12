import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VsCodeService } from './services';
import { ComponentOutletComponent } from './components';

@NgModule({
  exports: [
    ComponentOutletComponent
  ],
  declarations: [
    AppComponent,
    ComponentOutletComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [VsCodeService],
  bootstrap: [AppComponent]
})
export class AppModule {}