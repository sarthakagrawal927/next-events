import { Fragment } from "react";
import Head from "next/head";

import MainHeader from "./main-header";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <Head>
        <title>{props.title}</title>
        <meta name='description' content='find latest events' />
      </Head>{" "}
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
