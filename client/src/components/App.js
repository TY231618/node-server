import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';

const Landing = () => {

  return (
    <div>
      <h2>Landing</h2>
    </div>
  )
};

const SurveyNew = () => {

  return (
    <div>
      <h2>Survey New</h2>
    </div>
  )
};

const Dashboard = () => {

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
};

class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  };
  
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/surveys" component={ Dashboard } />
            <Route path="/surveys/new" component={ SurveyNew } />
          </div>
        </BrowserRouter>
      </div>
    )
  }
};

export default connect(null, { fetchUser: fetchUser })(App);