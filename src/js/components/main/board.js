import keyCodes from '../constants/key-code';

export function generateButtons(lang = 'en') {
  const keyMap = keyCodes[lang];
  const keyButtonContainer = new DocumentFragment();
  keyMap.forEach((key, i) => {
    const keyButton = document.createElement('button');
    keyButton.classList.add('keyboard__button');
    keyButton.classList.add(key.toLowerCase());
    if (lang === 'en') {
      keyButton.dataset.keyCode = keyCodes.keyCodeEn[i];
    } else {
      keyButton.dataset.keyCode = keyCodes.keyCodeRu[i];
    }
    keyButton.textContent = key;
    keyButtonContainer.append(keyButton);
    return true;
  });
  return keyButtonContainer;
}

export function createKeyBoard(lang) {
  const mainContainer = document.querySelector('.container_main');
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-list');
  keyboardWrapper.append(generateButtons(lang));
  mainContainer.append(keyboardWrapper);
}
