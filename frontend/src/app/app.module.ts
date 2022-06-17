import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DonationComponent } from './pages/donation/donation.component';
import { ArticleListComponent } from './components/blog/article-list/article-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule ,HttpClient} from "@angular/common/http";
// import { QuillModule } from 'ngx-quill';

//pages
import { AdminPanelMenuComponent } from './pages/admin-panel/admin-panel-menu/admin-panel-menu.component';
import { AdminPanelGeneralSettingsComponent } from './pages/admin-panel/admin-panel-general-settings/admin-panel-general-settings.component';
import { AdminPanelArticlesComponent } from './pages/admin-panel/admin-panel-articles/admin-panel-articles.component';
import { AuthService } from './services/auth.service';
import { CreateUserComponent } from './pages/admin-panel/admin-panel-users/create-user/create-user.component';
import { UpdateUserComponent } from './pages/admin-panel/admin-panel-users/update-user/update-user.component';
import { UsersListComponent } from './pages/admin-panel/admin-panel-users/users-list/users-list.component';
import { DogsListComponent } from './pages/admin-panel/admin-panel-dogs/dogs-list/dogs-list.component';
import { DogsDetailsComponent } from './pages/admin-panel/admin-panel-dogs/dogs-details/dogs-details.component';
import { CreateDogComponent } from './pages/admin-panel/admin-panel-dogs/create-dog/create-dog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlogComponent,
    DonationComponent,
    ArticleListComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    AdminPanelMenuComponent,
    AdminPanelGeneralSettingsComponent,
    AdminPanelArticlesComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UsersListComponent,
    DogsListComponent,
    DogsDetailsComponent,
    CreateDogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
	// QuillModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
