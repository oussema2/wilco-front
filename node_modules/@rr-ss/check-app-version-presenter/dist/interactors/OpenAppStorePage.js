import { Linking, Platform } from 'react-native';
export default class OpenAppStorePage {
    androidStoreURL;
    iosStoreURL;
    linkOpener;
    constructor({ androidStoreURL, iosStoreURL, linkOpener = Linking }) {
        this.linkOpener = linkOpener;
        this.androidStoreURL = androidStoreURL;
        this.iosStoreURL = iosStoreURL;
    }
    openAppStore() {
        const urlToOpen = Platform.select({
            ios: this.iosStoreURL,
            android: this.androidStoreURL
        });
        if (!urlToOpen) {
            throw new Error(`No URL set for the platform ${Platform.OS}.`);
        }
        return this.linkOpener.openURL(urlToOpen);
    }
}
