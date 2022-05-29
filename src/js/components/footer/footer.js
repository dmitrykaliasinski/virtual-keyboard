// export default function createFooter() {
//   const body = document.querySelector('body');
//   const footer = document.createElement('footer');
//   const footerElements = `
//   <div class="container">
//     <p>Клавиатура создана в операционной системе Windows</p>
//     <p>Для переключения языка комбинация: левыe ctrl + alt</p>
//   </div>
//   `;
//   footer.innerHTML = footerElements;
//   body.append(footer);
// }

class CreateElements {
  constructor() {
    this.body = document.querySelector('body');
    this.header = `
    <div class="container">
      <h1 class="name">Virtual keyboard</h1>
    </div>
    `;
    this.footer = `
    <div class="container">
      <p>Клавиатура создана в операционной системе Windows</p>
      <p>Для переключения языка комбинация: левыe ctrl + alt</p>
    </div>
    `;
    this.textarea = `
    <div class="container container_main">
      <div class="text-wrapper">
        <textarea rows="10" cols="45" name="text" class="textarea" autofocus></textarea>
      </div>
    </div>
    `;
  }

  create(element) {
    const el = document.createElement(element);
    // if (element === 'header') {
    //   el.innerHTML = this.header;
    // }
    // if (element === 'footer') {
    //   el.innerHTML = this.footer;
    // }
    // if (element === 'main') {
    //   el.innerHTML = this.textarea;
    // }
    el.innerHTML = this[element];

    this.body.append(el);
  }
}

const createHtml = new CreateElements();
export default createHtml;
