import { Controller } from "../stimulus.js";

export default class extends Controller {
  static targets = ["player", "channel"];

  connect() {
    this.glitch()
  }

  changeVideo(event) {
    const url = event.currentTarget.dataset.url;
    this.playerTarget.src = url;
  }

  glitch() {
    for (let i = 0; i < 4; i++) {
      var span = this.channelTarget.firstElementChild.cloneNode(true);
      this.channelTarget.appendChild(span);
    }
  }
}

