import { AiFillStar } from "react-icons/ai";
import styles from "../styles/Star.module.css";
const Star = ({ num }) => {
  return (
    <div>
      <AiFillStar className={num >= 1 ? styles.star : styles.no_star} />
      <AiFillStar className={num >= 2 ? styles.star : styles.no_star} />
      <AiFillStar className={num >= 3 ? styles.star : styles.no_star} />
      <AiFillStar className={num >= 4 ? styles.star : styles.no_star} />
      <AiFillStar className={num >= 5 ? styles.star : styles.no_star} />
    </div>
  );
};
export default Star;
