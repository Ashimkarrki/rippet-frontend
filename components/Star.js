import { AiFillStar } from "react-icons/ai";
import styles from "../styles/Star.module.css";
const Star = (children) => {
  const star = children?.className?.split(" ")[0];
  const no_star = children?.className?.split(" ")[1];

  return (
    <div>
      <AiFillStar
        className={
          children.num >= 1 ? star || styles.star : no_star || styles.no_star
        }
      />
      <AiFillStar
        className={
          children.num >= 2 ? star || styles.star : no_star || styles.no_star
        }
      />
      <AiFillStar
        className={
          children.num >= 3 ? star || styles.star : no_star || styles.no_star
        }
      />
      <AiFillStar
        className={
          children.num >= 4 ? star || styles.star : no_star || styles.no_star
        }
      />
      <AiFillStar
        className={
          children.num >= 5 ? star || styles.star : no_star || styles.no_star
        }
      />
    </div>
  );
};
export default Star;
