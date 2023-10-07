/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { getVersion } from 'react-native-device-info';
import { gt, valid } from 'semver';
import InvalidVersionError from './InvalidVersionError';
export var VersionCheckResult;
(function (VersionCheckResult) {
    VersionCheckResult["UPDATE_REQUIRED"] = "APP_UPDATE_REQUIRED";
    VersionCheckResult["UPDATE_RECOMMENDED"] = "APP_UPDATE_RECOMMENDED";
    VersionCheckResult["VERSION_OK"] = "APP_VERSION_OK";
})(VersionCheckResult || (VersionCheckResult = {}));
export default class AppVersionChecker {
    minVersionsFetcher;
    currentVersionFetcher;
    constructor({ minVersionsFetcher, currentVersionFetcher = { getVersion } }) {
        this.minVersionsFetcher = minVersionsFetcher;
        this.currentVersionFetcher = currentVersionFetcher;
    }
    checkCurrentVersion = async () => {
        await this.minVersionsFetcher.fetch();
        this.validateCurrentVersion();
        this.validateMinVersions();
        if (this.mustUpdateApp) {
            return VersionCheckResult.UPDATE_REQUIRED;
        }
        if (this.isRecommendedToUpdate) {
            return VersionCheckResult.UPDATE_RECOMMENDED;
        }
        return VersionCheckResult.VERSION_OK;
    };
    get mustUpdateApp() {
        return !!this.minSupportedAppVersion && (gt(this.minSupportedAppVersion, this.currentAppVersion));
    }
    get isRecommendedToUpdate() {
        return !!this.minRecommendedAppVersion && (gt(this.minRecommendedAppVersion, this.currentAppVersion));
    }
    get currentAppVersion() {
        return valid(this.currentVersionFetcher.getVersion());
    }
    get minSupportedAppVersion() {
        return valid(this.minVersionsFetcher.minSupportedVersion);
    }
    get minRecommendedAppVersion() {
        return valid(this.minVersionsFetcher.minRecommendedVersion);
    }
    validateCurrentVersion() {
        if (!this.currentAppVersion) {
            throw InvalidVersionError.forCurrentVersion();
        }
    }
    validateMinVersions() {
        if (!this.minSupportedAppVersion) {
            throw InvalidVersionError.forMinSupportedVersion();
        }
        if (!this.minRecommendedAppVersion) {
            throw InvalidVersionError.forMinRecommendedVersion();
        }
    }
}
