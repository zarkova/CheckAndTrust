import { Component, OnInit } from '@angular/core';
import { HistoryAtWork } from 'src/app/_models/historyAtWok';
import { User } from 'src/app/_models/user';
import { LoggedInOutService } from 'src/app/_service/loggedInOut.service';

@Component({
  selector: 'app-wrk-his-panel',
  templateUrl: './wrk-his-panel.component.html',
  styleUrls: ['./wrk-his-panel.component.css']
})
export class WrkHisPanelComponent implements OnInit {

  historyAtWork: HistoryAtWork[];
  user: User;
  searchDate;
  searchText;
  searchText1;
  p;
  event;

  constructor(private logInOutService: LoggedInOutService) { 

  }

  ngOnInit() {
    this.allUsersHostory();
  }

  allUsersHostory(){
    const obj = localStorage.getItem('user');
    this.user=JSON.parse(obj);

    this.logInOutService.getAllHustory().subscribe((historyAtWork: HistoryAtWork[]) => {
      this.historyAtWork = historyAtWork.reverse();
    }, error => {
      console.log(error);
    })
  }

  clearValue(){
    this.searchDate = '';
    this.searchText = '';
    this.searchText1 = '';
  }
}
