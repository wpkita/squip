import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  IonList,
  IonModal,
  ModalController,
} from '@ionic/angular';
import { Habit } from './habit';
import { HabitForCreation } from './habit-for-creation';
import { HabitsService } from './habits.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { HabitEditorComponent } from './habit-editor/habit-editor.component';
import { HibitForCreation } from './hibitForCreation';
import { HibitsService } from './hibits.service';
import { HabitSummariesService } from './habit-summaries.service';
import { HabitSummary } from './habit-summary';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
  standalone: false,
})
export class HabitsPage implements OnInit {
  @ViewChild(IonModal) addModal: IonModal | undefined;
  habitSummaries?: HabitSummary[];
  newHabitName: string = '';

  constructor(
    private habitSummariesService: HabitSummariesService,
    private habitsService: HabitsService,
    private hibitsService: HibitsService,
    private actionSheetController: ActionSheetController,
    private editModalController: ModalController
  ) {}

  ngOnInit() {
    this.habitSummariesService
      .get()
      .subscribe((habitSummaries) => (this.habitSummaries = habitSummaries));
  }

  track(habitSummary: HabitSummary, habitsList: IonList) {
    const hibit: HibitForCreation = {
      habitId: habitSummary.habit.id,
    };

    this.hibitsService.add(hibit).subscribe((response) => {
      const habitSummaryIndex = this.habitSummaries!.findIndex(
        (h) => h.habit.id === response.habitId
      );
      this.habitSummaries![habitSummaryIndex].count += 1;
      habitsList.closeSlidingItems();
    });
  }

  async edit(habit: Habit, habitsList: IonList) {
    const modal = await this.editModalController.create({
      component: HabitEditorComponent,
      componentProps: habit,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const habit: Habit = {
        ...data,
      };
      this.habitsService.update(habit).subscribe((_) => {
        const habitIndex = this.habitSummaries!.findIndex(
          (h) => h.habit.id === data.id
        );
        if (habitIndex !== -1) {
          this.habitSummaries![habitIndex].habit.name = data.name;
        }
        habitsList.closeSlidingItems();
      });
    } else if (role === 'cancel') {
      habitsList.closeSlidingItems();
    }
  }

  cancelAdd() {
    this.addModal!.dismiss(null, 'cancel');
  }

  confirmAdd() {
    this.addModal!.dismiss(this.newHabitName, 'confirm');
  }

  dismissAdd(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      const newHabit: HabitForCreation = {
        name: ev.detail.data!,
      };

      this.habitsService.add(newHabit).subscribe((response) => {
        const habitSummary: HabitSummary = {
          habit: response,
          count: 0,
        };
        this.habitSummaries!.push(habitSummary);
        this.newHabitName = '';
      });
    }
  }

  async delete(habit: Habit, habitsList: IonList) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Delete habit?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
            habit: habit,
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: { action: 'cancel' },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if (result.data.action === 'delete') {
      this.habitsService.delete(result.data.habit).subscribe((_) => {
        const habitIndex = this.habitSummaries!.findIndex(
          (h) => h.habit.id === result.data.habit.id
        );
        if (habitIndex !== -1) {
          this.habitSummaries?.splice(habitIndex, 1);
        }
      });
    } else {
      habitsList.closeSlidingItems();
    }
  }
}
