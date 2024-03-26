import React from "react";
import { Table } from "antd";
import "./tableList.css";

const TableList = (props) => {
  return (
    <Table
      size={"small"}
      bordered={false}
      rowKey={"id"}
      columns={props.columns}
      pagination={false}
      style={{
        maxHeight: `${props.height ? props.height : 570}px`,

        overflow: props.over ? "" : "auto",
      }}
      rowClassName={(record, index) => {
        let className = "";
        className = index % 2 === 0 ? "oddRow" : "evenRow";
        return className;
      }}
      dataSource={props.dataSource}
    />
  );
};
export default TableList;
