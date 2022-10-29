import { Select } from "antd";
import React from "react";
import { useAppContext } from "../context/appContext";

const { Option } = Select;

const SearchOptions = () => {
    const { revenueTypes, getChartData } = useAppContext();
    const handleChange = (value) => {
        if (value === "all") {
            getChartData();
            return;
        }
        getChartData(value);
    };
    return (
        <>
            <Select
                defaultValue='all'
                onChange={handleChange}
                style={{ width: 180 }}
            >
                <Option value='all'>All revenue types</Option>
                {revenueTypes.map((type) => {
                    return (
                        <Option value={type} key={type}>
                            {type}
                        </Option>
                    );
                })}
            </Select>
        </>
    );
};

export default SearchOptions;
