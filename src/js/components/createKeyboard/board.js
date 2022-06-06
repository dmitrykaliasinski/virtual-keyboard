import keyCodes from '../../constants/key-code';

export function generateButtons(lang = 'en') {
  const keyMap = keyCodes[lang];
  let keyButtonContainer = '';
  keyMap.forEach((key, i) => {
    const keyButton = `
    <button class="keyboard__button ${key.toLowerCase()}"
      data-key-code="${lang === 'en'
    ? keyCodes.keyCodeEn[i]
    : keyCodes.keyCodeRu[i]}">${key}</button>
    `;
    keyButtonContainer += keyButton;
  });
  return keyButtonContainer;
}

export function createKeyBoard(lang) {
  const mainContainer = document.querySelector('.container_main');
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-list');
  keyboardWrapper.innerHTML = generateButtons(lang);
  mainContainer.append(keyboardWrapper);
}
