import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { BlogComponent } from './pages/blog/blog.component'
import { DonationComponent } from './pages/donation/donation.component'
import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import { AdminPanelMenuComponent } from './pages/admin-panel/admin-panel-menu/admin-panel-menu.component';
// User Management
import {UsersListComponent} from './pages/admin-panel/admin-panel-users/users-list/users-list.component'
import {CreateUserComponent} from './pages/admin-panel/admin-panel-users/create-user/create-user.component'
import {UpdateUserComponent} from './pages/admin-panel/admin-panel-users/update-user/update-user.component'
// end region User Management

// Dogs Management
import { DogsListComponent } from './pages/admin-panel/admin-panel-dogs/dogs-list/dogs-list.component';
import { CreateDogComponent } from './pages/admin-panel/admin-panel-dogs/create-dog/create-dog.component';
// import { UpdateDogComponent } from './pages/admin-panel/admin-panel-dogs/dogs-details/dogs-details.component';
// end region Dogs Management

import { AdminPanelGeneralSettingsComponent } from './pages/admin-panel/admin-panel-general-settings/admin-panel-general-settings.component';
import { AdminPanelArticlesComponent } from './pages/admin-panel/admin-panel-articles/admin-panel-articles.component';

const routes: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'blog', component: BlogComponent},
	{path: 'donation', component: DonationComponent},
	{path: 'login', component: LoginComponent},
	{path: 'sign-up', component: SignUpComponent},
	{path: 'forgot-password', component: ForgotPasswordComponent},
	{path: 'admin-panel-dashboard', component: AdminPanelMenuComponent},
	{path: 'admin-panel-dashboard/users-list', component: UsersListComponent},
	{path: 'admin-panel-dashboard/create-user', component: CreateUserComponent},
	{path: 'admin-panel-dashboard/update-user/:id', component: UpdateUserComponent},
	{path: 'admin-panel-dashboard/dogs', component: DogsListComponent},
	{path: 'admin-panel-dashboard/general-settings', component: AdminPanelGeneralSettingsComponent},
	{path: 'admin-panel-dashboard/articles', component: AdminPanelArticlesComponent},
	{path: '**', component: DashboardComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
