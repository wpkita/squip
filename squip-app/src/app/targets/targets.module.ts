import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TargetsPageRoutingModule } from './targets-routing.module';

import { TargetsPage } from './targets.page';
import { TargetEntryCreatorComponent } from './target-entry-creator/target-entry-creator.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TargetsPageRoutingModule],
  declarations: [TargetsPage, TargetEntryCreatorComponent],
})
export class TargetsPageModule {}
