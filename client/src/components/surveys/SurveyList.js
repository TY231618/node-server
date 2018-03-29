import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends React.Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {

    return this.props.surveys.map(survey => {
      return (
        <div className="card blue-grey darken-1" key={ survey._id }>
          <div className="card-content white-text">
            <span className="card-title">{ survey.title }</span>
            <p>
              { survey.body }
            </p>
            <p className="right">
              Sent on: { new Date(survey.dateSent).toLocaleDateString() }
            </p>
          </div>
          <div className="card-action">
            <a>Yes: { survey.yes }</a>
            <a>No: { survey.no }</a>
          </div>
        </div>
      )
    });
  }

  render() {

    if(this.props.surveys.length === 0) {
      return (
        <div>
          <h1 className="center">Create a survey</h1>
        </div>
      )
    }

    return (
      <div>
        { this.renderSurveys() }
      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    surveys: state.surveys
  }
}

export default connect(mapStateToProps, { fetchSurveys: fetchSurveys })(SurveyList);