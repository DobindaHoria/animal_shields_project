import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  token: any = ''
  language: any = ''
  role: any = ''

  search: any = {
    firstName: "",
    lastName: "",
    department: "",
    role: ""
  }

  settingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  usersModel: any = {
    message: "",
    error: "",
    value: null
  }

  userByIDModel: any = {
    message: "",
    error: "",
    value: null
  }

  constructor(
    private location: Location,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
    if (localStorage.getItem('role')) this.role = localStorage.getItem('role')
    this.getAllSettings()
    this.getUsers()
  }

  onNavigateBack() {
    this.location.back();
  }

  onSearch(waitTime = 200) {

    // if (this.searchTimeout)
    //   window.clearTimeout(this.searchTimeout);
    //   this.searchTimeout = setTimeout(() => {
    //   let url = new URL(`${environment.apiUrl}/users?company=${this.company}`);
    //   if (this.search.first_name.length > 0)
    //     url.searchParams.append("first_name", this.search.first_name);
    //   if (this.search.last_name.length > 0)
    //     url.searchParams.append("last_name", this.search.last_name);
    //   if (this.search.department.length > 0)
    //     url.searchParams.append("department", this.search.department);
    //   if (this.search.role.length > 0) {
    //     url.searchParams.append("role", this.search.role);
    //   }
    //   if (this.search.first_name == '' && this.search.last_name == '' && this.search.department == '' && this.search.role == '') {
    //     this.users.value = [];
    //   } else {
    //     this.requestService.requestGet(url.href, this.users, { "Authorization": `Bearer ${this.token}` }, () => {
    //       this.searchTimeout = null;
    //     });
    //   }
    // }, waitTime);

  }

  onResetSearch() {
    this.search = {
      department: "",
      first_name: "",
      last_name: "",
      role: ""
    }
    this.onSearch(0);
  }

  getAllSettings() {
    return this.requestService.requestGet(`${environment.apiUrl}/settings`, this.settingsModel, { "Authorization": `Bearer ${this.token}` })
  }

  getUsers() {
    return this.requestService.requestGet(`${environment.apiUrl}/users?language=${this.language || 'ro'}`, this.usersModel, { "Authorization": `Bearer ${this.token}` })
  }

  getUserById(userID: string) {
    if (!userID) return
    return this.requestService.requestGet(`${environment.apiUrl}/users/${userID}?language=${this.language || 'ro'}`, this.userByIDModel, { "Authorization": `Bearer ${this.token}` })
  }

}
