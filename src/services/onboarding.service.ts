import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class OnBoardingService {
  constructor(private alertCtrl: AlertController) { }

  handleBetaDisclamer() {
    if (localStorage.getItem('onboarding.betaDisclamer') === null) {
      let alert = this.alertCtrl.create({
        title: 'Bienvenue !',
        subTitle: "Cette application est actuellement en version beta. Il pourrait y avoir des bugs ou des incohérences. Pour toute anomalie ou idée d'amélioration. N'hésitez pas à me contacter.",
        buttons: [{
          text: "C'est parti !",
          handler: () => {
            localStorage.setItem('onboarding.betaDisclamer', true.toString());
          }
        }]
      });
      alert.present();
    }
  }
}
