import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { Author } from '../../interface/_Author'
import { Category } from '../../interface/_Category'
import { Novel } from '../../interface/_Novel'
import CreateOrUpdateNovel from '../samePage/CreateOrUpdateNovel'

interface EditPopupProps{
  novel: Novel<Author,Category>
  closeUpdate: ()=>void
}

const EditNovelPopup:React.FC<EditPopupProps> = ({novel,closeUpdate}:EditPopupProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center bg-black/10 z-50">
        <div className="w-[800px] overflow-y-auto relative">
          <CreateOrUpdateNovel closePopup={closeUpdate} isUpdate={true} novelData={novel}/>
          <AiFillCloseSquare onClick={closeUpdate} className="cursor-pointer absolute top-2 right-2 text-3xl text-red-500"/>

        </div>
    </div>
  )
}

export default EditNovelPopup