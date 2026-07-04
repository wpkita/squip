import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  ActionSheetController,
  IonList,
  IonModal,
  ModalController,
} from '@ionic/angular';
import { Idea } from './idea';
import { IdeasService } from './ideas.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { IdeaForCreation } from './idea-for-creation';
import { IdeaEditorComponent } from './idea-editor/idea-editor.component';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.page.html',
  styleUrls: ['./ideas.page.scss'],
  standalone: false,
})
export class IdeasPage implements OnInit {
  private ideasService = inject(IdeasService);
  private editModalController = inject(ModalController);
  private actionSheetController = inject(ActionSheetController);

  @ViewChild(IonModal) addModal: IonModal | undefined;
  ideas?: Idea[];
  newIdeaName: string = '';
  tagName?: string = '';
  tags: string[] = [];

  ngOnInit() {
    this.refreshIdeas();
    this.ideasService.getAllTags().subscribe(tags => this.tags = tags);
  }

  refreshIdeas() {
    this.ideasService.getAll().subscribe((ideas) => this.ideas = ideas);
  }

  searchTag(event: any) {
    if (!event.target.value) {
      this.refreshIdeas();
    } else {
      this.ideasService.getByTag(event.target.value).subscribe((ideas) => this.ideas = ideas);
    }
  }

  async delete(idea: Idea, ideasList: IonList) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Delete idea?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
            idea: idea,
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
      this.ideasService.archive(idea).subscribe((_) => {
        const ideaIndex = this.ideas!.findIndex((i) => i.id === idea.id);
        if (ideaIndex !== -1) {
          this.ideas!.splice(ideaIndex, 1);
        }
      });
    } else {
      ideasList.closeSlidingItems();
    }
  }

  async edit(idea: Idea, ideasList: IonList) {
    const modal = await this.editModalController.create({
      component: IdeaEditorComponent,
      componentProps: idea,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const idea: Idea = {
        ...data,
      };
      this.ideasService.update(idea).subscribe((_) => {
        const ideaIndex = this.ideas!.findIndex((h) => h.id === data.id);
        if (ideaIndex !== -1) {
          this.ideas![ideaIndex].title = data.title;
        }
        ideasList.closeSlidingItems();
      });
    } else {
      ideasList.closeSlidingItems();
    }
  }

  cancelAdd() {
    this.addModal!.dismiss(null, 'cancel');
  }

  confirmAdd() {
    this.addModal!.dismiss(this.newIdeaName, 'confirm');
  }

  dismissAdd(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      const newIdea: IdeaForCreation = {
        title: ev.detail.data!,
        content: '',
      };

      this.ideasService.add(newIdea).subscribe((response) => {
        this.ideas!.push(response);
        this.newIdeaName = '';
      });
    }
  }
}
