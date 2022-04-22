import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : IUser = new IUser();

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {

  }

  saveUser(){
    this.userService.saveUser(this.user).subscribe({
      next:data => {
        alert("Registration Successful!! Please Login")
        this.router.navigate(['/login']);
        console.log(data);

      },
      error:err => {
        console.log(err);
        alert('User Id: ' + this.user.userid + ' Already Exists');
        window.location.reload();
      },
    })
  }

  onSubmit(){
    this.saveUser();
  }
}
