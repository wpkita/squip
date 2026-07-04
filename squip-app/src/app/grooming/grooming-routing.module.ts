import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroomingPage } from './grooming.page';

const routes: Routes = [
  {
    path: '',
    component: GroomingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroomingPageRoutingModule {}
