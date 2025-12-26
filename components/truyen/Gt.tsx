import React from 'react';

const Gt:React.FC<{des:string}> = ({des}:{des:string}) => {
  return <div className='w-full p-6 md:p-8 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-sm transition-colors duration-300'>
    <div className="flex items-center gap-3 mb-6">
      <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
      <h3 className="font-bold text-xl text-slate-800 dark:text-white uppercase tracking-wider">Giới thiệu tác phẩm</h3>
    </div>
    <div className="w-full text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-base md:text-lg italic font-serif">
      {des}
    </div>
  </div>;
};

export default Gt;
