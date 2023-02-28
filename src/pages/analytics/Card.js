import "./Card.css";

function Card(props) {
  // props.className has value analytics as you can see below which
  // <Card className="analytics">
  // if other component also use this card then its property will also get added at run time
  const classes = "card " + props.className;
  //retaining all the child components such as registrationFilter and registrationChart so its not get lost
  // we use props.children to retain children
  // the value of props.children will always be the content between opening and closing bracket of card
  return <div className={classes}>{props.children}</div>;
}

export default Card;
