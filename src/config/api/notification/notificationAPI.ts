import { INotification } from "../../../types/notification.type";
import api from "./apiConfig";

const notificationAPI = {
    sendNotificationAPI: (data: INotification) => {
        const url = `/notification/send-notification`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    sendMultiNotificationAPI: (data: INotification) => {
        const url = `/notification/send-notification-for-multiple-customer`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
}

export default notificationAPI