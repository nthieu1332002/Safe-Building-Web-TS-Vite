
const inactiveColor = "#ff4d4f";
const activeColor = "cyan";
const paidColor = "cyan";
const unpaidColor = "#faad14";
const availableColor = "cyan"
const unAvailableColor = "#fa541c"
const fullColor = "#ffbc80"
const repairColor = "yellow"
const successColor = "cyan";
const pendingColor = "#fffb8f"
const canceledColor = "red"
const topUpColor = "#91caff"
const withDrawColor = "#fff1f0"
const validColor = "geekblue"
const expiredColor = "red"

export const adminStatus = [
    {
        id: 1,
        status: "ACTIVE",
        color: activeColor,
    },
    {
        id: 2,
        status: "INACTIVE",
        color: inactiveColor,
    }
];

export const billStatus = [
    {
        id: 1,
        status: "PAID",
        color: paidColor,

    },
    {
        id: 2,
        status: "UNPAID",
        color: unpaidColor,
    }
];

export const buildingStatus = [
    {
        id: 1,
        status: "AVAILABLE",
        color: availableColor,
    },
    {
        id: 2,
        status: "FULL",
        color: fullColor,
    },
    {
        id: 3,
        status: "REPAIR",
        color: repairColor,
    }
];

export const customerStatus = [
    {
        id: 1,
        status: "ACTIVE",
        color: activeColor,
    },
    {
        id: 2,
        status: "INACTIVE",
        color: inactiveColor,
    }
];
export const facilityStatus = [
    {
        id: 1,
        status: "AVAILABLE",
        color: availableColor
    },
    {
        id: 2,
        status: "UNAVAILABLE",
        color: unAvailableColor
    }
];

export const flatStatus = [
    {
        id: 1,
        status: "AVAILABLE",
        color: availableColor
    },
    {
        id: 2,
        status: "REPAIR",
        color: repairColor
    },
    {
        id: 3,
        status: "UNAVAILABLE",
        color: unAvailableColor
    },
];

export const moneyTransferStatus = [
    {
        id: 1,
        status: "SUCCESS",
        color: successColor
    },
    {
        id: 2,
        status: "PENDING",
        color: pendingColor
    },
    {
        id: 3,
        status: "CANCELLED",
        color: canceledColor
    }
];

export const moneyTransferType = [
    {
        id: 1,
        status: "TOP_UP",
        color: topUpColor
    },
    {
        id: 2,
        status: "WITHDRAW",
        color: withDrawColor
    }
];

export const rentContractStatus = [
    {
        id: 1,
        status: "VALID",
        color: validColor
    },
    {
        id: 2,
        status: "EXPIRED",
        color: expiredColor,
    },
    {
        id: 3,
        status: "DELETED",
        color: inactiveColor,
    }
];

export const serviceStatus = [
    {
        id: 1,
        status: "ACTIVE",
        color: activeColor,
    },
    {
        id: 2,
        status: "INACTIVE",
        color: inactiveColor,
    }
];

export const transactionStatus = [
    {
        id: 1,
        status: "SUCCESS",
        color: successColor
    },
    {
        id: 2,
        status: "PENDING",
        color: pendingColor
    },
    {
        id: 3,
        status: "CANCELLED",
        color: canceledColor
    }
];

export const walletStatus = [
    {
        id: 1,
        status: "ACTIVE",
        color: activeColor,
    },
    {
        id: 2,
        status: "INACTIVE",
        color: inactiveColor,
    }
];

export const sortOption = [
    {
        value: 'asc',
        label: 'Ascending',
    },
    {
        value: 'desc',
        label: 'Descending',
    },
]