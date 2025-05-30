import React from 'react';

const ShowPlusMinus = (props) => {
  const sky = props.sky;
  const ground = props.ground;

  return (
    <div>
      <div className={`inline-block w-1/2 text-${sky.color}-500`}>
        {sky.sign}
      </div>
      <div className={`inline-block w-1/2 text-${ground.color}-500`}>
        {ground.sign}
      </div>
    </div>
  );
};

export default ShowPlusMinus;
