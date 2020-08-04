import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // url: string = "/assets/work.jpg";
  // url1: string = "/assets/work1.jpg";
  // url2: string = "/assets/img.jpg";

  images = [445, 863, 770].map((n) => `https://picsum.photos/id/${n}/2000/620`);

  constructor() {    
  }

  ngOnInit() {
  }

}
