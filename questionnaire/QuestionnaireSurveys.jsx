import React from "react";
import surveyService from "services/surveyService";
import { useEffect, useState } from "react";
import QuestionnaireSurveyDropdown from "./QuestionnaireSurveyDropdown";
import toastr from "toastr";

const QuestionnaireSurveys = () => {
  const [surveys, setSurveys] = useState();
  useEffect(() => {
    surveyService.getSurveyPaginated(0, 10000).then(onSuccess).catch(onError);
  }, []);

  const onSuccess = (e) => {
    setSurveys(e.item.pagedItems);
  };

  const onError = (err) => {
    toastr["error"](`${err}`);
  };

  return <QuestionnaireSurveyDropdown data={surveys} />;
};
export default QuestionnaireSurveys;
