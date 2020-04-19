import styled from "styled-components";

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Helvetica;
  font-size: 17px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: -0.41px;
  text-align: center;
  height: 30px;
  padding: 10px 0px;
  cursor: pointer;
  .active {
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }
`;

export const RoomTab = styled.div`
  flex: 0 35%;
`;
export const ListenersTab = styled.div`
  flex: 0 35%;
`;
export const RequestsTab = styled.div`
  flex: 0 35%;
`;
