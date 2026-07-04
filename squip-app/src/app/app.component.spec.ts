import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  const authServiceMock = {
    user$: of(null),
    isAuthenticated$: of(false),
    loginWithRedirect: () => {},
    logout: () => {},
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterModule.forRoot([])],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a menu entry for each app page', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const list = fixture.nativeElement.querySelector('#inbox-list');
    const labels = list.querySelectorAll('ion-label');
    expect(labels.length).toEqual(app.appPages.length);
    app.appPages.forEach((page, i) => {
      expect(labels[i].textContent).toContain(page.title);
    });
  });

  it('should configure the expected navigation pages', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.appPages.map((page) => page.url)).toEqual([
      '/habits',
      '/grooming',
      '/ideas',
      '/moods',
      '/targets',
    ]);
  });

});
