import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import "./questionnairestyles.css";
import logo from "../../assets/images/migrately/migrately-logo-large.png";
import UserChatSys from "components/chathub/UserChat/UserChatSys";

const QuestionnaireSurveyDropdown = ({ data }) => {
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if (data && search === "?type=immigrantvisa") {
      setSortedData(
        data
          .filter((survey) => survey.immigrantVisa)
          .sort((a, b) => a.surveyType.name.localeCompare(b.surveyType.name))
      );
    } else if (data && search === "?type=nonimmigrantvisa") {
      setSortedData(
        data
          .filter((survey) => survey.nonImmigrantVisa)
          .sort((a, b) => a.surveyType.name.localeCompare(b.surveyType.name))
      );
    } else if (data && search === "?type=all") {
      setSortedData(
        data.sort((a, b) => a.surveyType.name.localeCompare(b.surveyType.name))
      );
    } else if (data) {
      navigate("/");
    }
  }, [data]);

  const dataBySurveyType = {};
  sortedData.forEach((survey) => {
    const surveyType = survey.surveyType.name;
    if (!dataBySurveyType[surveyType]) {
      dataBySurveyType[surveyType] = [];
    }
    dataBySurveyType[surveyType].push(survey);
  });

  const mapDropdownItems = (dataBySurveyType) => {
    dataBySurveyType.sort((a, b) => a.name.localeCompare(b.name));
    return dataBySurveyType.map((survey) => (
      <Dropdown.Item as="div" key={survey.id}>
        <Link
          to={{
            pathname: `/questionnaires/${survey.id}`,
          }}
        >
          <div>{survey.name}</div>
        </Link>
      </Dropdown.Item>
    ));
  };

  const mapDropdown = (surveyType) => {
    return (
      <div key={surveyType}>
        <Dropdown>
          <Dropdown.Toggle variant="primary" className="questionnaire_button">
            {surveyType}
          </Dropdown.Toggle>
          <Dropdown.Menu className="questionnaire_dropdown">
            {mapDropdownItems(dataBySurveyType[surveyType])}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <div className="background_1">
      <UserChatSys />
      <img className="center" src={logo} alt={logo} />
      <div className="d-flex justify-content-center align-items-center">
        <div>{Object.keys(dataBySurveyType).map(mapDropdown)}</div>
      </div>
    </div>
  );
};

QuestionnaireSurveyDropdown.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      statusId: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      surveyType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      requirements: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      immigrantVisa: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          code: PropTypes.string,
          description: PropTypes.string,
          isRelativeSponsored: PropTypes.bool,
          isEmployerSponsored: PropTypes.bool,
        })
      ),
      nonImmigrantVisa: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          code: PropTypes.string,
          description: PropTypes.string,
          isRelativeSponsored: PropTypes.bool,
          isEmployerSponsored: PropTypes.bool,
        })
      ),
      createBy: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        middleInitial: PropTypes.string,
        lastName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        email: PropTypes.string.isRequired,
        status: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
      }),
      role: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
      dateCreated: PropTypes.string.isRequired,
      dateModified: PropTypes.string.isRequired,
    })
  ).isRequired,
};
QuestionnaireSurveyDropdown.defaultProps = {
  data: [],
};

export default QuestionnaireSurveyDropdown;
