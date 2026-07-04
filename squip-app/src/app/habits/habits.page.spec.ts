import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {IonicModule} from '@ionic/angular';

import {HabitsPage} from './habits.page';

describe('HabitsPage', () => {
  let component: HabitsPage;
  let fixture: ComponentFixture<HabitsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
      declarations: [HabitsPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
