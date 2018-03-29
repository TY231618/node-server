import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

class Dashboard extends React.Component {

  renderButton() {
    return (
      <div className=" center">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    )
  }

  render() {

    return (
      <div>
        <SurveyList />
        { this.renderButton() }
      </div>
      
    )
  }
}

export default Dashboard;