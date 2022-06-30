import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService } from '../../../services/request.service'
import { environment } from '../../../../../src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-admin-panel-general-settings',
  templateUrl: './admin-panel-general-settings.component.html',
  styleUrls: ['./admin-panel-general-settings.component.scss']
})
export class AdminPanelGeneralSettingsComponent implements OnInit {
  token: any = ''

  settingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  updateSettingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  arrayOfROTags: any = []
  arrayOfENTags: any = []

  selectedTag: any = {
    language: '',
    index: '',
    name: '',
  }

  constructor(
    private location: Location,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    this.getAllSettings()
  }

  onNavigateBack() {
    this.location.back();
  }

  getAllSettings() {
    return this.requestService.requestGet(`${environment.apiUrl}/settings`, this.settingsModel, { "Authorization": `Bearer ${this.token}` }, () => {
      if (this.settingsModel.value.Article_tags) {
        for (let item of this.settingsModel.value.Article_tags) {
          if (item.language === 'ro') {
            this.arrayOfROTags = item.tags
          } else {
            this.arrayOfENTags = item.tags
          }
        }
      }
    })
  }

  onUpdateTags() {
    let newTags = this.selectedTag.language === 'ro' ? [...this.arrayOfROTags] : [...this.arrayOfENTags]

    if (this.selectedTag.index !== null) {
      newTags[this.selectedTag.index] = this.selectedTag.name
    }

    let body = {
      language: this.selectedTag.language,
      newTags: newTags
    }

    return this.requestService.requestPut(`${environment.apiUrl}/settings`, this.updateSettingsModel, body, { "Authorization": `Bearer ${this.token}` }, () => {
      if (this.updateSettingsModel.message === 'Procesul a fost executat cu succes' || this.updateSettingsModel.message === 'Process completed successfully.') {
        setTimeout(() => {
          $('#editTagModal').modal('hide');
          this.selectedTag = {
            language: '',
            index: '',
            name: '',
          }
          this.getAllSettings()
        }, 1500)
      }
    })
  }

  onOpenEditModalTag(tag: any, indexOfTag: any, language: any) {
    this.selectedTag = {
      language: language,
      index: indexOfTag,
      name: tag,
    }
    this.updateSettingsModel.message = ''
    this.updateSettingsModel.error = ''
  }

}
