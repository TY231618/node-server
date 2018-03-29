import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

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

export const submitSurvey = (values, history) => async dispatch => {

  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  
  dispatch({ type: FETCH_USER, payload: res.data });
}

// export const submitSurvey = (values, history) => async dispatch => {

//   try {
//     const res = await axios.post('/api/surveys', values);

//     history.push('/surveys');

//     dispatch({ type: FETCH_USER, payload: res.data });
    
//   } catch (error) {
//     dispatch({ type: FETCH_USER, payload: error.response });
//   }
// };

// export const submitSurvey = (values) => {

//   console.log('submit survey action =======>', values);

//   return { type: SUBMIT_SURVEY };
// };

export const fetchSurveys = () => async dispatch => {

  const res =await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });

}