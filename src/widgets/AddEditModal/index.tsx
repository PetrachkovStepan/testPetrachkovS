import { Button, DatePicker, Form, Input, Modal } from "antd";
import type { DataType } from "../../App";
import React, { useEffect } from "react";
import dayjs from "dayjs";

interface AddEditModalProps {
  type: "add" | "edit";
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  data: DataType[];
  id?: string;
}
const AddEditModal: React.FC<AddEditModalProps> = ({
  type,
  setData,
  setIsModalOpen,
  isModalOpen,
  data,
  id,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (type == "edit" && isModalOpen == true) {
      const editItem = data[data.findIndex((item) => item.key === id)];
      form.setFieldsValue({
        name: editItem.name,
        birthDate: dayjs(editItem.birthDate),
        salary: editItem.salary,
      });
    }
  }, [isModalOpen, id]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const payload: DataType = {
        key: crypto.randomUUID().toString(),
        name: values.name,
        salary: Number(values.salary),
        birthDate: values.birthDate.format("YYYY-MM-DD"),
      };

      if (type == "add") {
        setData([...data, payload]);
      } else {
        payload.key = id!;
        const newData = data;
        newData[data.findIndex((item) => item.key === payload.key)] = payload;
        setData(newData);
      }
      form.resetFields();
      handleCancel();
    } catch (error) {
      console.log("Validation error:", error);
    }
  };
  return (
    <Modal
      title="Add person info"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {type === "add" ? "Add item" : "Save edit"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name={"personForm" + id}
        initialValues={{ salary: "", name: "", birthday: null }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter a name" },
            {
              validator: (_, value) =>
                value && !/\s/.test(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Name must not contain spaces")),
            },
          ]}
        >
          <Input placeholder="Name" size="large" />
        </Form.Item>

        <Form.Item
          label="Salary"
          name="salary"
          rules={[
            { required: true, message: "Please enter a salary" },
            {
              validator: (_, value) =>
                !value || value <= 0
                  ? Promise.reject("Salary must be greater than 0")
                  : Promise.resolve(),
            },
          ]}
        >
          <Input type="number" placeholder="Salary" size="large" />
        </Form.Item>

        <Form.Item
          label="BirthDate"
          name="birthDate"
          rules={[{ required: true, message: "Please enter birth date" }]}
        >
          <DatePicker
            size="large"
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
