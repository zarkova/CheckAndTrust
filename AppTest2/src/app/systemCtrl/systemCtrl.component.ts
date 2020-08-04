import { Component, OnInit } from '@angular/core';
import { LoggedInOutService } from '../_service/loggedInOut.service';
import { AtWork } from 'src/app/_models/atWork';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-systemCtrl',
  templateUrl: './systemCtrl.component.html',
  styleUrls: ['./systemCtrl.component.css']
})
export class SystemCtrlComponent implements OnInit {

  atWork: AtWork;

  url: string =  "/assets/nwl.jpg";


  constructor(private loggedInOutService: LoggedInOutService,
              private alertService: AlertifyService) { }

  ngOnInit() {
    this.getByIdAtWorked();
  }

  getByIdAtWorked(){
    const obj = localStorage.getItem('user');
    const user = JSON.parse(obj);
    this.loggedInOutService.getByIdAtWork(user.id).subscribe((atW: AtWork) => {
      console.log(atW);
      this.atWork= atW;
    }, error =>{
      console.log(error);
    })
  }

  buttonStartWork(){
    this.alertService.success('Welcome to work!');
    this.loggedInOutService.loginAtWork().subscribe((data) => {
      this.getByIdAtWorked();
    },  error => console.error(error)
    );
  }

  buttonLeaveWork(){
    this.alertService.success('The working day ended successfully!');
    this.loggedInOutService.logoutFromWork().subscribe((data) => {
      this.atWork=null;
    },  error => console.error(error)
    );
  }

}
