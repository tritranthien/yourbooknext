import type { FC, ReactElement } from 'react'
import React from 'react';
import USDBlayout from '../../components/userDBLayout/USDBlayout';

const Userdata = () => {
    return (
        <div className="w-full min-h-screen">
            sendmess
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