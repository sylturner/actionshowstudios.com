import { Controller } from "../stimulus.js";

export default class extends Controller {
  static targets = ["container"];

  connect() {
    this.loadVideos();
  }

  async loadVideos() {
    try {
      const response = await fetch("/assets/js/data/videos.json");
      const videos = await response.json();
      this.renderVideos(videos);
    } catch (error) {
      console.error("Error loading videos:", error);
    }
  }

  renderVideos(videos) {
    this.containerTarget.innerHTML = videos
      .map(
        (video) => `
      <div class="video-thumbnail" data-action="click->screen#changeVideo" data-url="${video.url}">
        <img src="${video.thumbnail}" alt="${video.title}">
        <p>${video.title}</p>
      </div>
    `
      )
      .join("");
  }
}

