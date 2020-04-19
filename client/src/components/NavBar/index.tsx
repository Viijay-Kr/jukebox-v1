import React from "react";
import styled from "styled-components";
import Drawer from "./components/Drawer";
import User from "./components/User";
import {
  useAnimatedContainerState,
  useOverLayState,
} from "./components/Drawer/hooks/useDrawerState";
const accountIcon = require("../../icons/user.svg");
const Container = styled("div")`
  display: flex;
  justify-content: flex-end;
`;

const UserIcon = styled("i")`
  width: 20px;
  height: 20px;
  background-color: white;
  mask-image: url(${accountIcon});
  mask-repeat: no-repeat;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

export default function NavBar() {
  const {
    animatedContainerState,
    setAnimatedContainerState,
  } = useAnimatedContainerState(false);
  const { overLayState, setOverLayState } = useOverLayState(false);

  const onUserIconClick = () => {
    setDrawerState(true);
  };
  const setDrawerState = (state: boolean) => {
    setAnimatedContainerState(state);
    setOverLayState(state);
  };
  const onNavigation = () => {
    setAnimatedContainerState(false);
  };

  return (
    <>
      <Container>
        <UserIcon onClick={onUserIconClick} />
      </Container>
      <Drawer
        animatedContainerState={animatedContainerState}
        overLayState={overLayState}
        setDrawerStateFromParent={setDrawerState}
      >
        <User navBarState={overLayState} onNavigation={onNavigation} />
      </Drawer>
    </>
  );
}
