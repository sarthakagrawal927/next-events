import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../../store/notifcation-context";
import axios from "axios";

import CommentList from "../comment-list";
import NewComment from "../new-comment";
import classes from "./styles.module.css";

// function Comments(props) {
//   const { eventId } = props;
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState([]);
//   const notificationCtx = useContext(NotificationContext);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (showComments) {
//       setIsLoading(true);
//       notificationCtx.showNotification({
//         title: "Fetching comments",
//         message: "",
//         status: "pending",
//       });
//       axios
//         .get("/api/comments/" + eventId)
//         .then((res) => {
//           setComments(res.data.comments);
//           notificationCtx.showNotification({
//             title: "Success",
//             message: "Comments now visible",
//             status: "success",
//           });
//           setIsLoading(false);
//         })
//         .catch((e) => {
//           notificationCtx.showNotification({
//             title: "error",
//             message: e.message || "Something went wrong",
//             status: "error",
//           });
//         });
//     }
//   }, [showComments]);

//   function toggleCommentsHandler() {
//     setShowComments((prevStatus) => !prevStatus);
//   }

//   function addCommentHandler(commentData) {
//     setShowComments(false);

//     notificationCtx.showNotification({
//       title: "Sending comment",
//       message: "Your comment is being published",
//       status: "pending",
//     });

//     axios
//       .post("/api/comments/" + eventId, JSON.stringify(commentData), {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         notificationCtx.showNotification({
//           title: "Success",
//           message: "Successful",
//           status: "success",
//         });
//         setShowComments(true);
//       })
//       .catch((error) => {
//         notificationCtx.showNotification({
//           title: "error",
//           message: error.message || "Something went wrong",
//           status: "error",
//         });
//       });
//   }

//   return (
//     <section className={classes.comments}>
//       <button onClick={toggleCommentsHandler}>
//         {showComments ? "Hide" : "Show"} Comments
//       </button>
//       {<NewComment onAddComment={addCommentHandler} />}
//       {showComments && !isLoading && <CommentList items={comments} />}
//       {showComments && isLoading && <p>Loading..</p>}
//     </section>
//   );
// }

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
