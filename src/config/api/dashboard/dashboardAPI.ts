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
    getRevenueByYearAPI: ({ year }: { year: number }) => {
        const url = `/dashboard/revenue/${year}`;
        return api.get(url);
    },
    getContractByYearAPI: ({ year }: { year: number }) => {
        const url = `/dashboard/contracts/${year}`;
        return api.get(url);
    },
    getServicesByMonthYearAPI: ({ month, year }: { month: number, year: number }) => {
        const url = `/dashboard/services?year=${year}&month=${month}`;
        return api.get(url);
    },
};

export default dashboardAPI;
