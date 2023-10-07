# Firebase Min Versions Fetcher

Fetches the minimum supported and recommended versions for the [app version checker](https://git.amalgama.co/rr-ss/npm-packages/app-version-checker/-/tree/develop/packages/app-version-checker) using firebase remote config.

## Requirements

You must install [@react-native-firebase/remote-config](https://rnfirebase.io/remote-config/usage) and configure it in your project before installing this package in order for remote config to work correctly.

## Configuration

By default the fetcher expect the variables `min_supported_app_version` and `min_recommended_app_version` to be defined in the project remote config console. If you want to change the name of this variables you can do it from the configuration passed to the fetcher when creating a new instance:

```js
new FirebaseMinVersionsFetcher( {
	minSupportedAppVersionKey: 'other_min_supported_version_key_name',
	minRecommendedAppVersionKey: 'other_min_recommended_version_key_name'
} )
```