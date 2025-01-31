// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2020 - 2021 Gemeente Amsterdam
import {
  WONEN_WONINGKWALITEIT,
  WONEN_LEEGSTAND,
  WONEN_ONDERVERHUUR,
  WONEN_OVERIG,
  WONEN_VAKANTIEVERHUUR,
  WONEN_WONINGDELEN,
} from '../../support/selectorsCreateSignal';
import { MANAGE_SIGNALS } from '../../support/selectorsManageIncidents';
import questions from '../../fixtures/questions/questions.json';
import { generateToken } from '../../support/jwt';
import signal from '../../fixtures/signals/wonenOverig.json';
import * as routes from '../../support/commandsRouting';
import * as createSignal from '../../support/commandsCreateSignal';

describe('Create signal "Wonen woning overig" and check signal details', () => {
  describe('Create signal wonen overig', () => {
    before(() => {
      routes.stubMap();
      cy.visit('incident/beschrijf');
    });

    it('Should show specific questions illegal holiday rental', () => {
      createSignal.setDescriptionPage(signal);
      cy.contains('Volgende').click();

      createSignal.checkSpecificInformationPage(signal);
      const warningPhone = questions.wonen.extra_wonen_vakantieverhuur_bellen_of_formulier.label;
      cy.contains(questions.wonen.wonen_overig.label).should('be.visible');

      // Holiday rental
      cy.get(WONEN_OVERIG.radioButtonToeristischeVerhuur).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_toeristen_aanwezig.label).should('be.visible');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonToeristenNee).check({ force: true }).should('be.checked');
      cy.contains(warningPhone).should('not.exist');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonToeristenWeetIkNiet).check({ force: true }).should('be.checked');
      cy.contains(warningPhone).should('not.exist');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonToeristenJa).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_aantal_mensen.label).should('be.visible');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonHoeveelVierOfMinder).check({ force: true }).should('be.checked');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonHoeveelVijfOfMeer).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_hoe_vaak.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_wanneer.label).should('not.exist');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonHoeVaakEersteKeer).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_wanneer.label).should('not.exist');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonHoeVaakWekelijks).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_wanneer.label).should('be.visible');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonHoeVaakDagelijks).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_wanneer.label).should('not.exist');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonHoeVaakMaandelijks).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_wanneer.label).should('be.visible');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonWanneerWeekend).check({ force: true }).should('be.checked');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonWanneerDoordeweeks).check({ force: true }).should('be.checked');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonWanneerWisselend).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_bewoning.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_bewoning.subtitle).should('be.visible');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonBewoningWeetIkNiet).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_naam_bewoner.label).should('not.exist');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonBewoningNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_naam_bewoner.label).should('not.exist');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonBewoningJa).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_naam_bewoner.label).should('be.visible');
      cy.get(WONEN_VAKANTIEVERHUUR.inputBewoner).type('Gijsbrecht van Aemstel');

      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_online_aangeboden.label).should('be.visible');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonOnlineNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_link_advertentie.label).should('not.exist');
      cy.get(WONEN_VAKANTIEVERHUUR.radioButtonOnlineJa).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_vakantieverhuur_link_advertentie.label).should('be.visible');
      cy.get(WONEN_VAKANTIEVERHUUR.inputLink).type('https://amsterdam.intercontinental.com/nl/');
    });

    it('Should show specific questions illegal rental', () => {
      // Illegal rental
      cy.get(WONEN_OVERIG.radioButtonIllegaleOnderhuur).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_onderhuur_aantal_personen.label).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAantalPersonen1).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAantalPersonen3).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_bewoners_familie.label).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAantalPersonen2).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAantalPersonen4).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_bewoners_familie.label).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAantalPersonenWeetNiet).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAantalPersonen5).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_bewoners_familie.label).should('be.visible');

      cy.get(WONEN_ONDERVERHUUR.radioButtonFamilieJa).check({ force: true }).should('be.checked');
      cy.get(WONEN_ONDERVERHUUR.radioButtonFamilieNee).check({ force: true }).should('be.checked');
      cy.get(WONEN_ONDERVERHUUR.radioButtonFamilieWeetNiet).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_onderhuur_naam_bewoners.label).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.inputNamen).type('Yennefer en Geralt of Rivia');

      cy.contains(questions.wonen.extra_wonen_onderhuur_woon_periode.label).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.radioButtonHoeLangWeetNiet).check({ force: true }).should('be.checked');
      cy.get(WONEN_ONDERVERHUUR.radioButtonHoeLangMinderZesMaanden).check({ force: true }).should('be.checked');
      cy.get(WONEN_ONDERVERHUUR.radioButtonHoeLangLangerZesMaanden).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_onderhuur_iemand_aanwezig.label).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.inputTijdstip).type('Elke avond en nacht zijn deze personen aanwezig.');

      cy.contains(questions.wonen.extra_wonen_onderhuur_naam_huurder.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_onderhuur_naam_huurder.subtitle).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.inputHuurder).type('Ja, dat is Vesemir');

      cy.contains(questions.wonen.extra_wonen_onderhuur_huurder_woont.label).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAdresHuurderJaZelfde).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_adres_huurder.label).should('not.exist');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAdresHuurderNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_adres_huurder.label).should('not.exist');
      cy.get(WONEN_ONDERVERHUUR.radioButtonAdresHuurderJaAnder).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_onderhuur_adres_huurder.label).should('be.visible');
      cy.get(WONEN_ONDERVERHUUR.inputAdresHuurder).type('Kaer Morhen');
    });

    it('Should show specific questions vacancy', () => {
      // Vacancy
      cy.get(WONEN_OVERIG.radioButtonLeegstand).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_leegstand_naam_eigenaar.label).should('be.visible');
      cy.get(WONEN_LEEGSTAND.inputEigenaar).type('A. Hitchcock');

      cy.contains(questions.wonen.extra_wonen_leegstand_periode.label).should('be.visible');
      cy.get(WONEN_LEEGSTAND.radioButtonLeegZesMaandenOfLanger).check({ force: true }).should('be.checked');
      cy.get(WONEN_LEEGSTAND.radioButtonLeegMinderDanZesMaanden).check({ force: true }).should('be.checked');
      cy.get(WONEN_LEEGSTAND.radioButtonLeegPeriodeWeetIkNiet).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_leegstand_woning_gebruik.label).should('be.visible');
      cy.get(WONEN_LEEGSTAND.radioButtonGebruiktWeetIkNiet).check({ force: true }).should('be.checked');
      cy.get(WONEN_LEEGSTAND.radioButtonGebruiktNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_leegstand_naam_persoon.label).should('not.exist');
      cy.contains(questions.wonen.extra_wonen_leegstand_activiteit_in_woning.label).should('not.exist');
      cy.contains(questions.wonen.extra_wonen_leegstand_iemand_aanwezig.label).should('not.exist');

      cy.get(WONEN_LEEGSTAND.radioButtonGebruiktJa).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_leegstand_naam_persoon.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_leegstand_activiteit_in_woning.label).should('be.visible');
      cy.get(WONEN_LEEGSTAND.inputNaam).type('J. Aniston');
      cy.get(WONEN_LEEGSTAND.inputWatDoetPersoon).type('Deze persoon zit de hele dag te acteren');
      cy.get(WONEN_LEEGSTAND.inputTijdstip).type('Vooral in de avond');
    });

    it('Should show specific questions house sharing', () => {
      // House sharing
      cy.get(WONEN_OVERIG.radioButtonWoningdelen).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_vermoeden.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_woningdelen_vermoeden.subtitle).should('be.visible');
      cy.get(WONEN_WONINGDELEN.inputWatSpeeltZichAf).type('Ik vermoed tovenarij');

      cy.contains(questions.wonen.extra_wonen_woningdelen_eigenaar.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.inputEigenaar).type('Ja, dat weet ik.');

      cy.contains(questions.wonen.extra_wonen_woningdelen_adres_huurder.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_woningdelen_adres_huurder.subtitle).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAdresHuurderJaZelfde).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_adres_huurder.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAdresHuurderNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_adres_huurder.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAdresHuurderJaAnder).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woningdelen_aantal_personen.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen1).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen3).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen2).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen4).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonenWeetNiet).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen5).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonFamilieWeetNiet).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonFamilieJa).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonFamilieNee).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woningdelen_samenwonen.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonTegelijkWeetNiet).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonTegelijkJa).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonTegelijkNee).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woningdelen_wisselende_bewoners.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAndereBewonersWeetNiet).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonAndereBewonersNee).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonAndereBewonersJa).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woningdelen_iemand_aanwezig.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.inputTijdstip).type('Voornamelijk op de dinsdagen om 23:23:05');
    });

    it('Should show specific questions house quality', () => {
      // House quality
      cy.get(WONEN_OVERIG.radioButtonAchterstalligOnderhoud).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_direct_gevaar.label).should('be.visible');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonGevaarJa).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_direct_gevaar_alert.answers)
        .should('be.visible')
        .and($labels => {
          expect($labels).to.have.css('color', 'rgb(236, 0, 0)');
        });
      cy.get(WONEN_WONINGKWALITEIT.radioButtonGevaarNee).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_gemeld_bij_eigenaar.label).should('be.visible');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonKlachtGemeldNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_direct_gevaar_ja.answers).should('be.visible');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonKlachtGemeldJa).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_direct_gevaar_ja.answers).should('not.exist');

      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_bewoner.label).should('be.visible');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonBewonerJa).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_namens_bewoner.label).should('not.exist');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonBewonerNee).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_namens_bewoner.label).should('be.visible');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonNamensBewonerJa).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonNamensBewonerNee).check({ force: true }).should('be.checked');

      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_toestemming_contact.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_toestemming_contact.subtitle).should('be.visible');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonContactJa).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_toestemming_contact_ja.answers).should('be.visible');
      cy.get(WONEN_WONINGKWALITEIT.radioButtonContactNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_toestemming_contact_ja.answers).should('not.exist');
      cy.contains(questions.wonen.extra_wonen_woonkwaliteit_geen_contact.label).should('be.visible');

      cy.get(WONEN_WONINGKWALITEIT.inputGeenContact).type('Vertel ik liever niet');
    });

    it('Should show specific questions criminal', () => {
      routes.stubPreviewMap();
      routes.postSignalRoutePublic();
      // Criminal
      cy.get(WONEN_OVERIG.radioButtonCrimineleBewoning).check({ force: true }).should('be.checked');
      cy.get(WONEN_OVERIG.radioButtonWoningdelen).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_vermoeden.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_woningdelen_vermoeden.subtitle).should('be.visible');
      cy.get(WONEN_WONINGDELEN.inputWatSpeeltZichAf).type('Ik vermoed iets met katten');
      cy.contains(questions.wonen.extra_wonen_woningdelen_eigenaar.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.inputEigenaar).type('Ja, dat weet ik wel.');
      cy.contains(questions.wonen.extra_wonen_woningdelen_adres_huurder.label).should('be.visible');
      cy.contains(questions.wonen.extra_wonen_woningdelen_adres_huurder.subtitle).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAdresHuurderJaZelfde).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_adres_huurder.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAdresHuurderNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_onderhuur_adres_huurder.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAdresHuurderJaAnder).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_aantal_personen.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen1).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen3).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen2).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen5).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonenWeetNiet).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('not.exist');
      cy.get(WONEN_WONINGDELEN.radioButtonAantalPersonen4).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_bewoners_familie.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonFamilieWeetNiet).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonFamilieNee).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonFamilieJa).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_samenwonen.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonTegelijkWeetNiet).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonTegelijkNee).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonTegelijkJa).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_wisselende_bewoners.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.radioButtonAndereBewonersWeetNiet).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonAndereBewonersJa).check({ force: true }).should('be.checked');
      cy.get(WONEN_WONINGDELEN.radioButtonAndereBewonersNee).check({ force: true }).should('be.checked');
      cy.contains(questions.wonen.extra_wonen_woningdelen_iemand_aanwezig.label).should('be.visible');
      cy.get(WONEN_WONINGDELEN.inputTijdstip).type('Elke dag is er wel iemand anders');
      cy.contains('Volgende').click();

      createSignal.setPhonenumber(signal);
      cy.contains('Volgende').click();

      createSignal.setEmailAddress(signal);
      cy.contains('Volgende').click();

      createSignal.checkSummaryPage(signal);
      cy.contains('Verstuur').click();
      cy.wait('@postSignalPublic');
      cy.get(MANAGE_SIGNALS.spinner).should('not.exist');

      createSignal.checkThanksPage();
      createSignal.saveSignalId();
    });
  });
  describe('Check data created signal', () => {
    before(() => {
      localStorage.setItem('accessToken', generateToken('Admin', 'signals.admin@example.com'));
      routes.getManageSignalsRoutes();
      routes.getSignalDetailsRoutesById();
      cy.visit('/manage/incidents/');
      routes.waitForManageSignalsRoutes();
    });

    it('Should show the signal details', () => {
      routes.stubPreviewMap();
      createSignal.openCreatedSignal();
      routes.waitForSignalDetailsRoutes();

      createSignal.checkAllDetails(signal);
    });
  });
});
