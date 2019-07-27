import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/take';

const PRAYER_URL = 'http://praytime.info/getprayertimes.php?lat=47.070714&lon=15.439503999999943&gmt=120&m=9&y=2017&school=6&params=14.6,4.0,14.6,0,0,0,0,1,18.0,0';
const CORS = 'https://cors-anywhere.herokuapp.com/';

@Injectable()
export class PrayerTimes {
  private readonly prayerTimeSubject$: Subject<any> = new Subject();
  prayerTimeList$: Observable<any> = this.prayerTimeSubject$.asObservable();
  constructor(private http: HttpClient) { }
  fetchPrayerTimes(longitude?: string, latitude?: string, month?: number) {
    return this.http.get(CORS + PRAYER_URL)
      .take(1).subscribe(res => {
        this.prayerTimeSubject$.next(res
        );
        console.log(res);
      });
  }
}
