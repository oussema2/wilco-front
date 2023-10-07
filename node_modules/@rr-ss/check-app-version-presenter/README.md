# CheckAppVersionPresenter

 CheckAppVersionPresenter checks the app's current version using the [AppVersionChecker service](/packages/app-version-checker) and if it's recommended or required to update the app shows an alert message informing the user to do so.

 ## Installation

### NPM

```sh
$ npm install --save @rr-ss/check-app-version-presenter
```
### Yarn
 ```sh
 $ yarn add @rr-ss/check-app-version-presenter
 ```

## Example

```js
import CheckAppVersionPresenter from '@rr-ss/check-app-version-presenter';

const versionChecker = new AppVersionChecker( { ... } );

const presenter = CheckAppVersionPresenter.defaultWith( {
	versionChecker,
	androidStoreURL: 'market://details?id=my-awesome-app',
	iosStoreURL: 'itms-apps://itunes.apple.com/us/app/apple-store/id1111111111',
	textsConfig: {
		recommendedToUpdatePopup: {
			title: 'Update to have new features!',
			updateButton: 'Go to the store!'
		}
	}
} );
```


## Reference

### constructor

When creating a new instance of the presenter you can pass the following paramters:

```ts
interface IConstructorParameters {
	versionChecker: IVersionChecker,
	showInfoMessage: IShowInfoMessage,
	openAppStorePage: IOpenAppStorePage,
	textsConfig?: ITextsConfigParameter
}
```

#### versionChecker

The version checker to use, it has to be an instance of `AppVersionChecker`.

```js
const versionChecker = new AppVersionChecker( { ... } );

const presenter = new CheckAppVersionPresenter( { versionChecker, ... } );
```

#### showInfoMessage

An object in charge of showing the required or recommended info messages to the user, it must implement the `IShowInfoMessage` interface:

```ts
interface IShowMessageButton {
	text: string,
	onPress?: () => void
}

interface IShowMessageParameters {
	title: string,
	message: string,
	buttons: IShowMessageButton[]
}

interface IShowInfoMessage {
	showMessage: ( parameters: IShowMessageParameters ) => void;
}
```

You can use the [ShowInfoMessage class](/packages/check-app-version-presenter/src/interactors/ShowInfoMessage.ts) included in the package to show the messages using the standard react native's [Alert](https://reactnative.dev/docs/alert) backend.

##### __Example__

```js
import { ShowInfoMessage }, CheckAppVersionPresenter from '@rr-ss/check-app-version-presenter';

const showInfoMessage = new ShowInfoMessage();
const presenter = new CheckAppVersionPresenter( { showInfoMessage, ... } );
```

#### openAppStorePage

An object in charge of opening the app's store page when the user chooses to update the app, it must implement the `IOpenAppStorePage` interface:

```ts
interface IOpenAppStorePage {
	openAppStore: () => Promise<boolean>;
}
```

You can use the [OpenAppStorePage class](/packages/check-app-version-presenter/src/interactors/OpenAppStorePage.ts) included in the package to open the stores page using react native's [Linking](https://reactnative.dev/docs/linking) backend.

##### __Example__

```js
import { OpenAppStorePage }, CheckAppVersionPresenter from '@rr-ss/check-app-version-presenter';

const openAppStorePage = new OpenAppStorePage( {
	androidStoreURL: 'market://details?id=my-awesome-app',
	iosStoreURL: 'itms-apps://itunes.apple.com/us/app/apple-store/id1111111111'
} );

const presenter = new CheckAppVersionPresenter( { openAppStorePage, ... } );
```

#### textsConfig

An object with different texts to show in the recommended to update and required to update popups, it must implement the `ITextsConfigParameter` interface:

```ts
interface IRecommendedToUpdatePopupTextsConfigParameter {
	title?: string,
	message?: string,
	updateButton?: string,
	cancelButton?: string
}

interface IRequiredToUpdatePopupTextsConfigParameter {
	title?: string,
	message?: string,
	updateButton?: string
}

interface ITextsConfigParameter {
	recommendedToUpdatePopup?: IRecommendedToUpdatePopupTextsConfig,
	requiredToUpdatePopup?: IRequiredToUpdatePopupTextsConfig
}
```

If you don't pass any configuration the default texts will be used:

```ts
{
	recommendedToUpdatePopup: {
		title: 'We have new features for you!',
		message: 'You can now download the latest version of the app.',
		updateButton: 'Update',
		cancelButton: 'Cancel'
	},
	requiredToUpdatePopup: {
		title: 'We need you to update the app',
		message: 'To continue, please download the latest version of the app.',
		updateButton: 'Update'
	}
};
```

##### __Example__

```js
const textsConfig = {
	recommendedToUpdatePopup: {
		title: 'Update to unlock new features!',
		updateButton: 'Go to the store'
	},
	requiredToUpdatePopup: {
		title: 'You have to update the app!',
	}
};

const presenter = new CheckAppVersionPresenter( { textsConfig, ... } );
```

### static defaultWith

Creates a new instance of the `CheckAppVersionPresenter` using the default `showInfoMessage` and `openStoreAppPage` provided by the package, you can pass the following paramters:

```ts
interface IDefaultWithParamters {
	versionChecker: IVersionChecker,
	androidStoreURL: string,
	iosStoreURL: string,
	textsConfig?: ITextsConfigParameter
}
```

#### versionChecker

See [constructor's versionChecker parameter reference](/packages/check-app-version-presenter#versionchecker).

#### androidStoreURL

The android store page url, for example: `market://details?id=my-awesome-app`.

#### iosStoreURL

The iOS store page url, for example: `'itms-apps://itunes.apple.com/us/app/apple-store/id1111111111'`.

#### textsConfig

See [constructor's textsConfig parameter reference](/packages/check-app-version-presenter#textsconfig).

### checkCurrentVersion

Checks the current app version and shows the corresponding popup informing the user to update (or none if the app version is ok). Returns a promise tha resolves with the result of the version checking:

```ts
enum VersionCheckResult {
    UPDATE_REQUIRED = "APP_UPDATE_REQUIRED",
    UPDATE_RECOMMENDED = "APP_UPDATE_RECOMMENDED",
    VERSION_OK = "APP_VERSION_OK"
}

checkCurrentAppVersion: () => Promise<VersionCheckResult>
```
