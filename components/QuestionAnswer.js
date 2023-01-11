import React, { useState } from "react";
import styles from "../styles/QuestionAnswer.module.css";
import { RiQuestionnaireFill, RiQuestionAnswerFill } from "react-icons/ri";
import axios from "axios"
const QuestionAnswer = ({ qa }) => {
  const [row, setRow] = useState(2);
  const [textArea, setTextArea] = useState("");
  // const URL = "http://localhost:4000/"

  // const asksubmitHandler = async(e)=>{
  //   e.preventDefault();
  //   const instance = await axios.create({
  //     withCredentials: true,
  //     headers: {authorization: "Bearer"}
  //   })
  //   instance.post(`${URL}api/v1/users/login`,userData ).then((data)=>{
  //     console.log(data)
  //     router.push('/');
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }

  return (
    <div className={styles.qa}>
      <h3 className={styles.reviewaskquestionheading}>Questions About This Product ({qa.length})</h3>
      <form className={styles.ask}>
        <textarea
          onClick={() => {
            setRow(6);
          }}
          className={styles.text_area}
          onChange={(e) => setTextArea(e.target.value)}
          cols="30"
          rows={row}
        ></textarea>
        <button className={styles.button_ask} onSubmit={() => {}}>
          Ask Question
        </button>
      </form>
      <div className={styles.ask_wrapper}>

        {
          (qa?.length) ?
          <>
          {
          qa.map(({ _id, Question, Answer }) => {
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
        })
          }
          </> : <div className={styles.noquesans}><p className={styles.noquesanstext}>No Question</p></div>
        }
      </div>
    </div>
  );
};

export default QuestionAnswer;
