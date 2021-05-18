import { useRef, useContext } from "react";
import NotificationContext from "../../../store/notifcation-context";
import classes from "./styles.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificatioCtx = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();

    notificatioCtx.showNotification({
      title: "Signing up",
      message: "Registerting for newsletter",
      status: "pending",
    });

    fetch("/api/newsletter/", {
      method: "POST",
      body: JSON.stringify({ email: emailInputRef.current.value }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificatioCtx.showNotification({
          title: "Success",
          message: "Successful",
          status: "success",
        });
      })
      .catch((error) => {
        notificatioCtx.showNotification({
          title: "error",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
