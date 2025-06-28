import { Controller } from "../stimulus.js";

export default class extends Controller {

  static targets = [ "content", "title" ]

  connect() {
    this.load();
  }

  load() {
    const pageName = this.element.dataset.page;
    fetch(`/assets/js/data/pages/${pageName}.json`, { cache: 'no-store' })
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
      return `<section><h3>${section.heading}</h3>${section.content.join("")}</section>`
    }).join("")
    this.contentTarget.innerHTML = sections;
  }

  renderGallery(data) {
    // TODO: Gallery view
    this.contentTarget.innerHTML = '';
    const sections = data.sections.map((section) => {
      const sectionEl = document.createElement('section');
      sectionEl.classList.add('pb-3');
      sectionEl.classList.add('mb-3');
      sectionEl.classList.add('border-bottom');
      sectionEl.classList.add('text-center');
      const sectionHeader = document.createElement('h3');
      sectionHeader.classList.add('fs-1');

      sectionHeader.innerHTML = section.heading;
      sectionEl.appendChild(sectionHeader);

      section.items.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('video-card');

        const wrapper = document.createElement('a');
        wrapper.href = item.video_url;
        wrapper.target = '_blank';
        wrapper.classList.add('thumbnail-wrapper');

        const thumbnail = document.createElement('img');
        thumbnail.src = `/assets/images/thumbnails/${item.thumbnail}`;
        thumbnail.alt = `${item.title} Video Thumbnail`;
        thumbnail.classList.add('img-thumbnail');

        const playIcon = document.createElement('div');
        playIcon.classList.add('play-icon')

        wrapper.appendChild(thumbnail);
        wrapper.appendChild(playIcon);

        const meta = document.createElement('div');
        meta.classList.add('meta');
        meta.classList.add('pb-3');

        const titleEl = document.createElement('h4');
        titleEl.innerHTML = item.title;

        const descEl = document.createElement('p');
        descEl.classList.add("fs-5");
        descEl.innerHTML = item.description;

        meta.appendChild(titleEl)
        if(item.description) {
          meta.appendChild(descEl)
        }
        //const hr = document.createElement('hr');
        //meta.appendChild(hr)


        itemEl.appendChild(wrapper);
        itemEl.appendChild(meta);
        sectionEl.appendChild(itemEl);
        this.contentTarget.appendChild(sectionEl);
      });
    })
  }

}
