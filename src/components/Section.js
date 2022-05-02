export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._initialItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  rendererItem(item) {
    return this._renderer(item);
  }

  renderInitialItems() {
    const cards = [];
    this._initialItems.forEach(item => cards.push(this._renderer(item)));
    return cards;
  }

}
