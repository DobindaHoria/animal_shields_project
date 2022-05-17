import { Component, OnInit } from '@angular/core';
import { faDog, faSlidersH, faNewspaper, faUsers  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel-menu',
  templateUrl: './admin-panel-menu.component.html',
  styleUrls: ['./admin-panel-menu.component.scss']
})
export class AdminPanelMenuComponent implements OnInit {
  faDog = faDog
  faSlidersH = faSlidersH
  faNewspaper = faNewspaper
  faUsers = faUsers

  constructor() { }

  ngOnInit(): void {
  }

}
