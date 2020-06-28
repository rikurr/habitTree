import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const ShowPassword = styled.span`
  text-align: right;
  cursor: pointer;
  display: block;
  :hover {
    opacity: 0.8;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
`;
