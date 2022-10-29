import { GET_DATA_BEGIN, GET_DATA_SUCCESS, GET_FILTERED_DATA } from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
    switch (action.type) {
        case GET_DATA_BEGIN:
            return {
                ...state,
                isLoading: true,
            };

        case GET_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                revenueTypes: action.payload.revenueTypes,
                isLoading: false,
            };
        case GET_FILTERED_DATA:
            return {
                ...state,
                chartData: action.payload.chartData,
            };
        default:
            throw new Error(`no such action : ${action.type}`);
    }
};

export default reducer;
