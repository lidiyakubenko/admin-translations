import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { addKeyTranslation, addTranslation } from '../api';
import { addKeyTransl, updateTransl } from '../redux/actions';

const adaptColumns = (project) => {
  const { translations } = project;
  const keyColumn = [
    {
      title: 'Key',
      field: 'key',
      cellStyle: {
        fontWeight: 'bold',
        fontSize: '16px',
      },
      editable: 'onAdd',
    },
  ];
  const locales = Object.keys(translations);
  const localeColumns = locales.map((locale) => ({
    title: locale,
    field: locale,
  }));

  return [...keyColumn, ...localeColumns];
};

const adaptData = (project) => {
  const { translations } = project;
  const locales = Object.keys(translations);
  const keys = Object.keys(translations[locales[0]]);

  return keys.map((key) => {
    const sss = locales.reduce(
      (accum, locale) => ({
        ...accum,
        [locale]: translations[locale][key],
      }),
      {},
    );
    return { key, ...sss };
  });
};

const Translations = ({ project, updateTransl, addKeyTransl }) => {
  React.useEffect(() => {
    if (project.translations) {
      const columns = adaptColumns(project);
      const data = adaptData(project);
      setState({ columns, data });
    }
  }, [project]);

  const updateTranslation = ({ key, locale, translation }) =>
    addTranslation({
      _id: project._id,
      key,
      locale,
      translation,
    });

  const addNewRow = async ({ resolve, newData }) => {
    const { _id } = project;
    const { key, ...fields } = newData;
    const locales = Object.keys(fields);

    const result = await addKeyTranslation({ _id, key });

    if (result.data.code === 'success') {
      addKeyTransl({ key, _id });

      if (locales.length !== 0) {
        const oldData = locales.reduce(
          (accum, locale) => ({ ...accum, [locale]: '' }),
          {},
        );
        updateTranslations({ resolve, oldData, newData });
      }
    }
  };

  const updateTranslations = ({ resolve, oldData, newData }) => {
    const { key, ...fields } = newData;
    const locales = Object.keys(fields);

    const changedTranslations = [];

    locales.forEach((locale) => {
      const oldTransl = oldData[locale];
      const newTransl = newData[locale];

      if (oldTransl !== newTransl) {
        changedTranslations.push({
          key,
          locale,
          _id: project._id,
          translation: newTransl,
        });
      }
    });

    const promises = changedTranslations.map(updateTranslation);
    const results = Promise.all(promises);

    results.then((arr) => {
      resolve();
      arr.forEach(({ data }) => {
        const { locale } = data.data;
        const item = changedTranslations.find((obj) => obj.locale === locale);
        updateTransl(item);
      });
    });
  };

  const [state, setState] = React.useState({
    columns: [],
    data: [],
  });

  return (
    <MaterialTable
      title={project.name}
      columns={state.columns}
      data={state.data}
      options={{
        headerStyle: {
          backgroundColor: '#9966ff',
          color: '#FFF',
        },
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            addNewRow({ resolve, newData });
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            if (oldData) {
              updateTranslations({ resolve, oldData, newData });
            }
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTransl: (data) => {
    dispatch(updateTransl(data));
  },
  addKeyTransl: (data) => {
    dispatch(addKeyTransl(data));
  },
});

export default connect(() => ({}), mapDispatchToProps)(Translations);
