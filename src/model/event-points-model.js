import {getRandomEventPoint} from '../mock/event-points.js';
import {POINTS_COUNT} from '../const.js';

//Создаем класс для управления объектом точек событий
export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomEventPoint); //Создаем массив в котором каждый элемент - объект события

  getEventPoints() {
    return this.points;
  }
}
