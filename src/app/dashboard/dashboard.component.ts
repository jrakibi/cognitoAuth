import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  access_token: any
  constructor() { }

  ngOnInit(): void {
    this.access_token = localStorage.getItem('token')

  }

}
