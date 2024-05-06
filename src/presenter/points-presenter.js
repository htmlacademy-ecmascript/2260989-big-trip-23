import {render} from '../render.js';
import EventListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import PointEditorView from '../view/point-editor-view.js';
import SortingView from '../view/sorting-view.js';

//Создаем класс который отвечает за представление данных о точках событий
export default class PointsPresenter {
  listComponent = new EventListView(); //Создаем новый экземпляр списка событий
  sortingComponent = new SortingView(); //Создаем новый экземпляр компонента сортировки

  constructor({tripEventsContainer,pointsModel,offersModel,destinationsModel}) { //Сохраняем ссылки на контейнеры (события, модели точек, предложение и направление)
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.eventPoints = [...this.pointsModel.getEventPoints()];

    render(this.sortingComponent, this.tripEventsContainer);
    render(this.listComponent, this.tripEventsContainer);
    render(new PointEditorView(), this.listComponent.getElement());

    for (let i = 0; i < this.eventPoints.length; i++) {
      const offers = this.offersModel.getByType(this.eventPoints[i].type); //Получаем предложения соответствующие типу события
      const destination = this.destinationsModel.getById(this.eventPoints[i].destination); //Получаем информацию о направлении
      render(new EventItemView({eventPoint: this.eventPoints[i],offers,destination}), this.listComponent.getElement()); //Рендерим представление каждого события
    }
  }
}
