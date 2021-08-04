import React from "react";

import * as S from "./Phone.styled";

const Component: React.FC = ({ children }) => {
  return (
    <S.Container>
      <S.Notch>
        <S.NotchContent></S.NotchContent>
      </S.Notch>

      <S.Content>{children}</S.Content>

      <S.Bottom>
        <S.BottomContent></S.BottomContent>
      </S.Bottom>
    </S.Container>
  );
};

export default Component;
