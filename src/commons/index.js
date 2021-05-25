import React, { useState } from 'react';
import { Upload, message } from 'antd';
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
	},[imgs])
  const upload = (options) => {
		const { file } = options;
		setImgs([file]);
	}

  return (
    <Upload
      listType="picture-card"
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      customRequest={upload}
      beforeUpload={beforeUpload}
    >
      {imgs.length !== 0 ? (
        <img src={URL.createObjectURL(imgs[0])} style={{maxWidth: '100%'}}/>
      ) : (
        <img src={fileList} style={{maxWidth: '100%'}}/>
      )}
    </Upload>
  )
}
