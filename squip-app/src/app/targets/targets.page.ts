import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, IonModal, ModalController } from '@ionic/angular';
import { TargetsService } from './targets.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { TargetForCreation } from './target-for-creation';
import { TargetSummariesService } from './target-summaries.service';
import { TargetSummary } from './target-summary';
import { TargetEntry } from './target-entry';
import { TargetEntriesService } from './target-entries.service';
import { TargetEntryCreatorComponent } from './target-entry-creator/target-entry-creator.component';
import { Target } from './target';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.page.html',
  styleUrls: ['./targets.page.scss'],
  standalone: false,
})
export class TargetsPage implements OnInit {
  @ViewChild(IonModal) addModal: IonModal | undefined;
  newTargetName: string = '';
  targetSummaries?: TargetSummary[];
  constructor(
    private targetsService: TargetsService,
    private targetSummariesService: TargetSummariesService,
    private targetEntriesService: TargetEntriesService,
    private targetEntryModalCreatorModalController: ModalController
  ) {}

  ngOnInit() {
    this.targetSummariesService
      .get()
      .subscribe((targetSummaries) => (this.targetSummaries = targetSummaries));
  }

  async track(target: Target, targetsList: IonList) {
    const modal = await this.targetEntryModalCreatorModalController.create({
      component: TargetEntryCreatorComponent,
      componentProps: target,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const targetEntry: TargetEntry = {
        ...data,
      };

      this.targetEntriesService.add(targetEntry).subscribe((response) => {
        const targetSummaryIndex = this.targetSummaries!.findIndex(
          (targetSummary) => targetSummary.target.id == response.targetId
        );
        this.targetSummaries![targetSummaryIndex].count += 1;
        targetsList.closeSlidingItems();
      });
    } else if (role === 'cancel') {
      targetsList.closeSlidingItems();
    }
  }

  cancelAdd() {
    this.addModal!.dismiss(null, 'cancel');
  }

  confirmAdd() {
    this.addModal!.dismiss(this.newTargetName, 'confirm');
  }

  dismissAdd(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      const newTarget: TargetForCreation = {
        name: ev.detail.data!,
      };

      this.targetsService.add(newTarget).subscribe((response) => {
        const targetSummary: TargetSummary = {
          target: response,
          count: 0,
        };
        this.targetSummaries!.push(targetSummary);
        this.newTargetName = '';
      });
    }
  }
}
