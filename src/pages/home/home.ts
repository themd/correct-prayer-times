import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrayerTimes } from '../../services/prayer-times.service'
import { Subscription } from "rxjs/Rx"

interface PrayerDay {
  Asr: string
  Dhuhr:string  
  Fajr:string  
  Imsaak:string
  Isha:string  
  Maghrib:string
  Sunrise:string
  Sunset:string
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  prayerTimesSubscription$: Subscription

  month: object
  today: PrayerDay
  currentDate: Date

  constructor(public navCtrl: NavController, private prayerTimesService: PrayerTimes) {
    this.currentDate = new Date()
    console.log(this.currentDate.getDate())
    this.prayerTimesSubscription$ = this.prayerTimesService.prayerTimeList$.subscribe(month=> {
      this.month = month
      this.today = this.month[`${this.currentDate.getDate()}`]
      console.log(this.today.Fajr)   
    })
  }

  ionViewDidLoad() {    
    this.fetchMonth()
  }

  fetchMonth() {
    this.prayerTimesService.fetchPrayerTimes()
  }

}
