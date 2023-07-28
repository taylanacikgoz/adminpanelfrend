import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

//tabloda gosterilecek sutun verileri;
const columns = [
  {
    title: "BuildingType",
    dataIndex: "buildingType",
    sorter: (a, b) => a.buildingType.length - b.buildingType.length,
    style: "border: 1px solid",
    filters: [
      {
        text: "Farm",
        value: "farm",
      },
      {
        text: "Academy",
        value: "academy",
      },
      {
        text: "LumberMill",
        value: "lumbermill",
      },
      {
        text: "Headquarters",
        value: "headquarters",
      },
      {
        text: "Barracks",
        value: "barracks",
      },
    ],
    width: "30%",
  },
  {
    title: "BuildingCost",
    dataIndex: "buildingCost",
    sorter: true,
    width: "30%",
  },
  {
    title: "ConstructionTime",
    dataIndex: "constructionTime",
    width: "30%",
  },
];

const ConfigurationPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [distinctBuildingType, setDistinctBuildingType] = useState([]);
  const [buildingCostError, setBuildingCostError] = useState("");
  const [constructionTimeError, setConstructionTimeError] = useState("");

  const buildingTypes = [
    {
      text: "Farm",
      value: "farm",
    },
    {
      text: "Academy",
      value: "academy",
    },
    {
      text: "LumberMill",
      value: "lumbermill",
    },
    {
      text: "Headquarters",
      value: "headquarters",
    },
    {
      text: "Barracks",
      value: "barracks",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://localhost:7276/api/ConfigurationPage")
      .then((results) => {
        setData(results?.data);
        setLoading(false);

        const addedBuildingTypes = results.data.map(
          (item) => item.buildingType
        );

        // Secilebilir BuildingType'lari yukarda tanimladigim buildintType icinden filtrele ve tabloya eklenmis olanlari cikar.
        const filteredBuildingTypes = buildingTypes.filter(
          (item) => !addedBuildingTypes.includes(item.text)
        );

        setDistinctBuildingType(filteredBuildingTypes.map((item) => item.text));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (values.buildingCost <= 0) {
      setBuildingCostError("BuildingCost should be bigger than zero");
      setTimeout(() => {
        setBuildingCostError("");
      }, 2000);
    } else if (values.constructionTime > 1800 || values.constructionTime < 30) {
      setConstructionTimeError(
        "ConstructionTime should be min. 30 sec and max. 1800 sec"
      );
      setTimeout(() => {
        setConstructionTimeError("");
      }, 2000);
    } else {
      axios
        .post("https://localhost:7276/api/ConfigurationPage", values)
        .then(() => {
          setIsModalVisible(false);
          fetchData();
        });
    }
  };

  const AddNewItem = ({ onCancel, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      form.resetFields();
    }, [form]);

    const handleFormOk = () => {
      form
        .validateFields()
        .then((values) => {
          onSave(values); //(build-in)acilan modelde ok'a basinca modeli onaylar ve kapatir.Post request atma islevi yok.
        })
        .catch((error) => console.log(error));
    };

    return (
      <Modal
        open={isModalVisible}
        onCancel={onCancel}
        onOk={handleFormOk}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="buildingType"
            label="BuildingType"
            rules={[{ required: true }]}
          >
            <Select placeholder="Please select your BuildingType">
              {distinctBuildingType.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="buildingCost"
            label="BuildingCost $"
            rules={[{ required: true }]}
          >
            <Input placeholder="BuildingCost" />
          </Form.Item>
          {buildingCostError && (
            <h4 style={{ color: "red", fontWeight: "bold" }}>
              {buildingCostError}
            </h4>
          )}

          <Form.Item
            name="constructionTime"
            label="ConstructionTime"
            rules={[{ required: true }]}
          >
            <Input placeholder="ConstructionTime" />
          </Form.Item>
          {constructionTimeError && (
            <h4 style={{ color: "red", fontWeight: "bold" }}>
              {constructionTimeError}
            </h4>
          )}
        </Form>
      </Modal>
    );
  };

  return (
    <div className="datagrid">
      <Button onClick={handleAdd} style={{ maxWidth: "100px" }}>
        + Add
      </Button>
      <Table
        scroll={{
          x: 1100,
          y: 300,
        }}
        columns={columns}
        rowKey="id"
        dataSource={data}
        loading={loading}
        size="middle"
      />
      {isModalVisible && (
        <AddNewItem
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onSave={handleFormSubmit}
        />
      )}
    </div>
  );
};
export default ConfigurationPage;
