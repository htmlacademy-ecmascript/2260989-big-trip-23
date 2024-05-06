import {getDestinations} from '../mock/destinations.js';


//Создаем класс для управления данными о пунктах назначения
export default class DestinationsModel {
  constructor() {
    this.destinations = getDestinations(); //Возвращаем массив пунктов назначения
  }

  get() {
    return this.destinations;
  }

  getById(id) {
    return this.destinations.find((destination) => destination.id === id); //Возвращаем объект пункта назначения согласно id
  }
}
