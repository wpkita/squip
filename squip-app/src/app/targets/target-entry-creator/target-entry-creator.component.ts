import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TargetEntry } from '../target-entry';

@Component({
  selector: 'app-target-entry-creator',
  templateUrl: './target-entry-creator.component.html',
  styleUrls: ['./target-entry-creator.component.scss'],
  standalone: false,
})
export class TargetEntryCreatorComponent implements OnInit {
  id: string = '';
  name: string = '';
  magnitude: number = 0;
  didEngage: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const targetEntry: TargetEntry = {
      targetId: this.id,
      magnitude: this.magnitude,
      didEngage: this.didEngage,
    };

    return this.modalController.dismiss(targetEntry, 'confirm');
  }
}
