import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/surveys/questions`;

const GetQuestionsBySurveyId = (surveyId) => {
    const config = {
      method: "GET",
      url: `${endpoint}/${surveyId}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }, 
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
  };

  const UpdateQuestionByQuestionId = (questionId, payload) => {
    const config = {
      method: "PUT",
      url: `${endpoint}/${questionId}`,
      date: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
  };

  const InsertNewQuestionAndAnswers = (payload) => {
    const config = {
      method: "POST",
      url: `${endpoint}`,
      date: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
  };

  const DeleteQuestionById = (questionId) => {
    const config = {
      method: "GET",
      url: `${endpoint}/${questionId}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
  };

  const deleteAnswerById = (answerId) => {
    const config = {
      method: "GET",
      url: `${endpoint}/${answerId}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
  };
  

  const surveyQuestionService = { GetQuestionsBySurveyId, UpdateQuestionByQuestionId, 
                                  InsertNewQuestionAndAnswers, DeleteQuestionById, 
                                  deleteAnswerById}

  export default surveyQuestionService