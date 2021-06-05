import React, { useState, useEffect } from "react";
import { Form, Avatar, Input, Button, Checkbox } from 'antd';
import { useStoreActions } from "easy-peasy";
import { Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import uuid from 'uuid'
import ImgCrop from 'antd-img-crop';
import axios from 'axios'
import './styles.scss'
type ProjectData = {
  id?: number;
  title: string;
  description: string;
  createdAt :any;
}
const assetsUrl = "http://localhost:4001/assets/uploads/";
const uploadUrl ="http://localhost:4001/photo";
const removeFileUrl ="http://localhost:4001/remove-file";
export default function AddProject({ onAdded }) {
  const [imageName,setImageName] =useState("") 
  const [loading ,setLoading]  =useState(false)
  const [data, setData] = useState<ProjectData>({
    title: '',
    description: '',
    createdAt:new Date()
  })

  const onRemove = async file => {
    
    let src = assetsUrl + file.name;
     if (src) {
        
        await axios({
          method: 'post',
          url: removeFileUrl,
          data: {
           url : src,
          }
        });
      }else{
        console.log('fichier introuvable')
      }

  }
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      setImageName(assetsUrl + info.file.originFileObj.name)
    }
  };

  const save = useStoreActions((actions: any) => actions.projects.save);
  const onFinish = async (data: ProjectData) => {
    const newData = { ...data, ...{ image:imageName,createdAt:new Date() } };
    await save(newData)
    setData({
      title: '',
      description: '',
      createdAt:new Date()
    });
    onAdded()
  };
  const props = {
    action: uploadUrl,
    onRemove: onRemove,
    onChange: handleChange,
    maxCount:1,
    // beforeUpload(file:any) {
    //   const suffix = file.name.slice(file.name.lastIndexOf('.'));
    //   const filename = Date.now() + suffix;
    //   file.url = assetsUrl + filename;
  
    //   return file;
    // },
    
    multiple: false,
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={6} offset={8}>
          <h2 className="create-project-title">Créer un nouveau projet</h2>
          <Form
            name="normal_add_project"
            className="add-project"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            
            <Form.Item name="title">
              <Input placeholder="Nom du projet" />
            </Form.Item>
            <Form.Item name="description">
              <Input.TextArea  placeholder="Déscription du projet" />
           </Form.Item>
            <Form.Item>
              <ImgCrop rotate>
                <Upload {...props} >
                <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </ImgCrop></Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" >
                Enregistrer
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </>
  );
}
