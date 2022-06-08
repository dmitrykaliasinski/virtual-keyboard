import PageBuilder from './components/pageBuilder/createHtml';
import * as board from './components/createKeyboard/board';
import { LANG, state } from './constants/state';
import handlers from './button-handlers/handlers';
import keyCodes from './constants/key-code';

import '../css/main.scss';

const createPage = new PageBuilder();

window.addEventListener('beforeunload', () => {
  localStorage.setItem('language', state.lang);
});

window.addEventListener('DOMContentLoaded', () => {
  createPage.create();
  board.createKeyBoard(state.lang);

  const textarea = document.querySelector('.textarea');
  const capsLock = document.querySelector('.capslock');
  const buttons = document.querySelectorAll('.keyboard__button');
  const letterButtons = (button) => button.textContent.match(/^[a-zА-Яё]$/i);

  document.addEventListener('keydown', (event) => {
    const switcherCtrlAlt = event.ctrlKey && event.altKey;
    const switcherShiftAlt = event.shiftKey && event.altKey;
    if (switcherCtrlAlt || switcherShiftAlt) {
      state.lang = state.lang === LANG.RU ? LANG.EN : LANG.RU;
      const keyMap = keyCodes[state.lang];
      buttons.forEach((button, i) => {
        const currentButton = button;
        if (letterButtons(button)) {
          currentButton.textContent = keyMap[i];
          currentButton.dataset.keyCode = state.lang === 'en'
            ? keyCodes.keyCodeEn[i]
            : keyCodes.keyCodeRu[i];
        }
      });
    }
  });

  document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('shift')) {
      handlers.shiftHandlerUp(buttons, letterButtons);
    }
  });
  document.addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('shift')) {
      handlers.shiftHandlerDown(buttons, letterButtons);
    }
  });

  document.addEventListener('click', (event) => {
    const currentButton = event.target.dataset.keyCode;
    if (currentButton === 'Backspace') {
      handlers.backspaceHandler(textarea);
    }
    if (currentButton === 'Tab') {
      handlers.tabHandler(textarea);
    }
    if (currentButton === ' ') {
      handlers.spaceHandler(textarea);
    }
    if (currentButton === 'Enter') {
      handlers.enterHandler(textarea);
    }
    if (currentButton === 'Delete') {
      handlers.deleteHandler(textarea);
    }
    if (currentButton === 'CapsLock') {
      handlers.capsLockHandler(capsLock, buttons, letterButtons);
    } else if (event.target.textContent.length === 1) {
      const buttonValue = event.target.textContent;
      handlers.buttonKeyOutput(buttonValue, textarea);
    }
    textarea.focus();
  });

  document.addEventListener('keydown', (event) => {
    textarea.focus();
    buttons.forEach((button) => {
      if (button.dataset.keyCode === event.key && event.key !== 'CapsLock') {
        button.classList.add('keyboard__button_active');
      }
      if (letterButtons(button) && button.dataset.keyCode === event.key) {
        event.preventDefault();
        handlers.buttonKeyOutput(button.textContent, textarea);
      }
    });
    if (event.key === 'CapsLock') {
      handlers.capsLockHandler(capsLock, buttons, letterButtons);
    }
    if (event.key === 'Shift') {
      handlers.shiftHandlerUp(buttons, letterButtons);
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      handlers.tabHandler(textarea);
    }
  });

  document.addEventListener('keyup', (event) => {
    buttons.forEach((button) => {
      if (button.dataset.keyCode === event.key && event.key !== 'CapsLock') {
        button.classList.remove('keyboard__button_active');
      }
    });
    if (event.key === 'Shift') {
      handlers.shiftHandlerDown(buttons, letterButtons);
    }
  });
});
