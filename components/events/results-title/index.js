import Button from "../../ui/button";
import classes from "./results-title.module.css";

function ResultsTitle({ humanReadableDate }) {
  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link='/events'>Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
