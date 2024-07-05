'use client'; // Ensure this page is treated as a client component

import React from 'react';
import { Form } from 'antd';
import CustomForm from '@/components/CustomForm';

const MyFormPage = () => {
  const [form] = Form.useForm();
  const formRef = React.createRef();

  const formItems = [
    { type: 'input', name: 'keyword', label: '关键字', style: { width: 250 } },
    {
      type: 'select', name: 'templateType', label: '推荐类型', options: [
        { value: 'type1', label: 'Type 1' },
        { value: 'type2', label: 'Type 2' },
      ], style: { width: 250 }
    },
    { type: 'input', name: 'creator', label: '创建人', style: { width: 250 } },
    {
      type: 'radio', name: 'status', label: '状态', options: [
        { label: '启用', value: 'enabled' },
        { label: '禁用', value: 'disabled' },
      ]
    },
    { type: 'inputNumber', name: 'age', label: '年龄' },
    { type: 'rate', name: 'rating', label: '评分' },
    { type: 'slider', name: 'volume', label: '音量' },
    { type: 'switch', name: 'active', label: '激活' },
    { type: 'datePicker', name: 'time', label: '时间' },
  ];

  const searchList = () => {
    console.log('Search List');
  };

  const resetForm = () => {
    formRef.current.resetFields();
  };

  return (
    <CustomForm
      layout={{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
      formRef={formRef}
      form={form}
      validateMessages={{ required: '${label} is required!' }}
      requiredMark={false}
      isDisable={false}
      formItems={formItems}
      searchList={searchList}
      resetForm={resetForm}
    />
  );
};

export default MyFormPage;
