import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import "./questionnairestyles.css";
import { GetAllCategoriesImmigrantVisa } from "services/immigrantVisaCategoriesService";
import { GetAllCategories } from "services/nivcService";
import toastr from "toastr";

const defaultDescription = "Select a visa type for a description.";
const VisaDropDown = (props) => {
  const [immigrantVisas, setImmigrantVisas] = useState([]);
  const [nonImmigrantVisas, setNonImmigrantVisas] = useState([]);
  const [currentlyHoveredDescription, setCurrentlyHoveredDescription] =
    useState(defaultDescription);

  useEffect(() => {
    const getAllVisas = async () => {
      const [getImmigrantVisas, getNonImmigrantVisas] = await Promise.all([
        GetAllCategoriesImmigrantVisa(),
        GetAllCategories(),
      ]).catch((err) => {
        toastr["error"](`${err}`);
      });
      setImmigrantVisas([
        ...getImmigrantVisas.items.sort((a, b) => a.code.localeCompare(b.code)),
      ]);
      setNonImmigrantVisas([
        ...getNonImmigrantVisas.data.items.sort((a, b) =>
          a.visaCategory.localeCompare(b.visaCategory)
        ),
      ]);
    };
    getAllVisas();
  }, []);

  const onSelectVisa = (visa) => {
    props.answer.text = visa.target.text;
    props.handleResponse(props.answer);
  };

  const mapVisaItem = (visa, idx) => {
    if (visa.code) {
      return (
        <Dropdown.Item
          key={idx}
          onMouseOver={() => setCurrentlyHoveredDescription(visa.name)}
          onMouseOut={() => setCurrentlyHoveredDescription(defaultDescription)}
          onClick={onSelectVisa}
        >
          {visa.code}
        </Dropdown.Item>
      );
    } else if (visa.visaCategory) {
      return (
        <Dropdown.Item
          key={idx}
          onMouseOver={() => setCurrentlyHoveredDescription(visa.travelPurpose)}
          onMouseOut={() => setCurrentlyHoveredDescription(defaultDescription)}
          onClick={onSelectVisa}
        >
          {visa.visaCategory}
        </Dropdown.Item>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="questionnaire_response ">
        <p className="text-center">{currentlyHoveredDescription}</p>
      </div>
      <div className="row">
        <Dropdown className="col-6 text-center">
          <Dropdown.Toggle className="questionnaire_button">
            Immigrant Visas
          </Dropdown.Toggle>
          <Dropdown.Menu className="questionnaire_dropdown">
            {immigrantVisas.map(mapVisaItem)}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="col-6 text-center">
          <Dropdown.Toggle className="questionnaire_button">
            Non Immigrant Visas
          </Dropdown.Toggle>
          <Dropdown.Menu className="questionnaire_dropdown">
            {nonImmigrantVisas.map(mapVisaItem)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </React.Fragment>
  );
};

VisaDropDown.propTypes = {
  userInput: PropTypes.arrayOf(PropTypes.string).isRequired,
  setUserInput: PropTypes.func.isRequired,
  handleResponse: PropTypes.func.isRequired,
  answer: PropTypes.shape({ text: PropTypes.string }).isRequired,
};
export default VisaDropDown;
