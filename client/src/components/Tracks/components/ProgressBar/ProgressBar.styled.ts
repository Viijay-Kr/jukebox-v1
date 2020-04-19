import styled from "styled-components";

export const Container = styled.div`
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 200px;
  top: 7px;
  position: relative;
`;

export const Indicator = styled.i`
  width: 0px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  position: absolute;
  top: 0px;
  left: 0px;
`;

export const Knob = styled.i`
  height: 4px;
  width: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  display: block;
  position: absolute;
  top: -2px;
`;
