import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VsCodeService } from './services';
import { ComponentOutletComponent } from './components';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  exports: [
    ComponentOutletComponent
  ],
  declarations: [
    AppComponent,
    ComponentOutletComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SidebarModule,
    ToggleButtonModule,
    ButtonModule,
    TooltipModule,
    PanelModule
  ],
  providers: [VsCodeService],
  bootstrap: [AppComponent]
})
export class AppModule {}