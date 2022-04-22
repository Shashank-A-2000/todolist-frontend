import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : IUser = new IUser();
  returnedUser : any | undefined;
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    this.userService.loginUser(this.user).subscribe(
      {
      next:data => {
        if(data){
            this.returnedUser = data;
            this.router.navigate(['/todolist/'+ this.returnedUser.id + '/' + this.returnedUser.username + '/' + this.returnedUser.userid]);
            console.log(this.returnedUser);

        }
        else{
          alert("Username or Password is Invalid");
          window.location.reload();
        }
      },
      error:err => {
        console.log(err);

      },
    })
  }
  onSubmit(){
    this.loginUser();
  }

}
