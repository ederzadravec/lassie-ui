import React from 'react';
import R from 'ramda';

import { Text } from '../Text';
import {
  Container,
  SafeAreaView,
  Content,
  TitleContent,
  Title,
  Message,
  Actions,
  Action,
  ActionLabel,
} from './Alert.styled';

let open = () => {};

let close = () => {};

const defaultAction = [{ label: 'OK' }];

const AlertComponent = ({ elevation }) => {
  const [{ current, alerts }, setAlerts] = React.useState({ current: 0, alerts: [] });

  open = ({ title, message, actions, color }) => {
    setAlerts(prev => {
      const newAlerts = [
        ...prev.alerts,
        { title, message, color, actions: actions || defaultAction },
      ];
      return { current: newAlerts.length - 1, alerts: newAlerts };
    });
  };

  close = () => {
    setAlerts(prev => {
      const newAlerts = R.dropLast(1, alerts);
      return { current: newAlerts.length - 1, alerts: newAlerts };
    });
  };

  const handleAction = action => async () => {
    if (!action) return close();

    await action();
    close();
  };

  const alert = alerts.length > 0 ? alerts[current] : false;

  return (
    <Container transparent animationType="fade" visible={!!alert}>
      <SafeAreaView>
        <Content elevation={elevation} style={{ shadowOffset: { height: 0.5 * elevation } }}>
          {alert?.title && (
            <TitleContent>
              <Title color={alert.color} as={Text}>
                {alert.title}
              </Title>
            </TitleContent>
          )}

          {alert?.message && <Message as={Text}>{alert?.message}</Message>}

          <Actions>
            {(alert?.actions || []).map(({ label, action, color }) => (
              <Action
                key={label}
                color={color}
                size={12 / alert?.actions.length}
                onPress={handleAction(action)}>
                <ActionLabel as={Text} color={color}>
                  {label}
                </ActionLabel>
              </Action>
            ))}
          </Actions>
        </Content>
      </SafeAreaView>
    </Container>
  );
};

AlertComponent.defaultProps = {
  elevation: 8,
};

export const Alert = {
  Component: AlertComponent,
  open: (...props) => open(...props),
  close: (...props) => close(...props),
};
