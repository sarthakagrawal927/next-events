import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../../store/notifcation-context";
import axios from "axios";

import CommentList from "../comment-list";
import NewComment from "../new-comment";
import classes from "./styles.module.css";

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const notificationCtx = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      notificationCtx.showNotification({
        title: "Fetching comments",
        message: "",
        status: "pending",
      });
      axios
        .get("/api/comments/" + eventId + "/", {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res.data.comments);
          setComments(res.data.comments);
          notificationCtx.showNotification({
            title: "Success",
            message: "Comments now visible",
            status: "success",
          });
          setIsLoading(false);
        })
        .catch((e) => {
          notificationCtx.showNotification({
            title: "error",
            message: e.message || "Something went wrong",
            status: "error",
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    setShowComments(false);

    notificationCtx.showNotification({
      title: "Sending comment",
      message: "Your comment is being published",
      status: "pending",
    });

    fetch("/api/comments/" + eventId + "/", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();

        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        console.log(data);
        notificationCtx.showNotification({
          title: "Success",
          message: "Successful",
          status: "success",
        });
        setShowComments(true);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "error",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {<NewComment onAddComment={addCommentHandler} />}
      {showComments && !isLoading && <CommentList items={comments} />}
      {showComments && isLoading && <p>Loading..</p>}
    </section>
  );
}

export default Comments;
