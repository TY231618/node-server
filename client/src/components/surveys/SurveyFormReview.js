import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';

const SurveyFormReview = (props) => {

  const reviewFields = _.map(formFields, (field) => {

    return (
      <div key={ field.name }>
        <label>{ field.label }</label>
        <div>{ props.formValues[field.name] }</div>
      </div>
    )
  });


    return (
      <div>
        <h5>Please review your entries</h5>
        { reviewFields }
        <button className="yellow darken-3 btn-flat" onClick={ props.onCancel } >Back</button>
      </div>
    )
}

function mapStateToProps({form: {surveyForm: {values}}}) {

  return {
    formValues: values
  }
}

export default connect(mapStateToProps)(SurveyFormReview);