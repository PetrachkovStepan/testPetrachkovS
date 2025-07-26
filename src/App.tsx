import { useState } from "react";

import dayjs from "dayjs";
import { Space } from "antd";

import MyTable from "./widgets/MyTable";
import AddEditModal from "./widgets/AddEditModal";
import ControlsContainer from "./widgets/ControlsContainer";

import "./App.css";

export interface DataType {
  key: string;
  name: string;
  salary: number;
  birthDate: string | dayjs.Dayjs;
}
const App = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }}>
        <ControlsContainer
          data={data}
          setIsModalOpen={setIsModalOpen}
          setData={setData}
        />
        <MyTable setData={setData} data={data} />
      </Space>
      <AddEditModal
        type="add"
        data={data}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setData={setData}
      />
    </>
  );
};
export default App;
