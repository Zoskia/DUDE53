import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './core/components/navigation/navigation.component';

import { RouterModule } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth.component';
import { SignInComponent } from './core/components/sign-in/sign-in.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { StartupComponent } from './core/components/startup/startup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LayoutComponent,
    AuthComponent,
    SignInComponent,
    StartupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: StartupComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'sign-in', component: SignInComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
