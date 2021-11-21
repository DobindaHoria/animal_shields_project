import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles = [
    { _id: '1', title: 'title1', content: 'content1', last_update: '2021-21-11 07:37:53', tags: ['Eticheta A', 'Eticheta B'] },
    { _id: '2', title: 'title2', content: 'content2', last_update: '2022-22-22 07:37:53', tags: ['Eticheta C'] },
  ]

  articlesTags = ['Eticheta A', 'Eticheta B', 'Eticheta C']

  tags = [];
  search = '';

  constructor() { }

  ngOnInit(): void {
  }


  /* SearchByCheckbox(tag) {
    let i = this.tags.indexOf(tag);

    if (i === -1)
      this.tags.push(tag);
    else
      this.tags.splice(i, 1);

    this.FilterArticles(this.search, this.tags)
  } */

 /*  FilterArticles(text, tags) {
    let textSearch = ''
    let tagForm = ''
    if (tags.length != 0) {
      if (tags.length == 1) {
        tagForm = `&tags=${tags[0]}` + `&tags=${tags[0]}`
      } else {
        for (let i = 0; i < tags.length; i++) {
          {
            tagForm += `&tags=${tags[i]}`
          }
        }
      }
    }
    if (this.search != undefined && this.search != '') {
      textSearch = `&text=${this.search}`
    } else if (this.search == undefined || this.search != '') {
      textSearch = '';
    }
    return this.requestService.requestGet(`${environment.apiUrl}/articles?company=${this.slug}${textSearch}${tagForm}`, this.articles, {}, () => {
      this.articles.value.reverse();
    });
  } */


}
