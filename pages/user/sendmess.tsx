import debounce from 'lodash.debounce';
import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import USDBlayout from '../../components/userDBLayout/USDBlayout';
import { UserFind } from '../../interface/_User';
import { finByName } from '../../libs/api/authAPI';
import { sendMessage } from '../../libs/api/messAPI';

const Userdata = () => {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [finduser,setFindUser] = useState('');
  const [userList,setUserList] = useState<UserFind[]>([]);
  const [revicerList,setReciver] = useState<UserFind[]>([]);
  const debouncedSave = useCallback(
    debounce( async (nextValue:string) => {
        if(nextValue.length > 0) {
          const res = await finByName(nextValue);
          setUserList([...res]); 
        }else{
          setUserList([]);
        }
    }, 1000),
    [], // will be created only once initially
  );
  const handlePush = (newitem:UserFind) => {
    setReciver(pre=>[...pre,newitem]);
    setFindUser('');
  }
  const removeThis = (index:number) => {
    const newArr = [...revicerList];
    newArr.splice(index, 1);
    setReciver(newArr);
  }
  const handleInputFindChange = async (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFindUser(value);
    debouncedSave(value);
  }
  const handleReset = () => {
    setContent('');
    setTitle('');
    setFindUser('');
    setReciver([]);
  }

  const sendMess = async () => {
    const newMess = {
      recieverList: revicerList,
      content: content,
      title: title
    }
    try {
      const res = await sendMessage(newMess);
      if(res.status==200) {
        toast.success('gửi thành công');
        handleReset();
      }
    } catch (error) {
      toast.error('gửi thất bại');
    }
  }
    return (
        <div className="w-full min-h-screen p-4">
            <span className="block font-bold text-2xl mb-5">soạn thông điệp</span>
            <div className="md:pl-10">
            <label className="mt-4 font-bold">người nhận</label>
            <div className="relative h-8">
              <input value={finduser || ''} onChange={handleInputFindChange} type="text" className="h-full w-[200px] outline-none border-[1px] rounded px-1" />
              <ul className="absolute top-full left-0 w-[200px] bg-white shadow-md">
                  {
                    finduser.length > 0 && userList.length <= 0 && <li>không tìm thấy ai tên này</li>
                  }
                  {
                    finduser.length > 0 && userList.length > 0 && userList.map((item,index)=>{
                      return <li key={index} onClick={()=>handlePush(item)} className="cursor-pointer text-orange-500 py-1 px-3 font-bold">{item.username}</li>
                    })
                  }
              </ul>
            </div>
            <ul className="flex flex-wrap p-2 text-sm">
              <li className="font-bold italic mr-2">danh sách người nhận:</li>
              {
                revicerList.map((item,index) => {
                  return <li key={index} className="mr-2 bg-green-400 text-white rounded-md px-2 py-1 flex items-center">{item.username}<AiFillCloseCircle className='ml-3 cursor-pointer' onClick={()=>removeThis(index)}/></li>
                })
              }
            </ul>
            <label className="block mt-4 font-bold">tiêu đề</label>
            <input value={title || ''} onChange={(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)} name="title" placeholder="nhập vào tiêu đề" type="text" className="block outline-none border-[1px] border-gray-200 rounded md:w-[500px] mt-1 p-1"/>
            <label className="block mt-4 font-bold">nội dung</label>
            <textarea value={content || ''} onBlur={(e:ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} onChange={(e:ChangeEvent<HTMLTextAreaElement>) =>setContent(e.target.value)} name="content" placeholder="nhập vào nội dung" className="block outline-none border-[1px] border-gray-200 rounded resize-none w-[500px] h-[250px] mt-1 p-1 mb-6" />
            <button onClick={sendMess} className='ml-5 outline-none rounded-md text-white bg-sky-500 px-3 py-1'>gửi</button>
            <button onClick={handleReset} className='outline-none rounded-md text-white bg-gray-500 px-3 py-1 ml-2'>làm mới</button>
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