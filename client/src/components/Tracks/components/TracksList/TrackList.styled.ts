import styled from "styled-components";

export const Header = styled.div<{ image?: string }>`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #000;
  height: calc(50vw);
  width: 50%;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;
export const Meta = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  width: max-content;
  display: flex;
  flex-direction: column;
  font-family: AvenirNext-DemiBold;
  color: rgba(255, 255, 255, 0.6);
`;
export const Name = styled.span`
  font-size: 26px;
  letter-spacing: 0;
  line-height: 30px;
`;
export const TracksCount = styled.span`
  font-size: 16px;
  margin-top: 10px;
  letter-spacing: 0;
  line-height: 20px;
`;

export const ActiveTrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  position: relative;
  top: 20px;
  span:nth-child(1) {
    font-size: 16px;
  }
  span {
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 5px;
  }
`;

export const FixedHeader = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  /* bottom: 0px; */
  display: flex;
  z-index: 10000;
  background: #000;
`;
export const Tracks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  top: 228px;
`;
