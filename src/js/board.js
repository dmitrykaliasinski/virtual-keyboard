export const keyCodes = {
  ru: [
    'ё',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'Backspace',
    'Tab',
    'й',
    'ц',
    'у',
    'к',
    'е',
    'н',
    'г',
    'ш',
    'щ',
    'з',
    'х',
    'ъ',
    '\\',
    'Del',
    'CapsLock',
    'ф',
    'ы',
    'в',
    'а',
    'п',
    'р',
    'о',
    'л',
    'д',
    'ж',
    'э',
    'Enter',
    'Shift',
    'я',
    'ч',
    'с',
    'м',
    'и',
    'т',
    'ь',
    'б',
    'ю',
    '.',
    '↑',
    'Shift',
    'Ctrl',
    'Win',
    'Alt',
    'Space',
    'Alt',
    '←',
    '↓',
    '→',
    'Ctrl',
  ],
  en: [
    '`',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'Backspace',
    'Tab',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    '[',
    ']',
    '\\',
    'Del',
    'CapsLock',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    ';',
    "'",
    'Enter',
    'Shift',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    ',',
    '.',
    '/',
    '↑',
    'Shift',
    'Ctrl',
    'Win',
    'Alt',
    'Space',
    'Alt',
    '←',
    '↓',
    '→',
    'Ctrl',
  ],
  keycodeEn: [
    '`',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'Backspace',
    'Tab',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    '[',
    ']',
    '\\',
    'Delete',
    'CapsLock',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    ';',
    "'",
    'Enter',
    'Shift',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    ',',
    '.',
    '/',
    'ArrowUp',
    'Shift',
    'Control',
    'Meta',
    'Alt',
    ' ',
    'Alt',
    'ArrowLeft',
    'ArrowDown',
    'ArrowRight',
    'Control',
  ],
  keycodeRu: [
    'ё',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'Backspace',
    'Tab',
    'й',
    'ц',
    'у',
    'к',
    'е',
    'н',
    'г',
    'ш',
    'щ',
    'з',
    'х',
    'ъ',
    '\\',
    'Delete',
    'CapsLock',
    'ф',
    'ы',
    'в',
    'а',
    'п',
    'р',
    'о',
    'л',
    'д',
    'ж',
    'э',
    'Enter',
    'Shift',
    'я',
    'ч',
    'с',
    'м',
    'и',
    'т',
    'ь',
    'б',
    'ю',
    '.',
    'ArrowUp',
    'Shift',
    'Control',
    'Meta',
    'Alt',
    ' ',
    'Alt',
    'ArrowLeft',
    'ArrowDown',
    'ArrowRight',
    'Control',
  ],
};

export function generateButtons(lang = 'en') {
  const keymap = keyCodes[lang];
  const keyButtonContainer = new DocumentFragment();
  keymap.map((key, i) => {
    const keyButton = document.createElement('button');
    keyButton.classList.add('keyboard-button');
    keyButton.classList.add(key.toLowerCase());
    if (lang === 'en') {
      keyButton.dataset.keyCode = keyCodes.keycodeEn[i];
    } else {
      keyButton.dataset.keyCode = keyCodes.keycodeRu[i];
    }
    keyButton.textContent = key;
    keyButtonContainer.append(keyButton);
    return true;
  });
  return keyButtonContainer;
}

export function createKeyBoard(lang) {
  const mainContainer = document.querySelector('.container-main');
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-list');
  keyboardWrapper.append(generateButtons(lang));
  mainContainer.append(keyboardWrapper);
}
