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
    const items = [];
    this._initialItems.forEach(item => items.push(this._renderer(item)));
    return items;
  }

}
