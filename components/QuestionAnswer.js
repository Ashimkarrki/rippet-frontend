import React from "react";
import styles from "../styles/QuestionAnswer.module.css";
import { RiQuestionnaireFill, RiQuestionAnswerFill } from "react-icons/ri";
const QuestionAnswer = ({ qa }) => {
  return (
    <div className={styles.qa}>
      <h3>Questions About This Product ({qa.length})</h3>
      <div className={styles.ask_wrapper}>
        {qa.map(({ _id, Question, Answer }) => {
          return (
            <div key={_id}>
              <div className={styles.sentence}>
                <RiQuestionnaireFill
                  className={`${styles.icons} ${styles.question}`}
                />
                <p>{Question}</p>
              </div>
              {Answer && (
                <div className={styles.sentence}>
                  <RiQuestionAnswerFill
                    className={`${styles.icons} ${styles.answer}`}
                  />
                  <p>{Answer}</p>
                </div>
              )}
              {/* <div className={styles.st_line}></div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionAnswer;
