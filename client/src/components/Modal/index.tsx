import React from "react";
import styled from "styled-components";

interface Props {
  active: boolean;
  children: React.ReactElement;
}

const OverLay = styled.div<{ active: boolean }>`
  position: fixed;
  width: ${(props) => (props.active ? "100%" : 0)};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  z-index: ${(props) => (props.active ? 88888 : -8888)};
  opacity: ${(props) => (props.active ? 1 : 0)};
`;

const Body = styled.div`
  background: rgba(60, 60, 60, 0.9);
  position: absolute;
  height: 70%;
  width: 90%;
  top: 20%;
  left: 5%;
`;
export default function Modal(props: Props) {
  return (
    <OverLay active={props.active}>
      <Body>{props.children}</Body>
    </OverLay>
  );
}
