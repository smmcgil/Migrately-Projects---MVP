import React, { useState, useEffect } from "react";
import QuestionTree from "./QuestionTree";
import surveyQuestionService from "services/SurveyQuestionService";
import toastr from "toastr";
import { useParams } from "react-router-dom";

const QuestionnaireConnectionHub = () => {
  const { surveyId } = useParams();
  const [currentSurveyId, setCurrentSurveyId] = useState(parseInt(surveyId));
  const [surveyData, setSurveyData] = useState([
    {
      id: 0,
      question: "",
      helpText: "",
      surveyId: 0,
      statusId: 0,
      sortOrder: 1,
      dateCreated: "",
      dateModified: "",
      surveyQuestionAnswers: [],
    },
  ]);

  const importSurvey = () => {
    surveyQuestionService
      .GetQuestionsBySurveyId(currentSurveyId)
      .then(onSuccess)
      .catch(onError);
  };

  const onSuccess = (e) => {
    setSurveyData(e.items);
  };

  const onError = (err) => {
    toastr["error"](`${err}`);
  };

  useEffect(importSurvey, [currentSurveyId]);

  return (
    <QuestionTree
      surveyId={surveyId}
      setSurveyId={setCurrentSurveyId}
      surveyData={surveyData}
      setSurveyData={setSurveyData}
    />
  );
};

export default QuestionnaireConnectionHub;
