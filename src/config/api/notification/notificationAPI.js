import api from "./apiConfig";

const notificationAPI = {
    sendNotificationAPI: (data) => {
        const url = `/notification/send-notification`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    sendMultiNotificationAPI: (data) => {
        const url = `/notification/send-notification-for-multiple-customer`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
}

export default notificationAPI