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
import { PostListComponent } from './shared/components/posts/post-list/post-list.component';
import { PostDetailComponent } from './shared/components/posts/post-detail/post-detail.component';
import { PostCreateComponent } from './shared/components/posts/post-create/post-create.component';
import { PostEditComponent } from './shared/components/posts/post-edit/post-edit.component';
import { PostDeleteComponent } from './shared/components/posts/post-delete/post-delete.component';
import { PostSearchComponent } from './shared/components/posts/post-search/post-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LayoutComponent,
    AuthComponent,
    SignInComponent,
    StartupComponent,
    PostListComponent,
    PostDetailComponent,
    PostCreateComponent,
    PostEditComponent,
    PostDeleteComponent,
    PostSearchComponent,
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
      { path: 'post-list', component: PostListComponent },
      { path: 'post-create', component: PostCreateComponent },
      { path: 'post-search', component: PostSearchComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
