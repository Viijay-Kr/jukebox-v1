import styled from "styled-components";
import NavBar from "../NavBar";
import React from "react";
interface Props {
  title: string;
}

const Container = styled("div")`
  background: rgba(60, 60, 60, 0.9);
  padding: 10px 0px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
`;
const Title = styled("div")`
  font-family: AvenirNext-Bold;
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 0.6px;
  line-height: 41px;
  margin: 0px 20px;
`;

export default function Header(props: Props) {
  return (
    <Container>
      <NavBar />
      <Title>{props.title}</Title>
    </Container>
  );
}
