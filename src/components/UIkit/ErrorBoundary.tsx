import React from 'react';
import styled from 'styled-components';

type ErrorState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<{}, ErrorState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    console.log(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/WvEu0cO.png' />
          <ErrorImageText>このページはサクサク焼けています</ErrorImageText>
        </ErrorImageOverlay>
      );
    }
    return this.props.children;
  }
}

const ErrorImageOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type Image = {
  imageUrl: string;
};

const ErrorImageContainer = styled.div<Image>`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
`;

const ErrorImageText = styled.h2`
  font-size: 28px;
  color: #2f8e89;
`;

export { ErrorBoundary };
