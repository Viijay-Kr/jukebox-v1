import styled from "styled-components";

const Tile = styled("div")<{ no: number }>`
  font-family: AvenirNext-DemiBold;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 30px;
  font-family: AvenirNext-DemiBold;
  letter-spacing: 0.5px;
  line-height: 14px;
  border-radius: 5px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(60, 60, 60, 0.9);
  margin: 4.6px;
  flex: 0 200px;
  &:hover {
    transform: scale3d(1.1, 1.1, 1.5);
    border: 1px solid rgba(70, 70, 80, 0.8);
    border-radius: 2px;
    cursor: pointer;
    transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
    .hidden {
      visibility: visible;
    }
    .tile-image {
      opacity: 0.3;
      transition: opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`;

export const Title = styled("div")`
  font-family: AvenirNext-DemiBold;
  color: rgba(255, 255, 255, 0.8);
  line-height: 14px;
  font-size: 22px;
  visibility: hidden;
  position: absolute;
`;

export default Tile;
