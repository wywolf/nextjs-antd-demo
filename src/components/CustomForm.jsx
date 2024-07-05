// src/components/CustomForm.js

'use client'; // Ensure this component is treated as a client component

import React from 'react';
import { Form, Input, Select, Radio, InputNumber, Rate, Slider, Switch, DatePicker, Button, Row, Col, Card } from 'antd';

const { Option } = Select;

const FormItem = ({ type, name, label, options, disabled, onChange, style }) => {
  switch (type) {
    case 'input':
      return (
        <Form.Item name={name} label={label}>
          <Input style={style} disabled={disabled} />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item name={name} label={label}>
          <Select
            showSearch
            style={style}
            disabled={disabled}
            optionFilterProp="children"
            onChange={onChange}
          >
            {options.map((option, index) => (
              <Option key={index} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    case 'radio':
      return (
        <Form.Item name={name} label={label}>
          <Radio.Group options={options} disabled={disabled} onChange={onChange} />
        </Form.Item>
      );
    case 'inputNumber':
      return (
        <Form.Item name={name} label={label}>
          <InputNumber style={style} disabled={disabled} onChange={onChange} />
        </Form.Item>
      );
    case 'rate':
      return (
        <Form.Item name={name} label={label}>
          <Rate disabled={disabled} onChange={onChange} />
        </Form.Item>
      );
    case 'slider':
      return (
        <Form.Item name={name} label={label}>
          <Slider style={style} disabled={disabled} onChange={onChange} />
        </Form.Item>
      );
    case 'switch':
      return (
        <Form.Item name={name} label={label} valuePropName="checked">
          <Switch disabled={disabled} onChange={onChange} />
        </Form.Item>
      );
    case 'datePicker':
      return (
        <Form.Item name={name} label={label}>
          <DatePicker style={style} disabled={disabled} onChange={onChange} />
        </Form.Item>
      );
    default:
      return null;
  }
};

const CustomForm = ({ layout, formRef, form, validateMessages, requiredMark, isDisable, formItems, searchList, resetForm }) => (
  <Card>
    <Form {...layout} ref={formRef} form={form} validateMessages={validateMessages} requiredMark={requiredMark}>
      <Row gutter={16}>
        {formItems.map((item, index) => (
          <Col key={index} span={item.span || 12}>
            <FormItem
              type={item.type}
              name={item.name}
              label={item.label}
              options={item.options}
              disabled={item.disabled !== undefined ? item.disabled : isDisable}
              onChange={item.onChange}
              style={item.style}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Button
            type="primary"
            style={{ borderRadius: '0.2rem', margin: '0 1rem', width: '6rem' }}
            htmlType="submit"
            onClick={searchList}
          >
            查 询
          </Button>
          <Button
            style={{ borderRadius: '0.2rem', margin: '0 1rem', width: '6rem' }}
            onClick={resetForm}
          >
            重 置
          </Button>
        </Col>
      </Row>
    </Form>
  </Card>
);

export default CustomForm;
