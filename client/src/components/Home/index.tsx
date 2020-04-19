import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Page from "../Page";
import {
  Form,
  Email,
  Container,
  Name,
  Title,
  Separator,
  Submit,
} from "./Home.styled";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useEffect } from "react";
import PageLoader from "../PageLoader";
import { useForm } from "react-hook-form";
function Home(props: RouteComponentProps) {
  const { loginStarted, isLoggedIn, user } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.linkedAccounts?.length) {
        const search = new URLSearchParams(props.location.search);
        const from = search.get("from");
        if (from) {
          props.history.push(from);
        } else {
          props.history.push("/playlists");
        }
      } else {
        props.history.push("/linkAccount");
      }
    }
    // eslint-disable-next-line
  }, [isLoggedIn, user]);

  return (
    <Page headerTitle={"Jukebox"}>
      <>
        <PageLoader loading={loginStarted} />
        <Container>
          <LoginUser></LoginUser>
          <Separator>OR</Separator>
          <RegisterUser></RegisterUser>
        </Container>
      </>
    </Page>
  );
}

export function LoginUser() {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(UserContext);

  const onLogin = (data: Record<string, any>) => {
    loginUser(data.email);
  };
  return (
    <Form onSubmit={handleSubmit(onLogin)}>
      <Title>Login</Title>
      <Email
        name="email"
        ref={register({ required: true })}
        placeholder={"Email address"}
      ></Email>
      <Submit type="submit" value="Login" />
    </Form>
  );
}
export function RegisterUser() {
  const { register, handleSubmit } = useForm();
  const { registerUser } = useContext(UserContext);
  const onRegister = (data: Record<string, any>) => {
    registerUser(data.email, data.name);
  };
  return (
    <Form onSubmit={handleSubmit(onRegister)}>
      <Title>Register</Title>
      <Name
        name="name"
        ref={register({ required: true })}
        placeholder={"Name"}
      ></Name>
      <Email
        name="email"
        ref={register({ required: true })}
        placeholder={"Email address"}
      ></Email>
      <Submit type="submit" value="Register" />
    </Form>
  );
}
export default withRouter(Home);
