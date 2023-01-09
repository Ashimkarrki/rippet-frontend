import styles from "../styles/PrevButton.module.css";
import { AiOutlineLeft } from "react-icons/ai";
const PrevButton = ({ className, style, onClick }) => {
  return (
    <button
      className={`${className} ${styles.icons}`}
      style={style}
      onClick={onClick}
    >
      <AiOutlineLeft />
    </button>
  );
};
export default PrevButton;
