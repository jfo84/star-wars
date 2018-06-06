import React from 'react';
import styled, { keyframes } from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  position: fixed;
`;

const spinnerKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-top: -30px;
    margin-left: -20px;
    border-radius: 50%;
    border: 3px solid #eee;
    border-top-color: #07d;
    animation: ${spinnerKeyframes} 0.8s linear infinite;
  }
`;

const SpinnerText = styled.span`
  margin-top: 52px;
  margin-left: 6px;
  color: #888;
`;

const WrappedContainer = styled.div`
  position: relative;
`;

const withSpinner = (Component, fetching, text = 'Loading...') => (
  (props) => (
    <WrappedContainer>
      <Component {...props} />
      {fetching
      ? <SpinnerContainer>
          <Spinner />
          <SpinnerText>{text}</SpinnerText>
        </SpinnerContainer>
      : (null)}
    </WrappedContainer>
  )
);

export default withSpinner;