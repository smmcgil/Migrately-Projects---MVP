import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import PropTypes from "prop-types";
import CountrySelect from "react-bootstrap-country-select";
import schema from "../../schemas/questionnaireCaptureSchema";

const Capture = (props) => {
  const [countryValue, setCountryValue] = useState(null);
  const [data] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
  });

  const onSubmitClicked = (values) => {
    props.setUserInfo({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      country: countryValue.name,
    });
    props.handleResponse(props.answer);
  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={data}
        onSubmit={onSubmitClicked}
        validationSchema={schema}
      >
        <Form>
          <Field
            type="text"
            name="firstName"
            className="form-control float_effect mb-5"
            placeholder="Enter your First Name"
          />
          <Field
            type="text"
            name="lastName"
            className="form-control float_effect mb-5"
            placeholder="Enter your Last Name"
          />
          <Field
            type="email"
            name="email"
            className="form-control float_effect mb-5"
            placeholder="Enter your Email"
          />
          <CountrySelect
            value={countryValue}
            onChange={setCountryValue}
            className="float_effect"
            flags={true}
          />
          <button className="questionnaire_button" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

Capture.propTypes = {
  setUserInfo: PropTypes.func.isRequired,
  handleResponse: PropTypes.func.isRequired,
  answer: PropTypes.shape({
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
  }).isRequired,
};

export default Capture;
