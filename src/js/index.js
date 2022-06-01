import CreatePage from './components/createHtml/createHtml';
import * as board from './components/main/board';

import '../css/main.scss';

const createPage = new CreatePage();

const LANG = { RU: 'ru', EN: 'en' };

const state = {
  lang: LANG.RU,
  capsLock: false,
};

const KEYBOARD = {
  tab: '  ',
  space: ' ',
  enter: '\n',
};

window.addEventListener('beforeunload', () => {
  localStorage.setItem('language', state.lang);
});

window.addEventListener('DOMContentLoaded', () => {
  const language = localStorage.getItem('language');
  if (language !== null) {
    state.lang = language;
  }
});

window.addEventListener('DOMContentLoaded', () => {
  createPage.create();
  board.createKeyBoard(state.lang);

  const keyBoard = document.querySelector('.keyboard-list');

  document.addEventListener('keydown', (event) => {
    const switcherCtrlAlt = event.ctrlKey && event.altKey;
    const switcherShiftAlt = event.shiftKey && event.altKey;
    if (switcherCtrlAlt || switcherShiftAlt) {
      state.lang = state.lang === LANG.RU ? LANG.EN : LANG.RU;
      keyBoard.innerHTML = '';
      keyBoard.innerHTML = board.generateButtons(state.lang);
    }
  });

  const textarea = document.querySelector('.textarea');
  const capsLock = document.querySelector('.capslock');

  const capsLockHandler = () => {
    const buttons = document.querySelectorAll('.keyboard__button');
    if (!state.capsLock) {
      buttons.forEach((button) => {
        const currentButtons = button;
        if (button.textContent.trim().length === 1) {
          state.capsLock = true;
          currentButtons.textContent = button.textContent.toUpperCase();
          currentButtons.dataset.keyCode = button.textContent.toUpperCase();
          capsLock.classList.add('keyboard__button_active');
        }
      });
    } else {
      buttons.forEach((button) => {
        const currentButtons = button;
        if (currentButtons.textContent.trim().length === 1) {
          state.capsLock = false;
          currentButtons.textContent = button.textContent.toLowerCase();
          currentButtons.dataset.keyCode = button.textContent.toLowerCase();
          capsLock.classList.remove('keyboard__button_active');
        }
      });
    }
  };

  const shiftHandlerUp = () => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((button) => {
      const currentButtons = button;
      if (button.textContent.trim().length === 1) {
        currentButtons.textContent = button.textContent.toUpperCase();
      }
    });
  };
  const shiftHandlerDown = () => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((button) => {
      const currentButtons = button;
      if (button.textContent.trim().length === 1) {
        currentButtons.textContent = button.textContent.toLowerCase();
      }
    });
  };

  const backspaceHandler = () => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt - 1)
                     + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 1, cursorAt - 1);
  };

  const tabHandler = () => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + KEYBOARD.tab + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 2, cursorAt + 2);
  };

  const spaceHandler = () => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + KEYBOARD.space
                     + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 1, cursorAt + 1);
  };

  const enterHandler = () => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + KEYBOARD.enter
                     + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 1, cursorAt + 1);
  };

  const deleteHandler = () => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + textarea.value.slice(cursorAt + 1);
    textarea.setSelectionRange(cursorAt + 1, cursorAt);
  };

  const buttonKeyOutput = (buttonValue) => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + buttonValue
                     + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 1, cursorAt + 1);
  };

  document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('shift')) {
      shiftHandlerUp();
    }
  });
  document.addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('shift')) {
      shiftHandlerDown();
    }
  });

  document.addEventListener('click', (event) => {
    const currentButton = event.target.dataset.keyCode;
    if (currentButton === 'Backspace') {
      backspaceHandler();
    }
    if (currentButton === 'Tab') {
      tabHandler();
    }
    if (currentButton === ' ') {
      spaceHandler();
    }
    if (currentButton === 'Enter') {
      enterHandler();
    }
    if (currentButton === 'Delete') {
      deleteHandler();
    }
    if (currentButton === 'CapsLock') {
      capsLockHandler();
    } else if (event.target.textContent.length === 1) {
      const buttonValue = event.target.textContent;
      buttonKeyOutput(buttonValue);
    }
    textarea.focus();
  });

  document.addEventListener('keydown', (event) => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((button) => {
      if (button.dataset.keyCode === event.key) {
        button.classList.add('keyboard__button_active');
      }
    });
  });
  document.addEventListener('keyup', (event) => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((button) => {
      if (button.dataset.keyCode === event.key) {
        button.classList.remove('keyboard__button_active');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'CapsLock') {
      capsLockHandler();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
      shiftHandlerUp();
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
      shiftHandlerDown();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      tabHandler();
    }
  });
});
