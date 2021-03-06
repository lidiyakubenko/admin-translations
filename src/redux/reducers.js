import t from '../redux/actionTypes';

const project = (state = {}, action) => {
  switch (action.type) {
    case t.SET_PROJECT:
      return { ...state, ...action.data, isSelected: true };
    case t.UPDATE_TRANSLATION: {
      const { translations } = state;
      const { key, locale, translation } = action;

      return {
        ...state,
        translations: {
          ...translations,
          [locale]: {
            ...translations[locale],
            [key]: translation,
          },
        },
      };
    }
    case t.ADD_KEY_TRANSLATION: {
      const { translations } = state;
      const { key } = action;
      const locales = Object.keys(translations);

      const newDate = locales.reduce(
        (accum, locale) => ({
          ...accum,
          [locale]: { ...translations[locale], [key]: '' },
        }),
        {},
      );

      return {
        ...state,
        translations: newDate,
      };
    }

    case t.DELETE_KEY_TRANSLATION: {
      const { translations } = state;
      const { key } = action;
      const locales = Object.keys(translations);

      const newDate = locales.reduce((accum, locale) => {
        const {
          [key]: {},
          ...rest
        } = translations[locale];

        return {
          ...accum,
          [locale]: rest,
        };
      }, {});

      return {
        ...state,
        translations: newDate,
      };
    }
    default:
      return state;
  }
};

const projects = (state = [], action) => {
  switch (action.type) {
    case t.ADD_NEW_PROJECT:
      return [
        ...state.map((item) => ({
          ...item,
          isSelected: false,
        })),
        { ...action.data, isSelected: true },
      ];

    case t.SET_PROJECT:
      return state.map((item) =>
        item._id === action.data._id
          ? project(item, action)
          : { ...item, isSelected: false },
      );
    case t.DELETE_PROJECT:
      return state.filter((item) => item._id !== action._id);
    case t.SET_PROJECTS:
      return [...state, ...action.data].map((item) => ({
        ...item,
        isSelected: false,
      }));
    case t.UPDATE_TRANSLATION:
      return state.map((item) =>
        item._id === action._id ? project(item, action) : item,
      );
    case t.ADD_KEY_TRANSLATION:
      return state.map((item) =>
        item._id === action._id ? project(item, action) : item,
      );
    case t.DELETE_KEY_TRANSLATION:
      return state.map((item) =>
        item._id === action._id ? project(item, action) : item,
      );
    default:
      return state;
  }
};

export default projects;
