import { Controller } from "../stimulus.js";

const CHANNEL_HIDE_TIME = 7000; // ms

export default class extends Controller {
  static targets = [ "player", "channel", "page", "menu" ];

  connect() {
    this.glitch();
    setTimeout(() => {
      this.channelTarget.classList.add("hide");
    }, CHANNEL_HIDE_TIME);
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

  openPage(event) {
    const page = event.currentTarget.dataset.menuPage;
    this.pageTarget.dataset.page = page;

    const pageController = this.application.getControllerForElementAndIdentifier(this.pageTarget, "page");
    pageController.load();

    this.pageTarget.style.display = "block";
    this.pageTarget.classList.remove("fade-out");
    this.pageTarget.classList.add("fade-in");
    this.menuTarget.classList.add("disabled");
  }

  closePage(event) {
    this.pageTarget.classList.remove("fade-in");
    this.pageTarget.classList.add("fade-out");
    this.pageTarget.style.display = "none";
    this.menuTarget.classList.remove("disabled");
  }
}
