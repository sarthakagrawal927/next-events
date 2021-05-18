import "../styles/globals.css";
import { NotificationContextProvider } from "../store/notifcation-context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      {" "}
      <Component {...pageProps} />;
    </NotificationContextProvider>
  );
}

export default MyApp;
