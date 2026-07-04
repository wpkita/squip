import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroomingPageRoutingModule } from './grooming-routing.module';

import { GroomingPage } from './grooming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroomingPageRoutingModule
  ],
  declarations: [GroomingPage]
})
export class GroomingPageModule {}
