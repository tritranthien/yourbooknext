import type { FC, ReactElement } from 'react'
import React from 'react';
import USDBlayout from '../../components/userDBLayout/USDBlayout';

const Userdata = () => {
    return (
        <div className="w-full min-h-screen">
            <span className="w-full block px-5 py-3 text-2xl font-bold">Thông tin người dùng</span>
            <div className="flex p-5">
              <span className=""></span>
            </div>
        </div>
    )
}

Userdata.displayName = 'Userdata';

Userdata.getLayout = function getLayout(page: ReactElement) {
    return (
      <USDBlayout>
        {page}
      </USDBlayout>
    )
  }

export default Userdata;