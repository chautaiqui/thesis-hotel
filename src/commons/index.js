import React, { useState } from 'react';
import { Upload, message, notification } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';


export const CustomUpload = (props) => {
  const { fileList =  '', onChange = () => {}} = props;
  const [imgs, setImgs] = useState([])
	
	const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  React.useEffect(()=>{
		onChange(imgs);
	},[imgs, onChange])
  const upload = (options) => {
		const { file } = options;
		setImgs([file]);
	}

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      customRequest={upload}
      beforeUpload={beforeUpload}
    >
      {imgs.length !== 0 ? (
        <img src={URL.createObjectURL(imgs[0])} style={{maxWidth: '100%'}} alt="img-list"/>
      ) : (
        <img src={fileList} style={{maxWidth: '100%'}} alt="imglist"/>
      )}
    </Upload>
  )
}

export const messageError = (title,msg) => {
  if (msg) {
    let content;
    switch (typeof msg) {
      case 'string': 
        content = msg;
        break;
      case 'object':
        content = (
        <div>
          {
          Object.keys(msg).map((key, index) => (
            <div key={index}>
            - {key}: {msg[key]}
            </div>
          ))
          }
        </div>
        );
        break;
      default:
        content = JSON.stringify(msg)
        break;
    }
    return notification.error({
      message: title,
      description: content,
      duration: 5
    })
  }
    
  return message.error('Something wrong happened.');
}
  
export const messageSuccess = (msg, content) => {
  return notification.success({
    message: msg || 'Action successfully!',
    description: content,
    duration: 5
  });
}