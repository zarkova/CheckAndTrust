import { Component, OnInit } from '@angular/core';
import { LoggedInOutService } from 'src/app/_service/loggedInOut.service';
import { AtWork } from 'src/app/_models/atWork';

@Component({
  selector: 'app-at-work-panel',
  templateUrl: './at-work-panel.component.html',
  styleUrls: ['./at-work-panel.component.css']
})
export class AtWorkPanelComponent implements OnInit {
  atWork: AtWork[];
  searchText;

  constructor(private loggedinSerrvice: LoggedInOutService) { }

  ngOnInit() {
    this.getAllAtWork();
  }

   getAllAtWork(){
     this.loggedinSerrvice.getAllAtWork().subscribe((atWork: AtWork[]) =>{
       this.atWork = atWork;
     }, error =>{
       console.log(error);
     })
   }
}
