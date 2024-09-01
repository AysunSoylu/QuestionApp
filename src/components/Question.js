

import React from 'react';

const Question = ({ data, showOptions, handleAnswer }) => {
  return (
    <div className="question">
      <img src={require(`../assets/${data.media}`)} alt="question media" className="question-image" />
      <h2>{data.question}</h2>
      {showOptions && (
        <div className="options">
          {data.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
