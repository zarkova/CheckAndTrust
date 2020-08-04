import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  isVisibale = false;

  constructor(private viewContainerref: ViewContainerRef, private templateRef: TemplateRef<any>,
    private authService: AuthService) { }

    ngOnInit(){

      const userRoles = this.authService.decodedToken.role as Array<string>;
      //if no roles clear the viewContainerRef
      if(!userRoles){
        this.viewContainerref.clear();
      }

      if(this.authService.roleMatch(this.appHasRole)){
        if(!this.isVisibale){
          this.isVisibale = true;
          this.viewContainerref.createEmbeddedView(this.templateRef);
        }
        else{
          this.isVisibale = false;
          this.viewContainerref.clear();
        }
      }
    }

}
