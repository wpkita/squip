import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Habit } from '../habit';

@Component({
  selector: 'app-habit-editor',
  templateUrl: './habit-editor.component.html',
  styleUrls: ['./habit-editor.component.scss'],
  standalone: false,
})
export class HabitEditorComponent implements OnInit {
  constructor(private modalController: ModalController) {}
  id: string = '';
  name: string = '';

  ngOnInit() {}
  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const habit: Habit = {
      id: this.id,
      name: this.name,
    };
    return this.modalController.dismiss(habit, 'confirm');
  }
}
