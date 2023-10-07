import type MinVersionsFetcher from './MinVersionsFetcher';
export declare enum VersionCheckResult {
    UPDATE_REQUIRED = "APP_UPDATE_REQUIRED",
    UPDATE_RECOMMENDED = "APP_UPDATE_RECOMMENDED",
    VERSION_OK = "APP_VERSION_OK"
}
interface CurrentVersionFetcher {
    getVersion(): string;
}
interface ConstructorProps {
    minVersionsFetcher: MinVersionsFetcher;
    currentVersionFetcher?: CurrentVersionFetcher;
}
export default class AppVersionChecker {
    minVersionsFetcher: MinVersionsFetcher;
    currentVersionFetcher: CurrentVersionFetcher;
    constructor({ minVersionsFetcher, currentVersionFetcher }: ConstructorProps);
    checkCurrentVersion: () => Promise<VersionCheckResult>;
    private get mustUpdateApp();
    private get isRecommendedToUpdate();
    private get currentAppVersion();
    private get minSupportedAppVersion();
    private get minRecommendedAppVersion();
    private validateCurrentVersion;
    private validateMinVersions;
}
export {};
