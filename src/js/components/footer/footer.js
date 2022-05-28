export default function createFooter() {
  const body = document.querySelector('body');
  const footer = document.createElement('footer');
  const footerElements = `<div class="container">
    <p>Клавиатура создана в операционной системе Windows</p>
    <p>Для переключения языка комбинация: левыe ctrl + alt</p>
  </div>`;
  footer.innerHTML = footerElements;
  body.append(footer);
}
