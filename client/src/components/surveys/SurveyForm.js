import React from 'react';
import { reduxForm } from 'redux-form';

class SurveyForm extends React.Component {

  render() {
    return (
      <form>
        <input type="text" />
      </form>
    )
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);