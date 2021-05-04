import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import * as hooks from '../../hooks';
import { BaseInput } from '../BaseInput';
import { Loader } from '../Loader';
import { List } from './List';
import * as S from './Select.styled';

export const Select = ({
  error,
  value,
  format,
  label,
  disabled,
  data,
  onSearchData,
  className,
  multiple,
  ...props
}) => {
  const [{ init, loadedData, isLoading }, setState] = hooks.useState({
    init: false,
    isLoading: false,
    loadedData: [],
  });
  const [showModal, setModal] = hooks.useState(false);

  const handleSearchData = async (text = '') => {
    setState(prev => ({ ...prev, isLoading: true }));

    const result = await onSearchData(text);

    setState({
      loadedData: result,
      isLoading: false,
      init: true,
    });
  };

  React.useEffect(() => {
    if (!disabled && !init && props.variant === 'dinamic') {
      return handleSearchData();
    }

    setState({
      loadedData: data,
      isLoading: false,
      init: true,
    });
  }, []);

  const getValue = () => {
    if (value && value[format.name]) return value[format.name];

    const label = value
      ? loadedData.find(
          item => item[format.id] === value[format.id] || item[format.name] === value[format.name]
        )
      : null;

    if (value && !value[format.id] && label) props.onChange(label);

    return label ? label[format.name] : false;
  };

  const getValueMultiple = () => {
    if (!R.is('array', value) && !value.length) return;

    let needUpdate = false;
    const realValue = value.map(item => {
      if (item && item[format.name]) return item;

      needUpdate = true;
      return loadedData.find(
        item => item[format.id] === value[format.id] || item[format.name] === value[format.name]
      );
    });

    if (needUpdate) props.onChange(realValue);

    const total = realValue.length;

    if (!total) false;

    return total === 1 ? `${total} item` : `${total} items`;
  };

  const labelValue = multiple ? getValueMultiple() : getValue();

  return (
    <>
      <BaseInput error={error} className={className}>
        <S.TouchableOpacity
          activeOpacity={1}
          onPress={() => setModal(!showModal)}
          disabled={disabled}>
          <S.Label float={!!labelValue}>{label}</S.Label>

          <S.Input hasError={!!error}>
            <S.Value>{labelValue}</S.Value>
          </S.Input>
        </S.TouchableOpacity>
      </BaseInput>

      <Loader show={isLoading} />

      {showModal && (
        <S.ModalSelect animationType="slide" transparent visible={showModal}>
          <List
            onClose={() => setModal(false)}
            format={format}
            handleSearchData={handleSearchData}
            {...props}
            value={value}
            staticData={data}
            loadedData={loadedData}
            multiple={multiple}
          />
        </S.ModalSelect>
      )}
    </>
  );
};

export const SelectModal = ({
  data,
  onChange,
  onSearchData,
  format,
  disabled,
  variant,
  children,
  value,
  multiple,
}) => {
  const [{ init, loadedData, isLoading }, setState] = hooks.useState({
    init: false,
    isLoading: false,
    loadedData: [],
  });
  const [showModal, setModal] = hooks.useState(false);

  const handleSearchData = async (text = '') => {
    setState(prev => ({ ...prev, isLoading: true }));

    const result = await onSearchData(text);

    setState({
      loadedData: result,
      isLoading: false,
      init: true,
    });
  };

  React.useEffect(() => {
    if (!disabled && !init && variant === 'dinamic') {
      return handleSearchData();
    }

    setState({
      loadedData: data,
      isLoading: false,
      init: true,
    });
  }, []);

  return (
    <>
      {children && (
        <S.TouchableOpacity
          activeOpacity={1}
          onPress={() => setModal(!showModal)}
          disabled={disabled}>
          {children}
        </S.TouchableOpacity>
      )}

      <Loader show={isLoading} />

      <S.ModalSelect animationType="slide" transparent visible={showModal}>
        <List
          onClose={() => setModal(false)}
          format={format}
          handleSearchData={handleSearchData}
          onChange={onChange}
          staticData={data}
          loadedData={loadedData}
          value={value}
          multiple={multiple}
          />
      </S.ModalSelect>
    </>
  );
};

Select.defaultProps = {
  onChange: () => {},
  format: { id: 'id', name: 'name' },
  variant: 'static',
  multiple: false,
};

Select.prototypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.object,
  data: PropTypes.array,
  variant: PropTypes.oneOf('static', 'dinamic'),
  onChange: PropTypes.func.isRequired,
  onSearchData: PropTypes.func,
  dinamicOnlyFirst: PropTypes.bool,
  multiple: PropTypes.bool,
};

SelectModal.defaultProps = {
  onChange: () => {},
  format: { id: 'id', name: 'name' },
  variant: 'static',
  multiple: false,
};

SelectModal.prototypes = {
  data: PropTypes.array,
  variant: PropTypes.oneOf('static', 'dinamic'),
  onChange: PropTypes.func.isRequired,
  onSearchData: PropTypes.func,
  dinamicOnlyFirst: PropTypes.bool,
  multiple: PropTypes.bool,
};
