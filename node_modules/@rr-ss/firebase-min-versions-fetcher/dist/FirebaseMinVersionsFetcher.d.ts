import type { MinVersionsFetcher } from '@rr-ss/app-version-checker';
export declare const MINIMUM_SUPPORTED_APP_VERSION_CONFIG_KEY = "min_supported_app_version";
export declare const MINIMUM_RECOMMENDED_APP_VERSION_CONFIG_KEY = "min_recommended_app_version";
interface FirebaseRemoteConfig {
    fetchAndActivate(): Promise<boolean>;
    getString(key: string): string;
}
export interface ConfigOptions {
    remoteConfigBackend?: FirebaseRemoteConfig;
    minSupportedAppVersionKey?: string;
    minRecommendedAppVersionKey?: string;
}
export default class FirebaseMinVersionsFetcher implements MinVersionsFetcher {
    remoteConfigBackend: FirebaseRemoteConfig;
    minSupportedAppVersionKey: string;
    minRecommendedAppVersionKey: string;
    constructor({ remoteConfigBackend, minRecommendedAppVersionKey, minSupportedAppVersionKey }?: ConfigOptions);
    fetch(): Promise<void>;
    get minRecommendedVersion(): string;
    get minSupportedVersion(): string;
    protected getCofigString(key: string): string;
}
export {};
