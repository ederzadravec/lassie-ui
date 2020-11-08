import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BaseInput, Text, Loader } from '../';
import { Select as SelectComponent } from './components';

const TouchableOpacity = styled.TouchableOpacity`
  position: relative;
  flex: 1;
`;

const Label = styled.Text`
  position: absolute;
  font-size: 12;

  color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.typography.text.color};

  ${({ float, theme }) =>
    float
      ? ''
      : `
    font-size: 14;
    z-index: 2;
    bottom: ${theme.spacing.unit};

  `};
`;

const Input = styled.View`
  height: ${({ theme }) => theme.spacing.unit * 4};
  margin-top: ${({ theme }) => theme.spacing.unit * 2};
  z-index: 1;
  border-bottom-width: 1;
  border-bottom-color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.palette.colors.grey[400]};

  justify-content: center;
`;

const Value = styled.Text`
  font-size: 14;
`;

const ModalSelect = styled.Modal``;

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
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModal(!showModal)}
          disabled={disabled}>
          <Label as={Text} float={!!labelValue}>
            {label}
          </Label>

          <Input hasError={!!error}>
            <Value as={Text}>{labelValue}</Value>
          </Input>
        </TouchableOpacity>
      </BaseInput>

      <Loader show={isLoading} />

      {showModal && (
        <ModalSelect visible={showModal}>
          <SelectComponent
            onClose={() => setModal(false)}
            format={format}
            handleSearchData={handleSearchData}
            {...props}
            staticData={data}
            loadedData={loadedData}
          />
        </ModalSelect>
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
