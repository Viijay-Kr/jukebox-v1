import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Tabs, RoomTab, RequestsTab, ListenersTab } from "./ListenRoom.styled";
import Modal from "../Modal";
import ReactDOM from "react-dom";
import Room from "./components/Room";
import Listeners from "./components/Listeners";
import Requests from "./components/Requests/index";
import { useSubscription } from "@apollo/react-hooks";
import { listenRoom } from "./queries";
import {
  onListenerJoin,
  onListenerJoinVariables,
} from "../../generated/listenroom/onListenerJoin";
export type Tabs = "rooms" | "listeners" | "requests";

export function ListenRoom(props: RouteComponentProps) {
  const { history } = props;

  const isActive = history.location.search.includes("room");
  const room = new URLSearchParams(history.location.search).get("room") || "";
  const [activeTab, setActiveTab] = React.useState<Tabs>("rooms");
  const [activeRoom, setActiveRoom] = React.useState("");
  const { data } = useSubscription<onListenerJoin, onListenerJoinVariables>(
    listenRoom,
    { variables: { roomName: room } }
  );

  console.log(">> data", data);
  const setTabAndRoom = (room: string, tab: Tabs) => {
    setActiveRoom(room);
    setActiveTab(tab);
  };
  return ReactDOM.createPortal(
    <Modal active={isActive}>
      <>
        <Tabs>
          <ListenersTab
            onClick={() => setActiveTab("listeners")}
            className={activeTab === "listeners" ? "active" : ""}
          >
            Listeners
          </ListenersTab>
          <RequestsTab
            onClick={() => setActiveTab("requests")}
            className={activeTab === "requests" ? "active" : ""}
          >
            Requests
          </RequestsTab>
          <RoomTab
            onClick={() => setActiveTab("rooms")}
            className={activeTab === "rooms" ? "active" : ""}
          >
            Rooms
          </RoomTab>
        </Tabs>
        {activeTab === "rooms" && <Room setActiveTabAndRoom={setTabAndRoom} />}
        {activeTab === "listeners" && <Listeners activeRoom={activeRoom} />}
        {activeTab === "requests" && <Requests />}
      </>
    </Modal>,
    document.body
  );
}

export default withRouter(ListenRoom);
