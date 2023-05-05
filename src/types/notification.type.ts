export interface INotification {
    title: string,
    body: string,
    token?: string,
    data: {
        additionalProp1: string,
        additionalProp2: string,
        additionalProp3: string,
    },
    customerIdList?: string[],
}