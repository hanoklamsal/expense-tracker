import styles from "./Card.module.css";

const Card = (props) => {
  const buttonClass = `${styles[props.type + "Btn"]} ${styles.button}`;
  console.log(`${props.type}Btn`);
  return (
    <div className={styles.cardWrapper}>
      <p>
        <span>{props.titleText}</span>
        <span>{props.amount}</span>
      </p>
      <button className={buttonClass} onClick={props.onClick}>
        {props.btnText}
      </button>
    </div>
  );
};

export default Card;
