import { state, KEYBOARD } from '../constants/state';

const handlers = {

  capsLockHandler: (capsLock, buttons) => {
    state.capsLock = !state.capsLock;
    capsLock.classList.toggle('keyboard__button_active');
    buttons.forEach((button) => {
      const currentButtons = button;
      if (button.textContent.match(/^[a-zА-Яё]$/i)) {
        currentButtons.textContent = state.capsLock
          ? button.textContent.toUpperCase()
          : button.textContent.toLowerCase();
        currentButtons.dataset.keyCode = currentButtons.textContent;
      }
    });
  },

  shiftHandlerUp: (buttons) => {
    buttons.forEach((button) => {
      const currentButtons = button;
      if (button.textContent.match(/^[a-zА-Яё]$/i)) {
        currentButtons.textContent = button.textContent.toUpperCase();
      }
    });
  },

  shiftHandlerDown: (buttons) => {
    buttons.forEach((button) => {
      const currentButtons = button;
      if (button.textContent.match(/^[a-zА-Яё]$/i)) {
        currentButtons.textContent = button.textContent.toLowerCase();
      }
    });
  },

  backspaceHandler: (textarea) => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt - 1)
                     + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 1, cursorAt - 1);
  },

  tabHandler: (textarea) => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + KEYBOARD.tab + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 2, cursorAt + 2);
  },

  spaceHandler: (textarea) => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + KEYBOARD.space
                     + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 1, cursorAt + 1);
  },

  enterHandler: (textarea) => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + KEYBOARD.enter
                     + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 1, cursorAt + 1);
  },

  deleteHandler: (textarea) => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + textarea.value.slice(cursorAt + 1);
    textarea.setSelectionRange(cursorAt + 1, cursorAt);
  },

  buttonKeyOutput: (buttonValue, textarea) => {
    const cursorAt = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorAt)
                     + buttonValue
                     + textarea.value.slice(cursorAt);
    textarea.setSelectionRange(cursorAt + 1, cursorAt + 1);
  },
};

export default handlers;
