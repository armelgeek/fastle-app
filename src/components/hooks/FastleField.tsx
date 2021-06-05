import React, { useState , useRef,useEffect } from 'react';
import useEditField from "./useEditField";
import useAddField from "./useAddField";
import useNumberEditInputField from './useNumberEditInputField'
import useSelectEditInputField from './useSelectEditInputField'
import useSelectEditInputNumberField from './useSelectEditInputNumberField'
import { Form, Input, Typography, Tag, Button, InputNumber, Select } from 'antd';

import axios from 'axios';
import { useStoreActions } from 'easy-peasy';
import { BookOutlined } from '@ant-design/icons';
type InputProps = {
  data: any,
  inputData: any,
  title: string,
  name:string,
  toggleContent?:any,
  toggleState?:any,
  setToggleState?:any,
  action:any,
  selectData?:any,
  selectOptionTitle?:any,
  defaultValue?:any
}
const FastleForm = React.forwardRef<any, any>((props, ref) => {
    const onFinish = () =>{
        if(props.method =="POST"){

        }else{

        }
    }
    const onFinishFailed = () =>{
  
    }
    return (<Form ref ={ref} onFinish={onFinish} onFinishFailed={onFinishFailed}>
         {props.children}
        </Form>)
});
const FastleInputEdit = ({data,inputData,title,name,action}: InputProps) =>{
    
    const {
        field,
        isEditing,
        setIsEditing,
        setField,
        inputRef,
        handleBlur,
        handleChange,
        onKeyPressed,
      } = useEditField({
        fieldId: data?._id,
        onCreate: (field) =>{

        },
        onEdit: async (id, field) =>{
            const arr = {
                _id : id,
                [name]:field
            };
            await action(arr);
            
        },
      });
      useEffect(()=>{
        setField(inputData);
      },[inputData])
      const renderEdittingInput = () => {
        return (
        <Form.Item>
          <Input
            onBlur={handleBlur}
            ref={inputRef}
            value ={ field  }
            onKeyPress={onKeyPressed}
            onChange={handleChange}
            placeholder={title}
            name ={name}
          />
          </Form.Item>
        );
      };
      return (
        <>
            {isEditing ? (
                renderEdittingInput()
            ) : (
              <>
                <div  className="div-dashed" onClick={() => {
                setIsEditing(true)
                } }>
                   { field?.length==0 ? title  : field  }
                </div>
              </>
            )}
        </>
      )
}


const FastleTextAreaEdit = ({data,inputData,title,name,toggleContent,toggleState,setToggleState,action}: InputProps) =>{
  const [focused, setFocused] = useState(false);

  const {
    field,
    isEditing,
    setIsEditing,
    setField,
    inputRef,
    handleBlur,
    handleChange,
    onKeyPressed,
  } = useEditField({
    fieldId: data?._id,
    onCreate: (field) =>{

    },
    onEdit: async (id, field) =>{
        const arr = {
            _id : id,
            [name]:field
        };
        await action(arr);
        if(setToggleState!=null){
          setToggleState(false)
        }
    },
  });
  useEffect(()=>{
    setField(inputData);
  },[inputData])
  useEffect(()=>{
    if(toggleState!=null){
        setIsEditing(toggleState);
    }
  },[toggleState])
    return (
      <>
        {isEditing ? (
        <Input.TextArea  style={{border: focused ? '1px solid green' : ''}}  onFocus={() => setFocused(true)}  onBlur={handleBlur}
            ref={inputRef}
            autoSize={{ minRows:4}}
            value ={ field  }
            onKeyPress={onKeyPressed}
            onChange={handleChange}
            placeholder={title}
            name ={name}
            />
        ) : (
          <>
            { field.length==0 ? title  : field }
          </>
      )}
      </>
    )
}
const FastleInputNumberEdit = ({data,inputData,title,name,action}: InputProps) =>{
    
  const {
      field,
      isEditing,
      setIsEditing,
      setField,
      inputRef,
      handleChange,
      handleBlur,
      onKeyPressed,
    } = useNumberEditInputField({
      fieldId: data?._id,
      onCreate: (field) =>{

      },
      onEdit: async (id, field) =>{
          const arr = {
              _id : id,
              [name]:field
          };
          await action(arr);
          
      },
    });
    useEffect(()=>{
      setField(inputData);
    },[inputData])
    const renderEdittingInput = () => {
      return (
      <Form.Item>
        <InputNumber
          min={0}
          ref={inputRef}
          value ={ field  }
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyPress={onKeyPressed}
          placeholder={title}
          name ={name}
        />
        </Form.Item>
      );
    };
    return (
      <>
          {isEditing ? (
              renderEdittingInput()
          ) : (
            <>
              <div   onClick={() => {
              setIsEditing(true)
              } }>
                 <Tag>  { field==0 ?    title  : field  }</Tag>
              </div>
            </>
          )}
      </>
    )
}



const FastleSelectEdit = ({data,inputData,title,name,selectData,selectOptionTitle,defaultValue,action}: InputProps) =>{
  const children:any = [];
 
  selectData.map((sd:any) =>{
    children.push(<Select.Option key={sd._id} value={sd._id}>{sd[selectOptionTitle]}</Select.Option>);
  })
   const [dataSelectInput,setDataSelectInput] = useState([])
  const {
      field,
      isEditing,
      setIsEditing,
      setField,
      inputRef,
      handleChange,
      handleBlur,
    } = useSelectEditInputField({
      fieldId: data?._id,
      onCreate: (field) =>{

      },
      onEdit: async (id, field) =>{
          const arr = {
              _id : id,
              [name]:field
          };
          await action(arr);
          
      },
    });
    useEffect(()=>{
      setField(inputData);
      setDataSelectInput(selectData)
  
    },[inputData])
   
    
    const renderEdittingInput = () => {
      return (
        <>
    
      <Form.Item>
         <Select
         defaultValue={defaultValue._id}
         onBlur={handleBlur}
         style={{ width: 120 }} 
         placeholder={title}
         onChange={handleChange}>
                {children}
           </Select>
        
        </Form.Item>
        </>
      );
    };
    return (
      <>
          {isEditing ? (
              renderEdittingInput()
          ) : (
            <>
              <div   onClick={() => {
              setIsEditing(true)
              } }>
                 <Tag>  { field.length==0 ?    title  :  JSON.stringify(dataSelectInput.filter((d:any) => d._id ==field)) }</Tag>
              </div>
            </>
          )}
      </>
    )
}

const FastleSelectNumberEdit = ({data,inputData,title,name,selectData,selectOptionTitle,defaultValue,action}: InputProps) =>{
  const children:any = [];
 
  selectData.map((sd:any) =>{
    children.push(<Select.Option key={sd._id} value={sd._id}>{sd[selectOptionTitle]}</Select.Option>);
  })
   const [dataSelectInput,setDataSelectInput] = useState([])
  const {
      field,
      isEditing,
      setIsEditing,
      setField,
      inputRef,
      handleChange,
      handleBlur,
    } = useSelectEditInputNumberField({
      fieldId: data?._id,
      onCreate: (field) =>{

      },
      onEdit: async (id, field) =>{
          const arr = {
              _id : id,
              [name]:field
          };
          await action(arr);
          
      },
    });
    useEffect(()=>{
      setField(inputData);
      setDataSelectInput(selectData)
  
    },[inputData])
   
    
    const renderEdittingInput = () => {
      return (
        <>
    
      <Form.Item>
         <Select
         defaultValue={defaultValue._id}
         onBlur={handleBlur}
         style={{ width: 120 }} 
         placeholder={title}
         onChange={handleChange}>
                {children}
           </Select>
        
        </Form.Item>
        </>
      );
    };
    return (
      <>
          {isEditing ? (
              renderEdittingInput()
          ) : (
            <>
              <div   onClick={() => {
              setIsEditing(true)
              } }>
                 <Tag>  { field==0 ?    title  :  JSON.stringify(dataSelectInput.filter((d:any) => d._id ==field)) }</Tag>
              </div>
            </>
          )}
      </>
    )
}
const FastleInputAdd = ({title,name,data,action}: InputProps) =>{
    
  const {
      field,
      setField,
      inputRef,
      handleBlur,
      handleChange,
      onKeyPressed
    } = useAddField({
        onCreate: async (field) =>{
          const arr = {
            [name]:field
          };
          let newData ={};
          if(data.length==0) newData = arr;
          else newData = { ...arr, ...data };
          await action(newData);
      },
    });
    
    return (
        <Form.Item>
        <Input
          onBlur={handleBlur}
          ref={inputRef}
          value ={ field  }
          onKeyPress={onKeyPressed}
          onChange={handleChange}
          placeholder={title}
          name ={name}
        />
        </Form.Item>
    
    )
}
export{
    FastleForm,
    FastleInputEdit,
    FastleTextAreaEdit,
    FastleInputNumberEdit,
    FastleSelectEdit,
    FastleSelectNumberEdit,
    FastleInputAdd,
}