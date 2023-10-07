import getRemoteConfig from '@react-native-firebase/remote-config';
export const MINIMUM_SUPPORTED_APP_VERSION_CONFIG_KEY = 'min_supported_app_version';
export const MINIMUM_RECOMMENDED_APP_VERSION_CONFIG_KEY = 'min_recommended_app_version';
export default class FirebaseMinVersionsFetcher {
    remoteConfigBackend;
    minSupportedAppVersionKey;
    minRecommendedAppVersionKey;
    constructor({ 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    remoteConfigBackend = getRemoteConfig(), minRecommendedAppVersionKey = MINIMUM_RECOMMENDED_APP_VERSION_CONFIG_KEY, minSupportedAppVersionKey = MINIMUM_SUPPORTED_APP_VERSION_CONFIG_KEY } = {}) {
        this.remoteConfigBackend = remoteConfigBackend;
        this.minSupportedAppVersionKey = minSupportedAppVersionKey;
        this.minRecommendedAppVersionKey = minRecommendedAppVersionKey;
    }
    async fetch() {
        await this.remoteConfigBackend.fetchAndActivate();
    }
    get minRecommendedVersion() {
        return this.getCofigString(this.minRecommendedAppVersionKey);
    }
    get minSupportedVersion() {
        return this.getCofigString(this.minSupportedAppVersionKey);
    }
    getCofigString(key) {
        return this.remoteConfigBackend.getString(key);
    }
}
