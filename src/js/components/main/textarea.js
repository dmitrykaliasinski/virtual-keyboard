export default function createTextarea() {
  const body = document.querySelector('body');
  const main = document.createElement('main');
  const textArea = `<div class="container container_main"><div class="text-wrapper">
  <textarea rows="10" cols="45" name="text" class="textarea" autofocus></textarea></div>
  </div>`;
  main.innerHTML = textArea;
  body.append(main);
}
