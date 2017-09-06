import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingPage } from '../pages/loading/loading';
import { LevelsPage } from '../pages/levels/levels';
import { HistoryPage } from '../pages/history/history';

@Component({
  templateUrl: 'app.html'
})
export class FitnessExampleApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoadingPage;
  pages: Array<{title: string, component: any}> = [{
    title: 'Niveaux',
    component: LevelsPage
  }, {
    title: 'Historique',
    component: HistoryPage
  }];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
