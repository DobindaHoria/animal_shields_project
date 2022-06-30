import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { RequestService } from '../../../../services/request.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  token: any = ''

  articlesModel: any = {
    value: [],
    message: "",
    error: "",
  }

  filteredArticles: any = []

  deleteArticleModel: any = {
    value: [],
    message: "",
    error: ""
  }


  selectedLanguage: string = 'ro'
  selectedArticleID: any = ''

  filterArticle: any = ''

  constructor(private requestService: RequestService, private router: Router, private location: Location,) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    this.getAllArticles()
  }

  buildPicturePath(url: any) {
    let newUrl =url.slice(7)
    return `${environment.imageBaseUrl}/${newUrl}`
  }

  onFilterArticles() {
    this.filteredArticles = [...this.articlesModel.value.articles].filter(article => (article.texts[0].title.toLowerCase()).includes(this.filterArticle.toLowerCase()))
  }

  getAllArticles() {
    return this.requestService.requestGet(`${environment.apiUrl}/articles?language=${this.selectedLanguage}`, this.articlesModel, { "Authorization": `Bearer ${this.token}` }, ()=> {
      this.filteredArticles = this.articlesModel.value.articles
    })
  }

  getTitle(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.selectedLanguage)
    return selectedText.title || '-'
  }

  getContent(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.selectedLanguage)
    return selectedText.content || '-'
  }

  getTags(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.selectedLanguage)
    return selectedText.tags || []
  }

  onDeleteArticle() {
    if (!this.selectedArticleID) return
    return this.requestService.requestDelete(`${environment.apiUrl}/articles/${this.selectedArticleID}`, this.deleteArticleModel, { "Authorization": `Bearer ${this.token}` }, () => {
      if (this.deleteArticleModel.message === 'Procesul a fost executat cu succes' || this.deleteArticleModel.message === 'Process completed successfully.') {
        this.selectedArticleID = ''
        setTimeout(() => {
          $('#deleteArticleModal').modal('hide');
          this.getAllArticles()
          this.deleteArticleModel.message = ''
        }, 1500)
      }
    })
  }

  onNavigateBack() {
	window.location.href = `${environment.url}/admin-panel-dashboard`
  }

  NavigateToArticleUpdate(articleID: string) {
    this.router.navigateByUrl(`/admin-panel-dashboard/update-article/` + articleID);
  }


}
