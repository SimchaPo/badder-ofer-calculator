import { Form, Input, InputNumber, Table, Select } from "antd";
import React, { useState } from "react";
import { results as results25 } from "./results25";
import { editableTableColumns } from "./columns";

const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "select" ? (
      <Select showSearch style={{ minWidth: "100px" }}>
        <Option value={"empty"}>ללא עודפים</Option>
        {restProps.data
          ?.filter((d) => d.letters !== record.letters)
          ?.map((d) => (
            <Option
              value={d.letters}
              key={d.key}
              disabled={restProps.data.find((df) => df.odafim === d.letters)}
            >
              {d.letters}
            </Option>
          ))}
      </Select>
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          className="form-item-row"
          name={dataIndex}
          style={{ margin: 0, padding: 0 }}
          rules={[
            {
              required: inputType !== "select",
              message: `יש להכניס ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({ results, setResults }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      letters: "",
      amount: "",
      odafim: undefined,
      ...record,
    });
    setEditingKey(record.key);
  };

  const save = async (key) => {
    try {
      let row = await form.validateFields();
      let newData = [...results];
      const saveIndex = newData.findIndex((item) => key === item.key);
      let saveItem;

      if (row.odafim === "empty") {
        row.odafim = undefined;
      }

      if (saveIndex > -1) {
        saveItem = newData[saveIndex];
        if (saveItem.odafim !== row.odafim) {
          const removedOdafimIndex = newData.findIndex(
            (item) => saveItem.odafim === item.letters
          );

          if (removedOdafimIndex > -1) {
            const removedOdafimItem = newData[removedOdafimIndex];
            newData.splice(removedOdafimIndex, 1, {
              ...removedOdafimItem,
              odafim: undefined,
            });
          }

          if (row.odafim) {
            const odafimIndex = newData.findIndex(
              (item) => row.odafim === item.letters
            );

            if (odafimIndex > -1) {
              const odafimItem = newData[odafimIndex];
              newData.splice(odafimIndex, 1, {
                ...odafimItem,
                odafim: saveItem.letters,
              });
            } else {
              newData.push(row);
            }
          }
        }

        newData.splice(saveIndex, 1, { ...saveItem, ...row });
        setEditingKey("");
      } else {
        newData.push(row);
        setEditingKey("");
      }

      setResults(newData);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedColumns = editableTableColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "amount"
            ? "number"
            : col.dataIndex === "odafim"
            ? "select"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        data: results,
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => !isEditing(record) && edit(record),
            onBlur: (event) => save(record.key),
          };
        }}
        dataSource={results}
        columns={mergedColumns}
        pagination={false}
      />
    </Form>
  );
};

export default EditableTable;
