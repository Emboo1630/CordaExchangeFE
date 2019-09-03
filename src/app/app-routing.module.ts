import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PlatformComponent } from './platform/platform.component';
import { IssuerComponent } from './issuer/issuer.component';
import { AnnouncementComponent } from './announcement/announcement.component';


const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'register', component:RegisterComponent },
  {path: 'user', component:UserComponent },
  {path: 'platform', component:PlatformComponent },
  {path: 'issuer', component:IssuerComponent },
  {path: 'login', component:LoginComponent },
  {path: 'announcement', component:AnnouncementComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
