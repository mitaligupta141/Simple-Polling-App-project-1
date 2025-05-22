import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './registerlogin/register/register.component';
import { LoginComponent } from './registerlogin/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterloginComponent } from './registerlogin/registerlogin.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ShowVoteComponent } from './show-vote/show-vote.component';
import { HomeComponent } from './home/home.component';
import { VotePercentComponent } from './vote-percent/vote-percent.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
   {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'RegisterPage' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginPage' }
  },
  { path: 'registerlogin', component: RegisterloginComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'logout', component: LogoutComponent }, 
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'createpoll', component: CreatePollComponent },
   // { path: 'showvote', component: ShowVoteComponent },
     { path: '', component: HomeComponent },

     {
    path: 'createpoll',
    component: CreatePollComponent,
    canActivate: [authGuard], 
  },

  {
    path: 'showvote',
    component: ShowVoteComponent,
    canActivate: [authGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },


          { path: 'poll-results/:id', component: VotePercentComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule] 
})
export class AppRoutingModule { }