import React from 'react';
import PropTypes from 'prop-types';

import { BaseInput } from '../BaseInput';
import { Loader } from '../Loader';
import { List } from './List';

import * as S from './Select.styled';

export const Select = ({ error, value, format, label, disabled, data, onSearchData, ...props }) => {
  const [{ init, loadedData, isLoading }, setState] = React.useState({
    init: false,
    isLoading: false,
    loadedData: [],
  });
  const [showModal, setModal] = React.useState(false);

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

  const labelValue = getValue();

  return (
    <>
      <BaseInput error={error}>
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
            staticData={data}
            loadedData={loadedData}
          />
        </S.ModalSelect>
      )}
    </>
  );
};

Select.defaultProps = {
  onChange: () => {},
  format: { id: 'id', name: 'name' },
  variant: 'static',
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
};
