import React from "react";
import styled from "styled-components";
import { UserContext } from "../../../../contexts/UserContext";
import { withRouter, RouteComponentProps } from "react-router-dom";
const avatarIcon = require("../../../../icons/avatar.svg");

const Text = styled.div`
  font-family: AvenirNext-Regular;
  font-size: 19px;
  color: #ffffff;
  letter-spacing: 0.42px;
  margin-bottom: 15px;
`;
const UserNav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;
const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Avatar = styled.i`
  mask-image: url(${avatarIcon});
  mask-repeat: no-repeat;
  background-color: #fff;
  width: 55px;
  height: 55px;
`;
const Name = styled.div`
  font-family: AvenirNext-Bold;
  font-size: 21px;
  color: #ffffff;
  letter-spacing: 0.6px;
  line-height: 41px;
  margin: 0px 20px;
`;
interface Props {
  onNavigation: () => void;
  navBarState: boolean;
}
function User(props: Props & RouteComponentProps) {
  const { onNavigation, history } = props;
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const [pathToPush, setPathToPush] = React.useState("");

  React.useEffect(() => {
    if (pathToPush && !props.navBarState) {
      history.push(pathToPush);
    }
  }, [history, pathToPush, props.navBarState]);

  const onLinkClick = (context: string) => {
    switch (context) {
      case "account": {
        setPathToPush("/linkAccount");
        break;
      }
      case "playlists": {
        setPathToPush("/playlists");
        break;
      }
      default:
        break;
    }
    onNavigation();
  };
  return (
    <>
      <UserNav>
        <AvatarContainer>
          <Name>{user?.name}</Name>
          <Avatar />
        </AvatarContainer>
        <LinksContainer>
          <Text onClick={() => onLinkClick("playlists")}>Playlists</Text>
          <Text onClick={() => onLinkClick("account")}>Link Accounts</Text>
          <Text onClick={() => onLinkClick("profile")}>Profile</Text>
          <Text onClick={() => onLinkClick("share")}>Share</Text>
        </LinksContainer>
      </UserNav>
    </>
  );
}

export default withRouter(User);
