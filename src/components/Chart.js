import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";
import { useAppContext } from "../context/appContext";

const Chart = () => {
    const { getData, data, revenueTypes, chartData, getChartData } =
        useAppContext();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getChartData();
    }, [data]);

    const config = {
        data: chartData,
        xField: "month",
        yField: "acv",
        seriesField: "product",
        yAxis: {
            label: {
                formatter: (v) => `${(v / 1000).toFixed(0)} K`,
            },
        },
        legend: {
            layout: "horizontal",
            position: "bottom",
            flipPage: false,
            offsetX: 15,
            offsetY: 15,
        },
        theme: {
            colors20: [
                "#e6194b",
                "#3cb44b",
                "#ffe119",
                "#4363d8",
                "#f58231",
                "#911eb4",
                "#46f0f0",
                "#f032e6",
                "#bcf60c",
                "#fabebe",
                "#008080",
                "#e6beff",
                "#9a6324",
                "#fffac8",
            ],
        },
    };

    return (
        <>
            <div className='chart'>
                <Line {...config} />
            </div>
        </>
    );
};

export default Chart;
