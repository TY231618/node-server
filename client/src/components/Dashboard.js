import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {

  renderButton() {
    return (
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    )
  }

  render() {

    return (
      <div>
        motherfecking dashboard yo
        { this.renderButton() }
      </div>
      
    )
  }
}

export default Dashboard;