export default function createHeader() {
  const body = document.querySelector('body');
  const header = document.createElement('header');
  const headerElements = `
  <div class="container">
    <h1 class="name">Virtual keyboard</h1>
  </div>
  `;
  header.innerHTML = headerElements;
  body.append(header);
}

// class Header {
//   constructor() {
//     this.elements = `
//     <div class="container">
//       <h1 class="name">Virtual keyboard</h1>
//     </div>
//     `;
//   }

//   create() {
//     const body = document.querySelector('body');
//     const header = document.createElement('header');
//     header.innerHTML = this.elements;
//     body.append(header);
//   }
// }
