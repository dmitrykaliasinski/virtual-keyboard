import { HEADER, MAIN, FOOTER } from '../constants/html-structure';

export default class PageBuilder {
  constructor() {
    this.pageStructure = {
      header: HEADER,
      main: MAIN,
      footer: FOOTER,
    };
  }

  create() {
    const body = document.querySelector('body');
    let page = '';
    Object.values(this.pageStructure).forEach((el) => {
      page += el;
    });
    body.innerHTML = page;
  }
}
