import PageBuilder from './components/createHtml/createHtml';
import * as board from './components/keyboard/board';
import { LANG, state } from './components/constants/state';
import handlers from './components/button-handlers/handlers';
import keyCodes from './components/constants/key-code';

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
  // const langButtons = buttons.forEach((button) => button.textContent.match(/^[a-zА-Яё]$/i));

  document.addEventListener('keydown', (event) => {
    const switcherCtrlAlt = event.ctrlKey && event.altKey;
    const switcherShiftAlt = event.shiftKey && event.altKey;
    if (switcherCtrlAlt || switcherShiftAlt) {
      state.lang = state.lang === LANG.RU ? LANG.EN : LANG.RU;
      const keyMap = keyCodes[state.lang];
      buttons.forEach((button, i) => {
        const currentButtons = button;
        currentButtons.textContent = keyMap[i];
        currentButtons.dataset.keyCode = state.lang === 'en'
          ? keyCodes.keyCodeEn[i]
          : keyCodes.keyCodeRu[i];
      });
    }
  });

  document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('shift')) {
      handlers.shiftHandlerUp(buttons);
    }
  });
  document.addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('shift')) {
      handlers.shiftHandlerDown(buttons);
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
      handlers.capsLockHandler(capsLock, buttons);
    } else if (event.target.textContent.length === 1) {
      const buttonValue = event.target.textContent;
      handlers.buttonKeyOutput(buttonValue, textarea);
    }
    textarea.focus();
  });

  document.addEventListener('keydown', (event) => {
    buttons.forEach((button) => {
      if (button.dataset.keyCode === event.key && event.key !== 'CapsLock') {
        button.classList.add('keyboard__button_active');
      }
    });
    if (event.key === 'CapsLock') {
      handlers.capsLockHandler(capsLock, buttons);
    }
    if (event.key === 'Shift') {
      handlers.shiftHandlerUp(buttons);
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
      handlers.shiftHandlerDown(buttons);
    }
  });
});
