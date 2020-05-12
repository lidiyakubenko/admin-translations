import t from './actionTypes';

const updateTransl = ({ key, locale, translation, _id }) => ({
  type: t.UPDATE_TRANSLATION,
  _id,
  key,
  locale,
  translation,
});

export { updateTransl };
