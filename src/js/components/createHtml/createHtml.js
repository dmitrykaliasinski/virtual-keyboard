import { HEADER, MAIN, FOOTER } from '../constants/html-structure';

export default class CreatePage {
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
