import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';
declare var $: any;

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
    name: "",
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

  deleteUserModel: any = {
    message: "",
    error: "",
    value: null
  }

  selectedUserID: any = ''

  filteredUsers:any

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
    window.location.href = `${environment.url}/admin-panel-dashboard`
  }

  onNavigateToModifyPage(userID: any) {
    window.location.href = window.location.origin+ '/admin-panel-dashboard/update-user/' + userID
  }

  onSearch(waitTime = 200) {
    this.filteredUsers = [...this.usersModel.value.users]
    if(this.search.name) {
      this.filteredUsers = this.filteredUsers.filter((user: { name: any }) => user?.name?.toLowerCase()?.includes(this.search.name.toLowerCase()))
    }
    if(this.search.role) {
      this.filteredUsers = this.filteredUsers.filter((user: { role: any; }) => user?.role?.toLowerCase()?.includes(this.search.role.toLowerCase()))
    }
  }

  onResetSearch() {
    this.search = {
      name: "",
      role: ""
    }
    this.filteredUsers = [...this.usersModel.value.users]
    this.onSearch(0);
  }

  getAllSettings() {
    return this.requestService.requestGet(`${environment.apiUrl}/settings`, this.settingsModel, { "Authorization": `Bearer ${this.token}` })
  }

  getUsers() {
    return this.requestService.requestGet(`${environment.apiUrl}/users?language=${this.language || 'ro'}`, this.usersModel, { "Authorization": `Bearer ${this.token}` }, ()=> {
      this.filteredUsers = [...this.usersModel.value.users]
    })
  }

  getUserById(userID: string) {
    if (!userID) return
    return this.requestService.requestGet(`${environment.apiUrl}/users/${userID}?language=${this.language || 'ro'}`, this.userByIDModel, { "Authorization": `Bearer ${this.token}` })
  }

  onDeleteUser() {
    if (!this.selectedUserID) return
    return this.requestService.requestDelete(`${environment.apiUrl}/users/${this.selectedUserID}`, this.deleteUserModel, { "Authorization": `Bearer ${this.token}` }, () => {
      if (this.deleteUserModel.message === 'Procesul a fost executat cu succes' || this.deleteUserModel.message === 'Process completed successfully.') {
        this.selectedUserID = ''
        setTimeout(() => {
          $('#deleteUserModal').modal('hide');
          this.getUsers()
          this.deleteUserModel.message = ''
        }, 1500)
      }
    })
  }

}
