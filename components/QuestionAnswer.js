import React, { useState } from "react";
import styles from "../styles/QuestionAnswer.module.css";
import { RiQuestionnaireFill, RiQuestionAnswerFill } from "react-icons/ri";
import axios from "axios";
const QuestionAnswer = ({ qa, id, dataInfo, setDataInfo }) => {
  const [row, setRow] = useState(2);
  const [question, setQuestion] = useState("");

  const asksubmitHandler = async (e) => {
    e.preventDefault();
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    instance
      .post(`/ask/` + id, {
        Question: question,
      })
      .then((data) => {
        let temp = { ...dataInfo };
        temp.asks = data.data.data.remainingAsk;
        setDataInfo(temp);
        setQuestion("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.qa}>
      <h3 className={styles.reviewaskquestionheading}>
        Questions About This Product ({qa.length})
      </h3>
      <form className={styles.ask} onSubmit={asksubmitHandler}>
        <textarea
          onClick={() => {
            setRow(6);
          }}
          className={styles.text_area}
          value={question ? question : ""}
          onChange={(e) => setQuestion(e.target.value)}
          cols="30"
          rows={row}
        ></textarea>
        <button className={styles.button_ask} type="submit">
          Ask Question
        </button>
      </form>
      <div className={styles.ask_wrapper}>
        {qa?.length ? (
          <>
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
          </>
        ) : (
          <div className={styles.noquesans}>
            <p className={styles.noquesanstext}>No Question</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionAnswer;
