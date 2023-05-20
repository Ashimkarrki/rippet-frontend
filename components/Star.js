import { AiFillStar } from "react-icons/ai";
import styles from "../styles/Star.module.css";
const Star = (children) => {
  console.log(children);
  return (
    <div>
      <AiFillStar
        className={
          children.num >= 1 ? children.className || styles.star : styles.no_star
        }
      />
      <AiFillStar
        className={
          children.num >= 2 ? children.className || styles.star : styles.no_star
        }
      />
      <AiFillStar
        className={
          children.num >= 3 ? children.className || styles.star : styles.no_star
        }
      />
      <AiFillStar
        className={
          children.num >= 4 ? children.className || styles.star : styles.no_star
        }
      />
      <AiFillStar
        className={
          children.num >= 5 ? children.className || styles.star : styles.no_star
        }
      />
    </div>
  );
};
export default Star;
