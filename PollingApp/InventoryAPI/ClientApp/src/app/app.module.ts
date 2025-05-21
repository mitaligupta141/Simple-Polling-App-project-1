import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegisterloginComponent } from './registerlogin/registerlogin.component';
import { RegisterComponent } from './registerlogin/register/register.component';
import { LoginComponent } from './registerlogin/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ShowVoteComponent } from './show-vote/show-vote.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { VotePercentComponent } from './vote-percent/vote-percent.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PollDialogComponent } from './poll-dialog/poll-dialog.component';
import { MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { MatListModule } from '@angular/material/list';
import { HighchartsChartModule } from 'highcharts-angular';

import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';








@NgModule({
  declarations: [
    AppComponent,
    PollDialogComponent,
    RegisterloginComponent, 
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    LogoutComponent,
    CreatePollComponent,
    CreatePollComponent,
    ShowVoteComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    VotePercentComponent
  
  ],
  imports: [
    
     BrowserAnimationsModule,
    BrowserModule,
    
    AppRoutingModule,
    FormsModule,
    AppRoutingModule, 
    HttpClientModule,
    NgChartsModule,
     BrowserAnimationsModule,
  ToastrModule.forRoot(),
  MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
     MatTableModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
     MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
 MatDividerModule ,
 MatToolbarModule,
 MatListModule,
  HighchartsChartModule,
  MatSortModule,
  MatMenuModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
