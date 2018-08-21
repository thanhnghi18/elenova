import {Injectable} from '@angular/core';
import {ApplicationModel} from './application.model';
import {SelectOptionModel} from './select-option.model';

@Injectable()
export class ApplicationService {

  private applicationModel: ApplicationModel;

  setApplicationData(applicationData: ApplicationModel) {
    this.applicationModel = applicationData;
  }

  getApplicationDataNonPromise(): ApplicationModel {
    return this.applicationModel;
  }

  getApplicationData(): Promise<ApplicationModel> {
    return Promise.resolve(this.applicationModel);
  }


  getApplicationTypeData(): Array<SelectOptionModel> {
    const applicationTypes = [];
    applicationTypes.push(new SelectOptionModel('1', '申込種別 1'));
    applicationTypes.push(new SelectOptionModel('2', '申込種別 2'));
    applicationTypes.push(new SelectOptionModel('3', '申込種別 3'));
    applicationTypes.push(new SelectOptionModel('4', '申込種別 4'));
    return applicationTypes;
  }

  getPrefecturesData(): Array<SelectOptionModel> {
    const prefecturesTypes = [];
    prefecturesTypes.push(new SelectOptionModel('1', '都道府県 1'));
    prefecturesTypes.push(new SelectOptionModel('2', '都道府県 2'));
    prefecturesTypes.push(new SelectOptionModel('3', '都道府県 3'));
    prefecturesTypes.push(new SelectOptionModel('4', '都道府県 4'));
    return prefecturesTypes;
  }

  getPowerAreaData(): Array<SelectOptionModel> {
    const powerAreas = [];
    powerAreas.push(new SelectOptionModel('1', '東京電力エリア 1'));
    powerAreas.push(new SelectOptionModel('2', '東京電力エリア 2'));
    powerAreas.push(new SelectOptionModel('3', '東京電力エリア 3'));
    powerAreas.push(new SelectOptionModel('4', '東京電力エリア 4'));
    return powerAreas;
  }

  getCurrentCompanyData(): Array<SelectOptionModel> {
    const currentCompany = [];
    currentCompany.push(new SelectOptionModel('03', '東京電力ホールディングス'));
    currentCompany.push(new SelectOptionModel('04', '中部電力株式会社'));
    currentCompany.push(new SelectOptionModel('06', '関西電力株式会社'));
    currentCompany.push(new SelectOptionModel('20', 'JXTGエネルギー株式会社'));
    return currentCompany;
  }

  getPriceData(): Array<SelectOptionModel> {
    const prices = [];
    prices.push(new SelectOptionModel('03', '従量電灯A'));
    prices.push(new SelectOptionModel('04', '従量電灯B'));
    prices.push(new SelectOptionModel('06', '従量電灯C'));
    prices.push(new SelectOptionModel('20', '低圧電力'));
    return prices;
  }

}
