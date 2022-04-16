import React from 'react';

const Gt:React.FC<{des:string}> = ({des}:{des:string}) => {
  return <div className='w-full py-2 md:p-4'>
    <span className="font-bold block text-xl py-2">mô tả</span>
      <p className="w-full text-break whitespace-pre-wrap">
        {des}
      </p>
  </div>;
};

export default Gt;
