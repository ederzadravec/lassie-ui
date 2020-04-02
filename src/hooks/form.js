import React from 'react';
import R from 'ramda';

export const useForm = (
  { initialValues, validations } = { initialValues: {}, validations: {} }
) => {
  const [{ values, errors, touched, triedSave }, useSetState] = React.useState({
    values: {},
    errors: {},
    touched: [],
    triedSave: false,
  });

  const setState = data =>
    useSetState(prev => ({
      ...prev,
      ...data,
      values: { ...prev.values, ...data.values },
      errors: data.errors || {},
      touched: [ ...prev.touched, ...(data.touched || [])],
    }));

  console.log('aqui', { values, errors, touched, triedSave });

  React.useEffect(() => {
    const data = initialValues || {};

    const newErrors = { ...validateData(data) };
    setState({ values: data, errors: newErrors });
  }, []);

  const validateData = (data = {}) => {
    return Object.keys(validations).reduce((acc, key) => {
      const error = R.reduceWhile(
        (acc, v) => !acc,
        (acc, v) => (v[0](getValue(key, data), data) ? v[1] : acc),
        null,
        validations[key]
      );

      return { ...acc, ...(error ? { [key]: error } : {}) };
    }, []);
  };

  const onChange = React.useCallback((name, remove = []) => value => {
    const data = { [name]: value };

    setValues(data, remove);
  }, [values]);

  const setValues = (data, remove = []) => {
    const newValues = { ...R.omit(remove, values), ...data };
    console.log({ values, newValues })
    const newErrors = { ...validateData(newValues) };
    const newTouched = [...touched, ...Object.keys(data)];

    setState({
      values: newValues,
      errors: newErrors,
      touched: [...new Set(newTouched)],
    });
  };

  const getError = name => {
    return errors[name] && (touched.indexOf(name) !== -1 || triedSave) ? errors[name] : null;
  };

  const getValue = (name, data = values) => {
    return data[name];
  };

  const trySave = (callback = () => {}) => e => {
    if (!R.isEmpty(errors) && !R.isNil(errors)) {
      setState({ triedSave: true });
      return false;
    }

    callback(e);
  };

  const form = {
    hasErrors: !R.isEmpty(errors) && !R.isNil(errors),
    getValue,
    setError: errors => setState({ errors }),
    getError,
    errors,
    values,
    touched,
    trySave,
    setValues,
  };

  return [form, onChange];
};
