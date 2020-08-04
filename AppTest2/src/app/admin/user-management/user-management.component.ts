import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/_service/role.service';

import { Role } from 'src/app/_models/role'
import { AlertifyService } from 'src/app/_service/alertify.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  searchText;
  editForm: FormGroup;
  addForm: FormGroup;
  roles: Role[];
  p;
  event;

  submitted = false;

  userPattern = "^[a-z0-9_-]{6,12}$";
  namePattern = "^[A-Z]([A-Za-z-]*){1,255}";
   

  constructor(private adminService: AdminService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private formbuilderAdd: FormBuilder,
              private roleService: RoleService,
              private alertService: AlertifyService) { }

  ngOnInit() {
    this.getUsersWithRoles();
    this.getRoles();

    this.editForm = this.formBuilder.group({
      employeeId: [''],
      firstName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      middleName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      roleDescription: ['', Validators.required],
      password: ['']
    });

    this.addForm = this.formbuilderAdd.group({
      username: ['', [Validators.required, Validators.pattern(this.userPattern)]],
      firstName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      middleName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      password: ['', Validators.required],
      roleDescription: ['', Validators.required]

    })
  }

  get usR(){
    return this.addForm.controls;
  }

  get nameV(){
    return this.editForm.controls;
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRole().subscribe((users: User[]) => {
      this.users= users;
    }, error =>{
      console.log(error);
    })
  }

  deleteEmployee(employeeID) {  
    let ans = confirm("Do you want to delete customer with Id: " + employeeID);  
    if (ans) {
      this.alertService.success('Delete employee successfuly!');
        this.adminService.deleteEmployeeById(employeeID).subscribe((data) => {
          this.getUsersWithRoles();
        },  error => console.error(error)
        );
    }  
}   

updateEmployee(employee){
  this.alertService.success('Update employee successfuly!');
  this.adminService.updateEmployee(employee).subscribe((data) => {
    this.getUsersWithRoles();
  },  error => console.error(error)
  );
}

addEmployee(employee)
{
  
  this.adminService.addEmployee(employee).subscribe((data) => {
    this.getUsersWithRoles();
    this.alertService.success('Add employee successfuly!');
    this.addForm.reset();
  // },  error => console.error(error)
}, error =>{
  //console.log(error.message);
  this.alertService.error("Username allredy exsist");
}
  );
}

openModal(targetModal, user){
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: "static"
  });
  
  this.editForm.patchValue({
    employeeId: user.id,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    roleDescription: user.role.roleDescription,
    password: ''
  })
}

 openAddEmpModal(targetModal){
  this.modalService.open(targetModal, {
     centered: true,
     backdrop: "static"
  });
 }

getRoles(){

  this.roleService.getAllRoles().subscribe((roles: Role[]) => {
    this.roles = roles;
  }, error =>{
    console.log(error);
  });
  
}

onSubmit(){
  this.updateEmployee(this.editForm.getRawValue());
  //console.log(this.editForm.getRawValue);
  this.modalService.dismissAll();
}



onSubmitAdd(){

  this.submitted = true;

    if (this.addForm.invalid) {
       return;
   }

  this.addEmployee(this.addForm.getRawValue());
  //console.log(this.addForm.getRawValue());
  this.modalService.dismissAll();
}
}
