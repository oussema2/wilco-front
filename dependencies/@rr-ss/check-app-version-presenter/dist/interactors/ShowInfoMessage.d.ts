import { Alert } from 'react-native';
export interface IShowMessageButton {
    text: string;
    onPress?: () => void;
}
export interface IShowMessageParameters {
    title: string;
    message: string;
    buttons: IShowMessageButton[];
}
export default class ShowInfoMessage {
    alertBackend: Alert;
    constructor({ alertBackend }?: {
        alertBackend?: import("react-native").AlertStatic | undefined;
    });
    showMessage({ title, message, buttons }: IShowMessageParameters): void;
}
