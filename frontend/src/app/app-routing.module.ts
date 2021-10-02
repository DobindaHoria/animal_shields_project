import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { BlogComponent } from './pages/blog/blog.component'
import { DonationComponent } from './pages/donation/donation.component'

const routes: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'blog', component: BlogComponent},
	{path: 'donation', component: DonationComponent},
	{path: '**', component: DashboardComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
