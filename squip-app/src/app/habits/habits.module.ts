import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HabitsPageRoutingModule} from './habits-routing.module';

import {HabitsPage} from './habits.page';
import {HabitEditorComponent} from './habit-editor/habit-editor.component';
import { DailySummaryComponent } from './daily-summary/daily-summary.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HabitsPageRoutingModule],
  declarations: [HabitsPage, HabitEditorComponent, DailySummaryComponent],
})
export class HabitsPageModule {}
