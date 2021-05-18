import classes from "./styles.module.css";

function CommentList({ items }) {
  return (
    <ul className={classes.comments}>
      {items.map(({ text, name }, index) => {
        return (
          <li key={index}>
            {" "}
            <p>{text}</p>
            <div>
              By <address>{name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
