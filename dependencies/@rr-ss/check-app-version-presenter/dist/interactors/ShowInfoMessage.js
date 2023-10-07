import { Alert } from 'react-native';
export default class ShowInfoMessage {
    alertBackend;
    constructor({ alertBackend = Alert } = {}) {
        this.alertBackend = alertBackend;
    }
    showMessage({ title, message, buttons }) {
        this.alertBackend.alert(title, message, buttons);
    }
}
