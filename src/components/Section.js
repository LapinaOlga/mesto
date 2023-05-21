 export default class Section {

    constructor(settings, selector) {
        this._settings = settings;
        this._container = document.querySelector(selector);
    }

    render() {
        this._settings.items.forEach((item) => {
            this.addItem(this._settings.renderer(item))
        });
    }

    addItem(item) {
        this._container.prepend(item);
    }
}