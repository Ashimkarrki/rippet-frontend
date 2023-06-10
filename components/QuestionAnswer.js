import React, { useState } from "react";
import styles from "../styles/QuestionAnswer.module.css";
import { RiQuestionnaireFill, RiQuestionAnswerFill } from "react-icons/ri";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { DotSpinner } from "@uiball/loaders";

const QuestionAnswer = ({ qa, id, dataInfo, setDataInfo, sellerId }) => {
  const { userInfo } = useContext(userContext);

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [row, setRow] = useState(2);
  const [question, setQuestion] = useState("");
  const asksubmitHandler = async (e) => {
    setIsSubmitLoading(true);
    e.preventDefault();
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    instance
      .post(`/ask/` + id, {
        Question: question,
        sellerId: sellerId,
      })
      .then((data) => {
        let temp = { ...dataInfo };
        temp.asks = data.data.data.remainingAsk;
        setDataInfo(temp);
        setQuestion("");
        setIsSubmitLoading(false);
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
      {userInfo.id && (
        <form className={styles.ask} onSubmit={asksubmitHandler}>
          <textarea
            onClick={() => {
              setRow(6);
            }}
            className={styles.text_area}
            value={question ? question : ""}
            onChange={(e) => setQuestion(e.target.value)}
            cols="30"
            required
            rows={row}
          ></textarea>
          {isSubmitLoading ? (
            <button
              className={`${styles.button_ask} ${styles.loading_spinner}`}
            >
              <DotSpinner color="white" size={18} />
            </button>
          ) : (
            <button className={styles.button_ask} type="submit">
              Ask Question
            </button>
          )}
        </form>
      )}
      <div className={styles.ask_wrapper}>
        {qa?.length ? (
          <>
            {qa.map(({ _id, id, Question, Answer }) => {
              return (
                <div key={_id} id={id}>
                  <div className={styles.sentence}>
                    <RiQuestionnaireFill
                      className={`${styles.icons} ${styles.question}`}
                    />
                    <div className={styles.no_answer_container}>
                      {Question}
                      {Answer ? (
                        ""
                      ) : (
                        <p className={styles.no_answer}> ( - No Answer Yet )</p>
                      )}
                    </div>
                  </div>
                  {Answer && (
                    <div className={styles.sentence}>
                      <RiQuestionAnswerFill
                        className={`${styles.icons} ${styles.answer}`}
                      />
                      <p>{Answer}</p>
                    </div>
                  )}
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
