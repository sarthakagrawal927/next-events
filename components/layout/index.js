import { Fragment, useContext } from "react";
import Head from "next/head";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notifcation-context";

import MainHeader from "./main-header";

function Layout(props) {
  const notifcationCtx = useContext(NotificationContext);
  const activeNotification = notifcationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <Head>
        <title>{props.title}</title>
        <meta name='description' content='find latest events' />
      </Head>{" "}
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
