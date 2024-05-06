import {getOffers} from '../mock/offers.js';

//Создаем класс для управления предложениями услуг трансопрта
export default class OffersModel {
  constructor() {
    this.offers = getOffers(); //Возвращаем массив объектов услуг транспорта
  }

  get() {
    return this.offers;
  }

  getByType(type) { //Возвращаем объект предложения, соответствующий переданному type(строка)
    return this.offers.find((offers) => offers.type === type.toLowerCase()).offers;
  }
}
