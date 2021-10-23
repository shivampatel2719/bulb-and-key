import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ReviewFormComponent } from './components/review-page/dialogs/review-form/review-form.component';
import { AuthGaurd } from './components/review-page/auth.gaurd';

const appRouters: Routes = [
  {
    path: '',
    redirectTo: 'review-page',
    pathMatch: 'full',
  },
  {
    path: 'review-page',
    component: ReviewPageComponent
  },
  {
    path: 'review-image',
    canActivate: [ AuthGaurd ],
    component: ReviewFormComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ReviewPageComponent,
    ReviewFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouters),
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    // FlexLayoutModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
