import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

import { DailySummaryComponent } from './daily-summary.component';

describe('DailySummaryComponent', () => {
  let component: DailySummaryComponent;
  let fixture: ComponentFixture<DailySummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
      declarations: [ DailySummaryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
