import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { map } from 'rxjs';
import { CheckInsService } from './check-ins.service';
import { Mood } from './mood';
import { MoodEntry } from './mood-entry';
import { CheckInForCreation } from './check-in-for-creation';
import { MoodForCreation } from './mood-for-creation';
import { MoodsService } from './moods.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss'],
  standalone: false,
})
export class MoodsPage implements OnInit {
  @ViewChild(IonModal) addModal: IonModal | undefined;
  moodEntries: MoodEntry[] = [];
  newMoodName: string = '';

  constructor(
    private moodsService: MoodsService,
    private checkInsService: CheckInsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetMoodEntries();
  }

  private resetMoodEntries() {
    this.moodsService
      .get()
      .pipe(
        map((moods: Mood[]) => {
          return moods.map<MoodEntry>((mood: Mood) => {
            return { mood, magnitude: 0 };
          });
        })
      )
      .subscribe((moods) => (this.moodEntries = moods));
  }

  checkIn(moodEntries: MoodEntry[]) {
    var moodEntriesForCreation = moodEntries.map((moodEntry) => {
      return {
        moodId: moodEntry.mood.id,
        magnitude: moodEntry.magnitude,
      };
    });
    const checkIn: CheckInForCreation = {
      moodEntries: moodEntriesForCreation,
    };
    this.checkInsService.add(checkIn).subscribe((_) => {
      this.resetMoodEntries();
      this.router.navigate(['']);
    });
  }

  cancelAdd() {
    this.addModal?.dismiss(null, 'cancel');
  }

  confirmAdd() {
    this.addModal?.dismiss(this.newMoodName, 'confirm');
  }

  dismissAdd(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      const newMood: MoodForCreation = {
        name: ev.detail.data!,
      };

      this.moodsService.add(newMood).subscribe((response) => {
        this.moodEntries.push({ mood: response, magnitude: 0 });
        this.newMoodName = '';
      });
    }
  }
}
