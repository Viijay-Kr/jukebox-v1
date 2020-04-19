import React from "react";
import Header from "../Header";
import Footer, { ActiveIcon } from "../Footer";
interface Props {
  headerTitle: string;
  children: React.ReactElement;
  activeFooterIcon?: ActiveIcon;
}

export default function Page(props: Props) {
  return (
    <>
      <Header title={props.headerTitle} />
      {props.children}
      <Footer activeIcon={props.activeFooterIcon} />
    </>
  );
}
