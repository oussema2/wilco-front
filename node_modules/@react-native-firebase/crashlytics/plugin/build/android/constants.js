"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crashlyticsVersion = exports.crashlyticsPlugin = exports.crashlyticsClassPath = void 0;
const appPackageJson = require('@react-native-firebase/app/package.json');
exports.crashlyticsClassPath = 'com.google.firebase:firebase-crashlytics-gradle';
exports.crashlyticsPlugin = 'com.google.firebase.crashlytics';
exports.crashlyticsVersion = appPackageJson.sdkVersions.android.firebaseCrashlyticsGradle;
