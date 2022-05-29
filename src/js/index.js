import createHeader from './components/header/header';
import createFooter from './components/footer/footer';
import createTextarea from './components/main/textarea';
import * as board from './components/main/board';

import '../css/main.scss';

const state = {
  lang: 'ru',
  text: '',
  capsLock: false,
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
  createHeader();
  createTextarea();
  board.createKeyBoard(state.lang);
  createFooter();

  const keyBoard = document.querySelector('.keyboard-list');

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.altKey) {
      if (state.lang === 'ru') {
        state.lang = 'en';
      } else {
        state.lang = 'ru';
      }
      keyBoard.innerHTML = '';
      keyBoard.append(board.generateButtons(state.lang));
    }
  });

  const textarea = document.querySelector('.textarea');
  const capsLock = document.querySelector('.capslock');

  const capsLockActive = () => {
    const buttons = document.querySelectorAll('.keyboard__button');
    state.capsLock = true;
    buttons.forEach((button) => {
      const currentButtons = button;
      if (currentButtons.textContent.length === 1) {
        currentButtons.textContent = button.textContent.toUpperCase();
        currentButtons.dataset.keyCode = button.textContent.toUpperCase();
        capsLock.classList.add('keyboard__button_active');
      }
    });
  };
  const capsLockUnActive = () => {
    const buttons = document.querySelectorAll('.keyboard__button');
    state.capsLock = false;
    buttons.forEach((button) => {
      const currentButtons = button;
      if (currentButtons.textContent.length === 1) {
        currentButtons.textContent = button.textContent.toLowerCase();
        currentButtons.dataset.keyCode = button.textContent.toLowerCase();
        capsLock.classList.remove('keyboard__button_active');
      }
    });
  };

  document.addEventListener('click', (event) => {
    const currentButton = event.target.dataset.keyCode;
    if (currentButton === 'Backspace') {
      state.text = state.text.slice(0, state.text.length - 1);
    }
    if (currentButton === 'Tab') {
      state.text += '  ';
    }
    if (currentButton === ' ') {
      state.text += ' ';
    }
    if (currentButton === 'Enter') {
      state.text += '\n';
    }
    if (currentButton === 'Delete') {
      const cursorAt = textarea.selectionStart;
      state.text = state.text.slice(0, cursorAt) + state.text.slice(cursorAt + 1);
    }
    if (currentButton === 'CapsLock') {
      if (!state.capsLock) {
        capsLockActive();
      } else {
        capsLockUnActive();
      }
    } else if (event.target.textContent.length === 1) {
      const buttonValue = event.target.textContent;
      state.text += buttonValue;
    }
    textarea.value = state.text;
    textarea.focus();
  });

  document.addEventListener('keydown', (event) => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((button) => {
      if (button.dataset.keyCode === event.key) {
        button.classList.add('keyboard__button_active');
        textarea.focus();
      }
    });
  });
  document.addEventListener('keyup', (event) => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((button) => {
      if (button.dataset.keyCode === event.key) {
        button.classList.remove('keyboard__button_active');
        state.text = textarea.value;
      }
    });
  });

  document.addEventListener('keyup', (event) => {
    if (event.getModifierState('CapsLock')) {
      capsLockActive();
    } else {
      capsLockUnActive();
    }
  });
});
