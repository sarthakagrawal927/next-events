import "../styles/globals.css";
import { NotificationContextProvider } from "../store/notifcation-context";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
