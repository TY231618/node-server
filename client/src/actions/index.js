import axios from 'axios';
import { FETCH_USER, SUBMIT_SURVEY } from './types';

// export const fetchUser = () => {

//   return function(dispatch) {
//     axios.get('/api/current_user')
//       .then((res) => dispatch({ type: FETCH_USER, payload: res }));
//   };

// };

//refactored to use asyn/await

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
}

export const handleToken = (token) => async dispatch => {

  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
}

// export const submitSurvey = (survey) => async dispatch => {

//   const res = await axios.post('/api/surveys', survey);

//   dispatch({ type: SUBMIT_SURVEY, payload: res});
// };

export const submitSurvey = (values) => {

  console.log('submit survey action =======>', values);

  return { type: SUBMIT_SURVEY };
};