import api from "./apiConfig";

const dashboardAPI = {
    getRevenueAPI: () => {
        const url = `/dashboard/revenue`;
        return api.get(url);
    },
    getContractAPI: () => {
        const url = `/dashboard/contracts`;
        return api.get(url);
    },
    getRevenueByYearAPI: ({ year }) => {
        const url = `/dashboard/revenue/${year}`;
        return api.get(url);
    },
    getContractByYearAPI: ({ year }) => {
        const url = `/dashboard/contracts/${year}`;
        return api.get(url);
    },
    getServicesByMonthYearAPI: ({ month, year }) => {
        const url = `/dashboard/services?year=${year}&month=${month}`;
        return api.get(url);
    },
};

export default dashboardAPI;
