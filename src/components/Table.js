import React from "react";
import { useAppContext } from "../context/appContext";
import { Space, Table, Tag } from "antd";

const DataTable = () => {
    const { data } = useAppContext();
    const columns = data.length
        ? Object.keys(data[0]).map((item) => {
              var options = {};
              if (typeof data[0][item] === "number") {
                  options.defaultSortOrder = "descend";
                  options.sorter = (a, b) => a[item] - b[item];
              }
              if (typeof data[0][item] === "string") {
                  const uniqueValues = [...new Set(data.map((it) => it[item]))];
                  const filters = uniqueValues.map((value) => {
                      return { text: value, value: value };
                  });
                  options.filters = filters;
                  options.onFilter = (value, record) => record[item] === value;
                  options.filterMode = "tree";
              }

              console.log("options", options);
              return { title: item, dataIndex: item, key: item, ...options };
          })
        : [];
    const dataSource = data.map((item, index) => {
        return { ...item, key: item.S_no };
    });

    return (
        <div className='table-container'>
            <div className='data-table'>
                <Table columns={columns} dataSource={dataSource} />;
            </div>
        </div>
    );
};

export default DataTable;
