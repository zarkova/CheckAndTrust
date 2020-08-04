import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/user';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_service/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator'; 
import { AlertifyService } from '../_service/alertify.service';




@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  passPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,25}$"; // Hera!123 or Anj1G@de for example
  user: User;
  accountForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private userpassService: UserService,
              private alertService: AlertifyService) {
     //console.log('getUserFromToken: ', authService.getUserFromToken());
     //console.log('getUserFromLocalStorage: ', authService.getUserFromLocalStorage());
   }

  ngOnInit() {

    this.accountForm = this.formBuilder.group({
      employeeId: [''],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleDescription: [''],
      password: ['', [Validators.required,
                      Validators.pattern(this.passPattern)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    );

    this.getFromLogalStrUser();

  }

  getFromLogalStrUser(){
     const obj = localStorage.getItem('user');
     this.user=JSON.parse(obj);
     console.log(this.user);
  }

  openModal(targetModal, user){
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static"
   });

   this.accountForm.patchValue({
    employeeId: user.id,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    roleDescription: user.role.roleDescription,
    password: '',
    confirmPassword: ''
  });
   
  }

   get f() {
     return this.accountForm.controls;
   }

   updatePass(info){
     this.alertService.success('Password changed successfully!');
     this.userpassService.changePassword(info).subscribe(error => {
       console.log(error);
     });
   }

  onSubmitPass(){

    this.submitted = true;

    if (this.accountForm.invalid) {
       return;
   }

   this.updatePass(this.accountForm.getRawValue());
   //console.log(this.accountForm.getRawValue());
   this.modalService.dismissAll();
   //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.accountForm.value))
}

  
}
