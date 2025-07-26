import type { GetProps } from "antd";
import { Button, Input, Select, Space } from "antd";
import type { DataType } from "../../App"; //вынести в отдельную папку
import React, { useState, useRef } from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

interface ControlsContainerProps {
  data: DataType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
}
const ControlsContainer: React.FC<ControlsContainerProps> = ({
  data,
  setIsModalOpen,
  setData,
}) => {
  type SearchProps = GetProps<typeof Input.Search>;
  const { Search } = Input;
  const boofData = useRef<DataType[]>([]);

  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [selectString, setSelectString] = useState<
    "name" | "salary" | "birthDate"
  >("name");

  const handleSelectChange = (value: "name" | "salary" | "birthDate") => {
    setSelectString(value);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (!isSearched) {
      boofData.current = data;
      if (selectString == "salary") {
        setData(data.filter((item) => item[selectString] === Number(value)));
      } else {
        setData(data.filter((item) => item[selectString] === value));
      }
      setIsSearched(true);
    } else {
      setData(boofData.current);
      setIsSearched(false);
    }
    return;
  };
  return (
    <Space>
      <Button
        color="primary"
        variant="solid"
        size="large"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Add item
      </Button>
      <Select
        defaultValue="name"
        size="large"
        style={{ width: 120 }}
        onChange={handleSelectChange}
        options={[
          { value: "name", label: "Name" },
          { value: "salary", label: "Salary" },
          { value: "birthDate", label: "Birth date" },
        ]}
      />
      <Search
        placeholder="Search..."
        enterButton={isSearched ? <CloseOutlined /> : <SearchOutlined />}
        size="large"
        color="default"
        onSearch={onSearch}
      />
    </Space>
  );
};

export default ControlsContainer;
