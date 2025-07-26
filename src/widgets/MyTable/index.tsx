import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import type { DataType } from "../../App"; //вынести в отдельную папку
import React, { useState } from "react";
import Column from "antd/es/table/Column";
import AddEditModal from "../AddEditModal";
import DeleteModal from "../DeleteModal";
import dayjs from "dayjs";

interface MyTableProps {
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  data: DataType[];
}
const MyTable: React.FC<MyTableProps> = ({ setData, data }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    sorter,
    extra
  ) => {
    console.log("params", pagination, sorter, extra);
  };
  return (
    <>
      <Table<DataType>
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      >
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) =>
            a.name.localeCompare(b.name, ["ru", "en"], { sensitivity: "base" })
          }
        />
        <Column
          title="Salary"
          dataIndex="salary"
          key="salary"
          sorter={(a, b) => a.salary - b.salary}
        />
        <Column
          title="BirthDate"
          dataIndex="birthDate"
          key="birthDate"
          sorter={(a, b) =>
            dayjs(a.birthDate).unix() - dayjs(b.birthDate).unix()
          }
        />
        <Column
          title="Action"
          key="action"
          render={(_, record: DataType) => (
            <Space size="middle">
              <Button
                color="primary"
                variant="text"
                onClick={() => {
                  setId(record.key);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                color="danger"
                variant="text"
                onClick={() => {
                  setId(record.key);
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      <AddEditModal
        data={data}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setData={setData}
        type="edit"
        id={id}
      />
      <DeleteModal
        data={data}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setData={setData}
        id={id}
      />
    </>
  );
};

export default MyTable;
