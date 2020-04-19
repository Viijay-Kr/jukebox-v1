import React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PageLoader from "../PageLoader";
import {
  useLinkAccountMutation,
  useTokenHandShakeMutation,
} from "./hooks/useLinkedAccounts";
import { UserContext } from "../../contexts/UserContext";
import Page from "../Page";
import { Accounts } from "../../generated/globalTypes";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60vw 0px;
`;

const Button = styled("button")`
  font-family: AvenirNext-DemiBold;
  background: #ffce4e;
  border-radius: 9px;
  border-radius: 9px;
  margin: 30px 0px;
  width: 75%;
  height: 50px;
  font-size: 24px;
  outline: none;
`;

const Text = styled("div")`
  font-family: AvenirNext-DemiBold;
  font-size: 26px;
  color: #fff;
  letter-spacing: 0;
  line-height: 30px;
`;

export const LinkAccount = (props: RouteComponentProps) => {
  const [loadingState, setLoadingState] = React.useState(false);

  const { location, history } = props;
  useTokenHandShakeMutation(location, setLoadingState, history);

  return (
    <Page headerTitle={"Link Account"}>
      <UserContext.Consumer>
        {() => (
          <>
            <PageLoader loading={loadingState} />
            <Container>
              <SpotifyButton></SpotifyButton>
              <Text>OR</Text>
              <Button>Apple</Button>
            </Container>
          </>
        )}
      </UserContext.Consumer>
    </Page>
  );
};

export default withRouter(LinkAccount);

interface IProps {}
function SpotifyButton(props: IProps) {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  let spotifyDisable = false;
  const { linkAccounts } = useLinkAccountMutation();

  if (user?.linkedAccounts) {
    if (Array.isArray(user?.linkedAccounts)) {
      spotifyDisable = user?.linkedAccounts.some(
        ({ account }) => account === "SPOTIFY"
      );
    }
  }
  if (!user) {
    return null;
  }
  return (
    <Button
      disabled={spotifyDisable}
      onClick={() => {
        linkAccounts({
          variables: { id: user?.id, account: Accounts.SPOTIFY },
        });
      }}
    >
      SPOTIFY
    </Button>
  );
}
