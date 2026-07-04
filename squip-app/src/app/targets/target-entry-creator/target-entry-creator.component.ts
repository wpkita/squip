import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TargetEntry } from '../target-entry';

@Component({
  selector: 'app-target-entry-creator',
  templateUrl: './target-entry-creator.component.html',
  styleUrls: ['./target-entry-creator.component.scss'],
  standalone: false,
})
export class TargetEntryCreatorComponent {
  private modalController = inject(ModalController);

  id: string = '';
  name: string = '';
  magnitude: number = 0;
  didEngage: boolean = false;

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
