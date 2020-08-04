import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/_service/role.service';
import { Role } from 'src/app/_models/role';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_service/alertify.service';

@Component({
  selector: 'app-roles-panel',
  templateUrl: './roles-panel.component.html',
  styleUrls: ['./roles-panel.component.css']
})
export class RolesPanelComponent implements OnInit {

  roleForm: FormGroup;
  roles: Role[];
  searchText;

  constructor(private roleService: RoleService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private alertService: AlertifyService) { }

  ngOnInit() {
    this.getRoles();
    //console.log(this.getRoles());

    this.roleForm = this.formBuilder.group({
      roleDescription: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

   getRoles(){
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    }, error =>{
      console.log(error);
    });
   }

   addRole(role){
     this.alertService.success('Add role successfuly');
     this.roleService.addRole(role).subscribe((data) => {
      this.getRoles();
    },  error => console.error(error)
    );
   }

   openAddRoleModal(targetModal){
    this.modalService.open(targetModal, {
       centered: true,
       backdrop: "static"
    });
  
   }

   onSubmitAddRole(){
    this.addRole(this.roleForm.getRawValue());
    //console.log(this.roleForm.getRawValue());
    this.modalService.dismissAll();
  }

}
