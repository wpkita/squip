import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {IdeasPageRoutingModule} from './ideas-routing.module';

import {IdeasPage} from './ideas.page';
import {IdeaEditorComponent} from './idea-editor/idea-editor.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, IdeasPageRoutingModule],
  declarations: [IdeasPage, IdeaEditorComponent],
})
export class IdeasPageModule {}
