import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        console.log('User logged in:', user);
        this.router.navigate(['/home']); // we will create this next
      }
    });
  }

  login() {
    this.authService
      .login()
      .then((res) => {
        console.log('Login success:', res);
      })
      .catch((err) => {
        console.error('Login error:', err);
      });
  }
}
