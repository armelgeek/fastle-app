import React, { useState , useEffect} from "react";
import { useStoreActions } from "easy-peasy";

import { Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Avatar , Input, Button, Checkbox } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios'
type ProjectData ={
  id?:number;
  title:string;
  description:string;
  done?:boolean;
}

const assetsUrl = "http://localhost:4001/assets/uploads/";
const uploadUrl ="http://localhost:4001/photo";
const removeFileUrl ="http://localhost:4001/remove-file";
export default function  EditProject({ project , onEdit }){
  const [imageName,setImageName] =useState("") 
  const [loading ,setLoading]  =useState(false)
  const update = useStoreActions((actions:any) => actions.projects.update);
  const [data,setData] = useState<ProjectData>({
    title :'',
    description:''
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
  function getFilename(url:any){
    if(url == undefined) return;
    else 
    return url.split('\\').pop().split('/').pop();
  }
  const projectFileList:any= [
    {
      uid: project._id,
      name: project.image != "" ? getFilename(project.image) : "",
      status: 'done',
      url: project.image,
    }
  ]
  useEffect(() => {

    setImageName(project.image)
    setData(project)
  }, [project]);
  const onFinish = async (data:ProjectData) => {
    const newData = { ...data, ...{ image:imageName, _id: project._id } };
      await update(newData)
      setData({
        title :'',
        description:''
      });
      onEdit()
   };
 
   function validURL(str:string) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
 
   const props = {
    action: uploadUrl,
    onRemove: onRemove,
    onChange: handleChange,
    maxCount:1,
    defaultFileList: project.image!=" "   ? projectFileList : {},
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
    
    <Form
      name="normal_add_project"
      className="login-add-project"
      onFinish={onFinish}
    >
      
      <Form.Item name="title" initialValue={project.title}>
        <Input  placeholder="Nom du projet"  />
      </Form.Item>
      <Form.Item name="description" initialValue={project.description}>
      <Input  placeholder="Description du projet" />
      </Form.Item>
      <Form.Item>
              <ImgCrop rotate>
                <Upload {...props} >
                <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </ImgCrop>
        </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Enregistrer
        </Button>
        <Button type="primary" onClick = {onEdit} >
          Annuler
        </Button>
      </Form.Item>
    </Form>
    </>
  );
}
