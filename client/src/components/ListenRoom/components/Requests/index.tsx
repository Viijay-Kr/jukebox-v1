import React from "react";
import { withRouter } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { requestsQuery, joinRoomQuery } from "../../queries";
import {
  getRequests,
  getRequestsVariables,
} from "../../../../generated/listenroom/getRequests";
import {
  joinRoom,
  joinRoomVariables,
} from "../../../../generated/listenroom/joinRoom";
import { Container, OnlineUser, Request } from "../Listeners/index";
import { UserContext } from "../../../../contexts/UserContext";
import styled from "styled-components";

const Accept = styled(Request)``;
function Requests() {
  const userContext = React.useContext(UserContext);
  const [queryRequests, { data }] = useLazyQuery<
    getRequests,
    getRequestsVariables
  >(requestsQuery);

  const [acceptRequest, acceptData] = useMutation<joinRoom, joinRoomVariables>(
    joinRoomQuery
  );

  React.useEffect(() => {
    if (userContext && userContext.user) {
      queryRequests({ variables: { id: userContext.user.id } });
    }
  }, []);

  if (!data || !data.requests) {
    return null;
  }
  if (!userContext) {
    return null;
  }
  const onAccept = (roomName?: string) => {
    if (roomName && userContext?.user) {
      acceptRequest({
        variables: {
          roomName,
          userID: userContext?.user.id,
          username: userContext?.user.name,
        },
      });
    }
  };
  return (
    <Container>
      {data.requests.map((item) => (
        <OnlineUser>
          <span>{item?.senderName}</span>
          <Accept
            onClick={() => onAccept(item?.room.name)}
            type="submit"
            value="Accept"
          />
        </OnlineUser>
      ))}
    </Container>
  );
}

export default withRouter(Requests);
