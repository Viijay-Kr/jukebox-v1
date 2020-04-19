import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {
  useAnimatedContainerState,
  useOverLayState,
} from "./hooks/useDrawerState";
const Overlay = styled("div")<{ active: boolean }>`
  position: fixed;
  width: ${(props) => (props.active ? "100%" : 0)};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  z-index: ${(props) => (props.active ? 8888 : -8888)};
  opacity: ${(props) => (props.active ? 1 : 0)};
`;

const AnimatedContainer = styled("div")<{ active: boolean }>`
  position: absolute;
  width: 60vw;
  height: 100%;
  background: rgba(60, 60, 60, 0.9);
  right: ${(props) => (props.active ? 0 : "-250px")};
  transition: right 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;

interface Props {
  overLayState: boolean;
  animatedContainerState: boolean;
  children: React.ReactElement;
  setDrawerStateFromParent: (state: boolean) => void;
}

export default function Drawer(props: Props) {
  const { children, setDrawerStateFromParent } = props;
  const {
    animatedContainerState,
    setAnimatedContainerState,
  } = useAnimatedContainerState(props.animatedContainerState);
  const { overLayState, setOverLayState } = useOverLayState(props.overLayState);

  const onTransitionEnd = () => {
    if (!animatedContainerState) {
      setOverLayState(false);
      setDrawerStateFromParent(false);
    }
  };
  return ReactDOM.createPortal(
    <Overlay
      onClick={() => setAnimatedContainerState(false)}
      active={overLayState}
    >
      <AnimatedContainer
        onTransitionEnd={onTransitionEnd}
        active={animatedContainerState}
      >
        {children}
      </AnimatedContainer>
    </Overlay>,
    document.body
  );
}
