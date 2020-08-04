import { Component, OnInit } from '@angular/core';
import { LoggedInOutService } from '../_service/loggedInOut.service';
import { HistoryAtWork } from '../_models/historyAtWok'; 
import { User } from '../_models/user';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  atWorkHistory: HistoryAtWork[];

  user: User;
  searchDate;
  p;
  event;

  url: string = "/assets/history2.png";

  constructor(private logInOutService: LoggedInOutService) { }

  ngOnInit() {
    this.UserHistory();
  }

  UserHistory(){

     const obj = localStorage.getItem('user');
     this.user=JSON.parse(obj);

    return this.logInOutService.getUserHistory(this.user.id)
    .subscribe((atWorkHistory: HistoryAtWork[]) =>{
      this.atWorkHistory = atWorkHistory.reverse();
    }, error => {
      console.log(error);
    })
  }

  clearValue(){
    this.searchDate = '';
  }

}
