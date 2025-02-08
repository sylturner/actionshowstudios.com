import { Controller } from "../stimulus.js";

export default class extends Controller {
  static targets = ["menu"];

  connect() {
    let menu = this.menuTarget;
    setTimeout(function() {
      menu.classList.add('on');
    }, 1500);
  }
}

