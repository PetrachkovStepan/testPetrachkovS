import { Modal, Space } from "antd";
import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { DataType } from "../../App";

interface DeleteModalProps {
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  data: DataType[];
  id?: string;
}
const DeleteModal: React.FC<DeleteModalProps> = ({
  setData,
  setIsModalOpen,
  isModalOpen,
  data,
  id,
}) => {
  const handleOk = () => {
    setData(data.filter((item) => item.key !== id));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal onOk={handleOk} onCancel={handleCancel} open={isModalOpen}>
      <Space>
        <ExclamationCircleOutlined />
        <a>Are you sure, you want to delete this person?</a>
      </Space>
    </Modal>
  );
};

export default DeleteModal;
