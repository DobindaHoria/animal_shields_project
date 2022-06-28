import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  myName: any
  accessToken: any
  languageCode: any

  selectedPath = ''
  constructor() { }

  ngOnInit(): void {
    this.selectedPath = window.location.href.split('/')[3]
    if (localStorage.getItem('name')) {
      this.myName = localStorage.getItem('name')
    }
    if (localStorage.getItem('accessToken')) {
      this.accessToken = localStorage.getItem('accessToken')
    }
    if (localStorage.getItem('languageCode')) {
      console.log('enter')
      this.languageCode = localStorage.getItem('languageCode')
    }
  }

  navLinkClass(itemName:string) {
    if(this.selectedPath !== itemName) return 'nav-link'
    return 'nav-link active'
  }

  onLogout() {
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('role')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('myID')
    this.myName = ''
    this.accessToken = ''
    window.location.href = window.location.origin + '/login'
  }

  isAdminAuthenticated(){
    if( !localStorage.getItem('accessToken') ||  localStorage.getItem('role') !== 'admin') return false
    return true
  }

  onChangeLanguage(event: any) {
    if (!event.target.value) return
    this.languageCode = event.target.value
    localStorage.setItem('languageCode', event.target.value)
  }
}
