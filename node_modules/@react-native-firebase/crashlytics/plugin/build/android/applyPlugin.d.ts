import { ConfigPlugin } from '@expo/config-plugins';
/**
 * Update `app/build.gradle` by applying crashlytics plugin
 */
export declare const withApplyCrashlyticsPlugin: ConfigPlugin;
export declare function applyPlugin(appBuildGradle: string): string;
