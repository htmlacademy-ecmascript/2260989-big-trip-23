export default class OffersModel {
  #service = null;
  #offers = null;

  constructor(service) {
    this.#service = service;
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers
      .find((offer) => offer.type === type).offers;
  }

  async init() {
    this.#offers = await this.#service.offers;
    return this.#offers;
  }
}
