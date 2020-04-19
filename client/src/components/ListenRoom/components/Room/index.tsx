import React from "react";
import { TracksContext } from "../../../../contexts/TracksContext";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { room, roomVariables } from "../../../../generated/listenroom/room";
import { Container, Input } from "./Room.styled";
import { Form, Submit, Title } from "../../../Home/Home.styled";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../contexts/UserContext";
import { withRouter, RouteComponentProps } from "react-router-dom";
export const createRoomQuery = gql`
  mutation room($roomName: String!, $owner: ID!, $playlistID: String!) {
    createRoom(roomName: $roomName, owner: $owner, playlistID: $playlistID) {
      name
      playlistID
    }
  }
`;

interface Props {
  setActiveTabAndRoom: (room: string, tab: "listeners") => void;
}

function Room(props: Props & RouteComponentProps<{ id: string }>) {
  const tracksContext = React.useContext(TracksContext);
  const userContext = React.useContext(UserContext);
  const [createRoom, { data, error }] = useMutation<room, roomVariables>(
    createRoomQuery
  );
  const { handleSubmit, register } = useForm();
  if (!tracksContext || !userContext) {
    return null;
  }
  const {
    playlistMeta: { name },
  } = tracksContext;

  const onCreateRoom = (data: Record<string, any>) => {
    if (userContext.user && props.match.params.id) {
      createRoom({
        variables: {
          roomName: data.roomName,
          owner: userContext.user?.id,
          playlistID: props.match.params.id,
        },
      });
    }
  };
  return (
    <Container>
      {!data && (
        <Form onSubmit={handleSubmit(onCreateRoom)}>
          <Title>Create a Room</Title>
          <Input
            name="roomName"
            ref={register({ required: true })}
            type="text"
            defaultValue={name}
          ></Input>
          <Submit type="submit" value="Create"></Submit>
        </Form>
      )}

      {data && !error && (
        <>
          <Title>{data.createRoom.name}</Title>
          <Submit
            value="Request Listeners"
            onClick={() =>
              props.setActiveTabAndRoom(data.createRoom.name, "listeners")
            }
          ></Submit>
        </>
      )}
    </Container>
  );
}

export default withRouter(Room);
