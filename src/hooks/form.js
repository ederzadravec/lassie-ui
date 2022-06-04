import React from 'react';
import * as R from 'ramda';

import { useState } from './state';

export const useForm = (
  { initialValues, validations } = { initialValues: {}, validations: {} }
) => {
  const [{ values, errors, touched, triedSave }, setState] = useState({
    values: {},
    errors: {},
    touched: [],
    triedSave: false,
  });

  React.useEffect(() => {
    const data = initialValues || {};

    const newErrors = { ...validateData(data) };
    setState({ values: data, errors: newErrors });
  }, []);

  const validateData = (data = {}) => {
    return Object.keys(validations).reduce((acc, key) => {
      const validationList =
        typeof validations[key] === 'function'
          ? (validations[key])(data)
          : (validations[key] );

      const error = R.reduceWhile(
        (acc) => !acc,
        (acc, validation) => (validation[0](getValue(key, data), data) ? validation[1] : acc),
        null,
        validationList
      );

      return { ...acc, ...(error ? { [key]: error } : {}) };
    }, []);
  };

  const onChange = React.useCallback(
    (name, remove = []) => value => {
      const data = { [name]: value };

      setValues(data, remove);
    },
    [values]
  );

  const setValues = (data, remove = []) => {
    const newValues = { ...R.omit(remove, values), ...data };
    const newErrors = { ...validateData(newValues) };
    const newTouched = [...touched, ...Object.keys(data)];

    setState({
      values: newValues,
      errors: newErrors,
      touched: [...new Set(newTouched)],
    });
  };

  const setError = errors => {
    const newTouched = [...touched, ...Object.keys(errors)];
    setState({
      errors,
      touched: [...new Set(newTouched)],
    });
  };

  const getError = name => {
    return errors[name] && (touched.indexOf(name) !== -1 || triedSave) ? errors[name] : null;
  };

  const getValue = (name, data = values) => {
    return data[name] === undefined ? null : data[name];
  };

  const trySave = (callback = () => {}) => e => {
    e.preventDefault();
    e.stopPropagation();

    if (!R.isEmpty(errors) && !R.isNil(errors)) {
      setState({ triedSave: true });
      return false;
    }

    callback(e);
  };

  const clear = (data = {}) => {
    setState(() => ({
      values: data,
      errors: validateData(data),
      touched: [],
      triedSave: false,
    }));
  };

  const form = {
    hasErrors: !R.isEmpty(errors) && !R.isNil(errors),
    getValue,
    setError,
    getError,
    errors,
    values,
    touched,
    trySave,
    setValues,
    clear,
  };

  return [form, onChange];
};
