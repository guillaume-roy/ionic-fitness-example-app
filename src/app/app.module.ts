import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MomentModule } from 'angular2-moment';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from '../reducers';
import { UserEffects } from '../effects/user';
import { LevelsEffects } from '../effects/levels';
import { HistoryEffects } from '../effects/history';
import { SessionEffects } from '../effects/session';

import { FitnessExampleApp } from './app.component';
import { LevelsPage } from '../pages/levels/levels';
import { LevelPage } from '../pages/level/level';
import { SessionPage } from '../pages/session/session';
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { HistoryPage } from '../pages/history/history';

import { ExerciseComponent } from '../components/exercise/exercise';

import { LevelsService } from '../services/levels.service';
import { AuthService } from '../services/auth.service';
import { SessionsService } from '../services/sessions.service';
import { OnBoardingService } from '../services/onboarding.service';

import { RestTimePipe } from '../pipes/rest-time.pipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Insomnia } from '@ionic-native/insomnia';
import { Vibration } from '@ionic-native/vibration';

export const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  databaseURL: "XXX",
  projectId: "XXX",
  storageBucket: "XXX",
  messagingSenderId: "XXX"
};

@NgModule({
  declarations: [
    FitnessExampleApp,
    LevelsPage,
    LevelPage,
    SessionPage,
    LoadingPage,
    HistoryPage,
    LoginPage,
    ExerciseComponent,
    RestTimePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(FitnessExampleApp),
    HttpModule,
    StoreModule.provideStore(reducers),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(UserEffects),
    EffectsModule.run(LevelsEffects),
    EffectsModule.run(HistoryEffects),
    EffectsModule.run(SessionEffects),
    MomentModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FitnessExampleApp,
    LevelsPage,
    LevelPage,
    SessionPage,
    LoadingPage,
    LoginPage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LevelsService,
    AuthService,
    SessionsService,
    OnBoardingService,
    Insomnia,
    Vibration
  ]
})
export class AppModule { }
