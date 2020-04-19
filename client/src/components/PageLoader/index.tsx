import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
const Overlay = styled("div")`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  top: 0;
  left: 0;
`;

const LoadingSpinner = styled("div")`
  display: flex;
  position: absolute;
  bottom: 0;
  z-index: 2;
  left: 30vw;
  top: 70vw;
  margin: 0 auto;
  width: 9em;
  height: 9em;
  justify-content: center;
  align-items: flex-start;
  ${css`
    .loader,
    .loader:after {
      border-radius: 50%;
      width: 10em;
      height: 10em;
    }
    .loader {
      font-size: 10px;
      position: relative;
      text-indent: -9999em;
      border-top: 1.1em solid rgba(255, 255, 255, 0.2);
      border-right: 1.1em solid rgba(255, 255, 255, 0.2);
      border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
      border-left: 1.1em solid #ffffff;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation: load8 1.1s infinite linear;
      animation: load8 1.1s infinite linear;
    }
    @-webkit-keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  `}
`;

const LoadingIcon = styled("div")``;
interface Props {
  loading: boolean;
}

export default function Loader(props: Props) {
  const { loading } = props;
  if (!loading) {
    return null;
  }
  return ReactDOM.createPortal(
    <Overlay>
      <LoadingSpinner>
        <LoadingIcon className={"loader"}></LoadingIcon>
      </LoadingSpinner>
    </Overlay>,
    document.body
  );
}
