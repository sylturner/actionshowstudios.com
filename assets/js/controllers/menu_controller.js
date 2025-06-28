import { Controller } from "../stimulus.js";

export default class extends Controller {
  static targets = [ "menu", "links", "socials", "page" ];

  initialize() {
    setTimeout(() => {
      this.menuTarget.classList.add('on');
    }, 1500);

    fetch('/assets/js/data/main-menu.json')
      .then(res => res.json())
      .then(data => this.createLinks(data))
  }

  createLinks(data) {
    data.main.forEach((node) => {
      const link = document.createElement('a');
      link.classList.add("list-group-item");
      link.classList.add("list-group-item-action");
      link.title = node.title;
      link.textContent = node.title;

      if(node.external_link) {
        link.href = node.external_link;
        link.target = "_blank"
      }
      else {
        link.href = `#${node.page}`;
        link.dataset.menuPage = node.page;
        link.dataset.action = "screen#openPage";
      }

      this.linksTarget.appendChild(link)
    });
    this.createSocialLinks(data);
  }

  createSocialLinks(data) {
    data.socials.forEach((social) => {
      const link = document.createElement('a');
      link.title = social.title;
      link.href = social.url;
      link.target = "_blank";
      link.classList.add("p-2")

      const img = document.createElement('img');
      img.src = `/assets/images/icons/${social.title.toLowerCase()}.png`
      img.alt = social.title;

      link.appendChild(img);
      this.socialsTarget.appendChild(link);
    });
  }
}

