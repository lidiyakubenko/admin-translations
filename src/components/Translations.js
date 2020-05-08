import React from 'react';
import MaterialTable from 'material-table';

const adaptColumns = (project) => {
  const keyColumn = [
    {
      title: 'Key',
      field: 'key',
      cellStyle: {
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
  ];
  const locales = Object.keys(project.translations);
  const localeColumns = locales.map((locale) => ({
    title: locale,
    field: locale,
  }));
  return [...keyColumn, ...localeColumns];
};

const adaptData = (project) => {
  const locales = Object.keys(project.translations);
  const keys = Object.keys(project.translations[locales[0]]);

  return keys.map((key) => {
    const sss = locales.reduce(
      (accum, locale) => ({
        ...accum,
        [locale]: project.translations[locale][key],
      }),
      {},
    );
    return { key: key, ...sss };
  });
};

const Translations = ({ project }) => {
  React.useEffect(() => {
    setState({ columns: adaptColumns(project), data: adaptData(project) });
  }, [project]);

  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Key',
        field: 'key',
        cellStyle: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      },
      { title: 'en', field: 'en' },
      { title: 'ru', field: 'ru' },
      { title: 'es', field: 'es' },
    ],
    data: [
      { key: 'title', en: 'hello world', ru: 'привет мир', es: 'hola mundo' },
      {
        key: 'subtitle',
        en: 'here is a cat party',
        ru: 'здесь кошачья туса',
        es: 'aquí hay una fiesta de gatos',
      },
    ],
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
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
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

export default Translations;
