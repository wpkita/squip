import { Component, inject } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Idea} from '../idea';

@Component({
  selector: 'app-idea-editor',
  templateUrl: './idea-editor.component.html',
  styleUrls: ['./idea-editor.component.scss'],
  standalone: false,
})
export class IdeaEditorComponent {
  private modalController = inject(ModalController);

  readonly enterKeyCode: number = 13;
  id: string = '';
  title: string = '';
  content: string = '';
  currentTag: string = '';
  tags: string[] = [];

  changeTag(event: any, currentTag: string) {
    if (event.keyCode === this.enterKeyCode) {
      this.tags.push(currentTag.toLowerCase());
      this.currentTag = '';
    }
  }

  removeTag(tag: string) {
    const tagIndex = this.tags.indexOf(tag);
    this.tags.splice(tagIndex, 1);
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.currentTag) {
      this.tags.push(this.currentTag);
    }
    const idea: Idea = {
      id: this.id,
      title: this.title,
      content: this.content,
      tags: this.tags,
    };
    return this.modalController.dismiss(idea, 'confirm');
  }
}
