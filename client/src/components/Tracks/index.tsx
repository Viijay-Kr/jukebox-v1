import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TracksContextProvider from "../../contexts/TracksContext";
import TracksList from "./components/TracksList";
import { UserContext } from "../../contexts/UserContext";
import { useEffect } from "react";

export function Tracks(props: RouteComponentProps<{ id: string }>) {
  const { user } = React.useContext(UserContext);
  useEffect(() => {
    if (!user) {
      props.history.push(`/?from=/playlist/${params.id}`);
    }
  });
  const {
    match: { params },
  } = props;
  if (!user) return null;
  return (
    <TracksContextProvider id={params.id}>
      <TracksList></TracksList>
    </TracksContextProvider>
  );
}

export default withRouter(Tracks);
