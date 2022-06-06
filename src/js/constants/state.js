const LANG = {
  RU: 'ru',
  EN: 'en',
};

const state = {
  lang: localStorage.getItem('language') || LANG.RU,
  capsLock: false,
};

const KEYBOARD = {
  tab: '  ',
  space: ' ',
  enter: '\n',
};

export { LANG, state, KEYBOARD };
