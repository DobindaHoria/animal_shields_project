import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { BlogComponent } from './pages/blog/blog.component'
import { DonationComponent } from './pages/donation/donation.component'
import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'

const routes: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'blog', component: BlogComponent},
	{path: 'donation', component: DonationComponent},
	{path: 'login', component: LoginComponent},
	{path: 'sign-up', component: SignUpComponent},
	{path: 'forgot-password', component: ForgotPasswordComponent},
	{path: '**', component: DashboardComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
