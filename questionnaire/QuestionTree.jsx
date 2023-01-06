import React, { useState, useEffect } from "react";
import Capture from "./Capture";
import VisaDropDown from "./VisaDropdown";
import PropTypes from "prop-types";
import "./questionnairestyles.css";
import logo from "../../assets/images/migrately/migrately-logo-large.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserChatSys from "components/chathub/UserChat/UserChatSys";

const QuestionTree = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
  });
  const [userInput, setUserInput] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmitClicked = () => {
    Swal.fire({
      title: "Success!",
      text: "Your submission was successful.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(navigate("/"));
  };

  const handleResponse = (answer) => {
    setPreviousQuestions([...previousQuestions, currentQuestion]);
    setCurrentQuestion(answer.nextQuestionId);
    setUserInput([...userInput, answer.text]);
  };

  const handleBack = () => {
    if (previousQuestions.length > 0) {
      setCurrentQuestion(previousQuestions[previousQuestions.length - 1]);
      setPreviousQuestions(previousQuestions.slice(0, -1));
      setUserInput(userInput.slice(0, -1));
    }
  };
  const handleReset = () => {
    if (previousQuestions.length > 0) {
      if (isCompleted === true) {
        setCurrentQuestion(id);
      } else {
        setCurrentQuestion();
      }
      setPreviousQuestions([]);
      setUserInput([]);
      setUserInfo({
        email: "",
        firstName: "",
        lastName: "",
        country: "",
      });
    }
  };

  const {
    id,
    question,
    surveyQuestionAnswers,
    maxSortOrder = Math.max(...props.surveyData.map((q) => q.sortOrder)),
  } = props.surveyData.find((q) => q.id === currentQuestion) ||
  props.surveyData.sort((a, b) => a.sortOrder - b.sortOrder)[0];

  useEffect(() => {
    setCurrentQuestion(id);
  }, [id]);

  useEffect(() => {
    if (userInput.length === maxSortOrder) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [userInput]);

  const mapPreviousQuestions = (questionId, idx) => {
    const question = props.surveyData.find((q) => q.id === questionId);

    const answer = question.surveyQuestionAnswers.find(
      (a) => a.text === userInput[idx]
    );
    if (answer.answerRequirementId === 2) {
      return null;
    }
    if (answer.answerRequirementId === 3) {
      return (
        <div key={`previousQuestions ${idx}`}>
          <p>Visa Type: {userInput[idx]}</p>
        </div>
      );
    }

    return (
      <div key={`previousQuestions ${idx}`}>
        <p>
          <h4 className="questionnaire_text_color_white">
            {question.question}
          </h4>
          Answer: {userInput[idx]}
        </p>
      </div>
    );
  };

  const mapAnswers = (answer, idx) => {
    if (answer.answerRequirementId === 2) {
      return (
        <div key={`capture ${idx}`}>
          <Capture
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            handleResponse={handleResponse}
            answer={answer}
          />
        </div>
      );
    }
    if (answer.answerRequirementId === 3) {
      return (
        <div key={`visaDropDown ${idx}`}>
          <VisaDropDown
            userInput={userInput}
            setUserInput={setUserInput}
            handleResponse={handleResponse}
            answer={answer}
          />
        </div>
      );
    } else {
      return (
        <div key={`buttonContainer ${idx}`} className="row col-12">
          <button
            className="questionnaire_button"
            key={`button ${idx}`}
            onClick={() => handleResponse(answer)}
          >
            {answer.text}
          </button>
        </div>
      );
    }
  };

  return (
    <div className="background_1">
      <UserChatSys />
      <img className="center" src={logo} alt={logo} />
      <div className="container">
        <div className="d-flex justify-content-center">
          <button className="questionnaire_button" onClick={handleBack}>
            Back
          </button>
          <button className="questionnaire_button" onClick={handleReset}>
            Reset
          </button>
        </div>
        {isCompleted ? (
          <div>
            <p className="row question_banner justify-content-center m-5">
              Does everything look correct?
            </p>
            <div>
              <div className="row">
                <div className="col-5 questionnaire_response">
                  <h3 className="questionnaire_text_color_white">
                    Question Responses
                  </h3>
                  {previousQuestions.map(mapPreviousQuestions)}
                </div>
                <div className="col-2" />
                <div className="col-5 questionnaire_response">
                  <h2 className="questionnaire_text_color_white">
                    User Information
                  </h2>
                  <div>
                    <h4 className="questionnaire_text_color_white">Email:</h4>{" "}
                    <p>{userInfo.email}</p>
                  </div>
                  <div>
                    <h4 className="questionnaire_text_color_white">
                      First Name:
                    </h4>
                    <p>{userInfo.firstName}</p>
                  </div>
                  <div>
                    <h4 className="questionnaire_text_color_white">
                      Last Name:
                    </h4>
                    <p>{userInfo.lastName}</p>
                  </div>
                  <div>
                    <h4 className="questionnaire_text_color_white">
                      Country Of Origin:
                    </h4>
                    <p>{userInfo.country}</p>
                  </div>
                </div>
              </div>
            </div>
            {isCompleted ? (
              <div className="d-flex justify-content-center m-5">
                <button
                  className="questionnaire_button"
                  onClick={handleSubmitClicked}
                >
                  Submit
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <p className="row question_banner d-flex justify-content-center m-10">
              {question}
            </p>
            <div className="d-flex justify-content-center">
              <div>{surveyQuestionAnswers.map(mapAnswers)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

QuestionTree.propTypes = {
  surveyData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      helpText: PropTypes.string.isRequired,
      surveyId: PropTypes.number.isRequired,
      statusId: PropTypes.number.isRequired,
      sortOrder: PropTypes.number.isRequired,
      dateCreated: PropTypes.string.isRequired,
      dateModified: PropTypes.string.isRequired,
      surveyQuestionAnswers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          questionId: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
          nextQuestionId: PropTypes.number.isRequired,
          additionalInfo: PropTypes.string.isRequired,
          answerRequirementId: PropTypes.number.isRequired,
          answerRequirementName: PropTypes.string.isRequired,
          answerRequirementDescription: PropTypes.string.isRequired,
          dateCreated: PropTypes.string.isRequired,
          dateModified: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default QuestionTree;
