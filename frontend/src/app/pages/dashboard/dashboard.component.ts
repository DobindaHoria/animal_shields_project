import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onNavigateDonatePage() {
    window.location.href = `${environment.url}/donate`
  }

}
