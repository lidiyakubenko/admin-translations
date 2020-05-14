import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import {
  addKeyTranslation,
  addTranslation,
  deleteKeyTranslation,
} from '../api';
import { addKeyTransl, deleteKeyTransl, updateTransl } from '../redux/actions';

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

const Translations = ({
  project,
  updateTransl,
  addKeyTransl,
  deleteKeyTransl,
}) => {
  const [state, setState] = React.useState({
    columns: [],
    data: [],
  });

  React.useEffect(() => {
    if (project.translations) {
      const columns = adaptColumns(project);
      const data = adaptData(project);
      setState({ columns, data });
    }
  }, [project]);

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
        updateRows({ resolve, oldData, newData });
      }
    }
  };

  const updateTranslation = ({ key, locale, translation }) =>
    addTranslation({
      _id: project._id,
      key,
      locale,
      translation,
    });

  const updateRows = ({ resolve, oldData, newData }) => {
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

  const deleteRow = async ({ resolve, oldData }) => {
    const { _id } = project;
    const { key } = oldData;

    const result = await deleteKeyTranslation({ _id, key });
    resolve();

    if (result.data.code === 'success') {
      deleteKeyTransl({ key, _id });
    }
  };

  return (
    <MaterialTable
      title={project.name}
      columns={state.columns}
      data={state.data}
      options={{
        pageSize: 10,
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
              updateRows({ resolve, oldData, newData });
            }
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            deleteRow({ resolve, oldData });
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
  deleteKeyTransl: (data) => {
    dispatch(deleteKeyTransl(data));
  },
});

export default connect(() => ({}), mapDispatchToProps)(Translations);
