import AbstractView from '../framework/view/abstract-view.js';
import {createNewPointTemplate} from '../templates/point-creator-template.js';

export default class NewPointView extends AbstractView {
  get template() {
    return createNewPointTemplate();
  }
}
