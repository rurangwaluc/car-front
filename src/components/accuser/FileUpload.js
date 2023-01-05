import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import{ PlusOutlined} from '@ant-design/icons';
import axios from 'axios';
import styles from "./add.module.scss";

function FileUpload(props) {

    const [Images, setImages] = useState([]) 

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        axios.post('/api/uploads', formData, config)
            .then(response => {
                const image = response.data.image;
                if (response.data.success) {
                    if(image.size >= 1048576) {
                        return alert("Max Size for Image is 1MB");
                    } else {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                    }

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    const Url = 'http://localhost:5000'

    return (
        <div className='fileUpload' >
            <Dropzone
                onDrop={onDrop}
                multiple={true}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className='fileUpload-image' 
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        
                        {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
                        <div className={styles["input-box"]}>
                        <PlusOutlined className={styles.in} />
                        </div>

                    </div>
                )}
            </Dropzone>

            <div className={styles['add-image']} >

              {Images.map((image, index) => (
                    <div   key={index} onClick={() => onDelete(image)}>
                        <img src={`${Url}/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}

            </div>

        </div>
    )
}

export default FileUpload
