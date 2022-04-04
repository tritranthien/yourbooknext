import React from 'react';

const Gt:React.FC<{des:string}> = ({des}:{des:string}) => {
  return <div className='w-full p-4'>
      <p className="w-full text-break whitespace-pre-wrap">
        {des}
      </p>
  </div>;
};

export default Gt;
