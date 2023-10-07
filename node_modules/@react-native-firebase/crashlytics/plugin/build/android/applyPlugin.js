"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPlugin = exports.withApplyCrashlyticsPlugin = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const constants_1 = require("./constants");
/**
 * Update `app/build.gradle` by applying crashlytics plugin
 */
const withApplyCrashlyticsPlugin = config => {
    return (0, config_plugins_1.withAppBuildGradle)(config, config => {
        if (config.modResults.language === 'groovy') {
            config.modResults.contents = applyPlugin(config.modResults.contents);
        }
        else {
            config_plugins_1.WarningAggregator.addWarningAndroid('react-native-firebase-crashlytics', `Cannot automatically configure app build.gradle if it's not groovy`);
        }
        return config;
    });
};
exports.withApplyCrashlyticsPlugin = withApplyCrashlyticsPlugin;
function applyPlugin(appBuildGradle) {
    const crashlyticsPattern = new RegExp(`apply\\s+plugin:\\s+['"]${constants_1.crashlyticsPlugin}['"]`);
    if (!appBuildGradle.match(crashlyticsPattern)) {
        appBuildGradle += `\napply plugin: '${constants_1.crashlyticsPlugin}'`;
    }
    return appBuildGradle;
}
exports.applyPlugin = applyPlugin;
