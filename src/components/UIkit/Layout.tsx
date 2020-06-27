import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  wide?: boolean;
};

const Layout: FC<Props> = ({ children, wide }) => {
  return <LayoutWrap>{children}</LayoutWrap>;
};

const LayoutWrap = styled.main<Props>`
  margin: 100px auto;
  max-width: ${(p) => (p.wide ? '1200px' : '950px')};
  width: 100%;
`;
export { Layout };
