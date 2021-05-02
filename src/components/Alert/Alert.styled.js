import styled from 'styled-components';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.Modal`
  flex: 1;
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: transparent;
  padding-horizontal: ${({ theme }) => theme.spacing.unit * 3}px;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  background: ${({ theme }) => theme.palette.colors.white};
  width: ${({ theme }) => width - theme.spacing.unit * 8}px;
  border-radius: 10px;

  shadow-color: ${({ theme }) => theme.palette.colors.grey[900]};
  shadow-opacity: 1;
  shadow-radius: ${({ elevation }) => 0.8 * elevation};

  elevation: ${({ elevation }) => elevation};
`;

export const TitleContent = styled.View`
  border-bottom-color: ${({ theme }) => theme.palette.colors.grey[300]};
  border-bottom-width: 1px;

  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  overflow: hidden;
`;

export const Title = styled.Text`
  padding: ${({ theme }) => theme.spacing.unit * 2}px ${({ theme }) => theme.spacing.unit * 3}px;

  ${({ color, theme }) => (color ? `background: ${theme.palette[color].main}` : '')}
  ${({ color, theme }) => (color ? `color: ${theme.palette[color].text}` : '')};

  text-align: center;
  font-weight: bold;
`;

export const Message = styled.Text`
  padding: ${({ theme }) => theme.spacing.unit * 4}px ${({ theme }) => theme.spacing.unit * 3}px;

  text-align: center;
`;

export const Actions = styled.View`
  flex-direction: row;
  border-top-color: ${({ theme }) => theme.palette.colors.grey[300]};
  border-top-width: 1px;

  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
`;

export const Action = styled.TouchableOpacity`
  width: ${({ size }) => (100 / 12) * size}%;

  padding: ${({ theme }) => theme.spacing.unit * 2}px 0;

  border-color: ${({ theme }) => theme.palette.colors.grey[300]};
  border-width: 1;

  ${({ color, theme }) => (color ? `background: ${theme.palette[color].main}` : '')}
`;

export const ActionLabel = styled.Text`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;

  ${({ color, theme }) => (color ? `color: ${theme.palette[color].text}` : '')};
`;
