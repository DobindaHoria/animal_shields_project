import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DonationComponent } from './pages/donation/donation.component';
import { ArticleListComponent } from './components/blog/article-list/article-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlogComponent,
    DonationComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
