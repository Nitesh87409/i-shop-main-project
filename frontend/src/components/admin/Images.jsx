
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaTimes } from 'react-icons/fa'

export default function Images({ isMulti, onImageSelect }) {

    const [previewSrc, setPreviewSrc] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);

        const file = acceptedFiles[0]
        // onImageSelect(file)
        // console.log(file);


        if (file) {
            onImageSelect(file)
            // console.log(onImageSelect);

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                // in set setPreviewSrc image encripted path is saved 
                setPreviewSrc(e.target.result)
                // console.log(e.target.result);
                // console.log(e);


            }
        }
    }, [])

    const ImageRemove = (e) => {
        e.stopPropagation()
        setPreviewSrc(null)
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    return (
        <div className='col-span-1 border rounded p-3 cursor-pointer'>
            <div {...getRootProps()} >
                <input {...getInputProps()} multiple={isMulti} accept={'image/png ,image/jpg,image/jpeg'} />
                {
                    previewSrc == null
                        ? isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Upload Product Image</p>
                        :
                        <div className='relative'>
                            <img className='max-h-[250px]' src={previewSrc} alt='Product Image' />
                            <button className='absolute top-0 right-0 bg-white'><FaTimes onClick={ImageRemove} /> </button>
                        </div>
                }
               
            </div>
        </div>
    )
}
