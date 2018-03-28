import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {label: 'Survey Title', name: 'title', error: 'Please enter a survey title!'},
  {label: 'Subject', name: 'subject', error: 'Please enter a subject!'},
  {label: 'Email Body', name: 'body', error: 'Please add some content to your email!'},
  {label: 'Recipient List', name: 'emails', error: 'Please provide some email addresses!'},
];

class SurveyForm extends React.Component {

  renderFields() {
    return _.map(FIELDS, (field) => {
      return (
        <Field 
          key={field.name}
          type="text"
          name={field.name}
          label={field.label}
          component={ SurveyField }
        />
      )
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit(() => this.props.onSurveySubmit) } >
          { this.renderFields() }
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">close</i>
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {

  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, (field) => {
    if(!values[field.name]) {
      errors[field.name] = field.error
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm'
})(SurveyForm);