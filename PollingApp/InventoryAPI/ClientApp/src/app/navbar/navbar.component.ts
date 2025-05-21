import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   
menuOpen: boolean = false;
  loggedIn: boolean = false; // Declare at the class level

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

}
