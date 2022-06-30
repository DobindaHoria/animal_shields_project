import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { LanguageService } from '../../services/language.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  language: any = ''

  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
	if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
	else this.language='ro'
  }

  onNavigateDonatePage() {
    window.location.href = `${environment.url}/donate`
  }

}
