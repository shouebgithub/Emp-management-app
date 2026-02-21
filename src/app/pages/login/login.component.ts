import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginObj: any = {
Username: '',
password: ''
}

router = inject(Router);


login() {
  // console.log("click click");
  
if(this.loginObj.Username == "admin" && this.loginObj.password == "admin"){
  this.router.navigateByUrl("dashboard");
  localStorage.setItem('login', this.loginObj.Username)
} else {
alert("incorrect credentials");
}

}

}
