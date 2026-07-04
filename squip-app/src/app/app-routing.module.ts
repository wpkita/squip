import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'habits',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then(m => m.FolderPageModule),
  },
  {
    path: 'habits',
    loadChildren: () =>
      import('./habits/habits.module').then(m => m.HabitsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'grooming',
    loadChildren: () =>
      import('./grooming/grooming.module').then(m => m.GroomingPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ideas',
    loadChildren: () =>
      import('./ideas/ideas.module').then(m => m.IdeasPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'moods',
    loadChildren: () => import('./moods/moods.module').then( m => m.MoodsPageModule)
  },
  {
    path: 'targets',
    loadChildren: () => import('./targets/targets.module').then( m => m.TargetsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
