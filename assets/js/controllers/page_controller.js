import { Controller } from "../stimulus.js";

export default class extends Controller {

  static targets = [ "container", "title" ]

  connect() {
    this.load();
  }

  load() {
    const pageName = this.element.dataset.page;
    fetch(`/assets/js/data/pages/${pageName}.json`)
      .then(res => res.json())
      .then(data => this.render(data));
  }

  render(data) {
    this.titleTarget.textContent = data.title;
    if(data.type === "basic") {
      this.renderBasic(data)
    } else if(data.type === "gallery") {
      this.renderGallery(data)
    }
  }

  renderBasic(data) {
    const sections = data.sections.map((section) => {
      return `<section><h2>${section.heading}</h2>${section.content.join("")}</section>`
    }).join("")
    this.containerTarget.innerHTML = sections;
  }

  renderGallery(data) {
    // TODO: Gallery view
  }

}
