import React from 'react';

const SurveyFormReview = (props) => {

    return (
      <div>
        <h5>Please check your inputs</h5>
        <button className="yellow darken-3 btn-flat" onClick={ props.onCancel } >Back</button>
      </div>
    )
}

export default SurveyFormReview;