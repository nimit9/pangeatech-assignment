import React, { useContext, useReducer } from "react";
import axios from "axios";
import {
    GET_DATA_BEGIN,
    GET_DATA_ERROR,
    GET_DATA_SUCCESS,
    GET_FILTERED_DATA,
} from "./actions";
import reducer from "./reducer";
import { sortByMonth } from "../utils/sortByMonth";

const initialState = {
    isLoading: false,
    data: [],
    revenueTypes: [],
    chartData: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getData = async () => {
        dispatch({ type: GET_DATA_BEGIN });
        try {
            const { data } = await axios.get(
                "http://fetest.pangeatech.net/data"
            );
            const revenueTypes = [
                ...new Set(data.map((item) => item.revenue_type)),
            ];
            dispatch({
                type: GET_DATA_SUCCESS,
                payload: { data, revenueTypes },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getChartData = (selectedRevenueType) => {
        const { data } = state;
        const filteredData = selectedRevenueType
            ? data.filter((item) => {
                  return selectedRevenueType === item.revenue_type;
              })
            : data;

        var temp = {};
        var chartData = filteredData.reduce((array, item) => {
            var key = item.product + "-" + item.month;
            if (!temp[key]) {
                const { product, month, acv } = item;
                temp[key] = Object.assign({}, { product, month, acv });
                array.push(temp[key]);
            } else {
                temp[key].acv += item.acv;
            }
            return array;
        }, []);

        chartData = sortByMonth(chartData);
        console.log("chartData", chartData);

        dispatch({ type: GET_FILTERED_DATA, payload: { chartData } });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                getData,
                getChartData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
