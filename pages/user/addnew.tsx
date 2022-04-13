import React, { ReactElement } from 'react';
import { ToastOptions,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateOrUpdateNovel from '../../components/samePage/CreateOrUpdateNovel';
import USDBlayout from '../../components/userDBLayout/USDBlayout';

export const toastConfig:ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  }

const Userdata = () => {
  
    return (<>
    <CreateOrUpdateNovel isUpdate={false}/>
    {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          draggable
          pauseOnFocusLoss={false}
        /> */}
    </>
        
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