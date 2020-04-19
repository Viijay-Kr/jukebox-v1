import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { allUsers } from "../../../../generated/allUsers";
import {
  sendRequest,
  sendRequestVariables,
} from "../../../../generated/listenroom/sendRequest";
import { UserContext } from "../../../../contexts/UserContext";
import styled from "styled-components";
import { Submit } from "../../../Home/Home.styled";
import { requestToJoin } from "../../queries";
import { RouteComponentProps, withRouter } from "react-router-dom";
const onlineUsers = gql`
  query allUsers {
    users {
      isOnline
      id
      name
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OnlineUser = styled.div`
  font-family: AvenirNext-Bold;

  color: rgba(255, 255, 255, 0.7);
  letter-spacing: -0.41px;
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 35px;
  span {
    font-size: 18px;
  }
  align-items: center;
`;

export const Request = styled(Submit)`
  width: 30%;
  height: 40px;
  margin: 0;
`;
interface Props {
  activeRoom: string;
}
function Listeners(props: Props & RouteComponentProps<{ id: string }>) {
  const userContext = React.useContext(UserContext);
  const { data } = useQuery<allUsers>(onlineUsers);
  const [sendReq] = useMutation<sendRequest, sendRequestVariables>(
    requestToJoin
  );
  if (!data?.users.length) {
    return null;
  }
  if (!userContext) {
    return null;
  }
  const { user } = userContext;
  console.log(">> user", user?.id);
  const { users } = data;
  const onRequest = (receiverID: string) => {
    if (user) {
      sendReq({
        variables: {
          roomName: props.activeRoom,
          playlistID: props.match.params.id,
          senderID: user.id,
          receiverID,
          username: user.name,
        },
      });
    }
  };
  return (
    <Container>
      {users.map((item) =>
        item.id !== user?.id && item.isOnline ? (
          <OnlineUser>
            <span>{item.name}</span>
            <Request
              onClick={() => onRequest(item.id)}
              value="Request"
              type="submit"
            />
          </OnlineUser>
        ) : null
      )}
    </Container>
  );
}

export default withRouter(Listeners);
