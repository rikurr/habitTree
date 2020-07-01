import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  wide?: boolean;
};

const Layout: FC<Props> = ({ children, wide }) => {
  return <LayoutWrap wide={wide}>{children}</LayoutWrap>;
};

const LayoutWrap = styled.main<Props>`
  margin: 100px auto;
  max-width: ${(p) => (p.wide ? '1900px' : '960px')};
  width: 90%;
  @media (min-width: 768px) {
    width: 100%;
  }
`;
export { Layout };
