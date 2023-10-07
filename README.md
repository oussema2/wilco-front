# Wilco ReactNative

## Requirements

- [ReactNative Environment SetUp](https://reactnative.dev/docs/getting-started)
- _Node_ > v15.4.0
- _React_ > 17.0.2
- Yarn installed
- After installing the Android SDK, make sure you have the NDK version 21.4.7075529 LTS already installed and CMake version 3.10.2.4988404. If you don't, you can install it via Android Studio or IntelliJ IDEA Ultimate.

## Set up project

```sh
git clone git@git.amalgama.co:rr-ss/wilco/wilco-reactn.git
cd wilco-reactn
yarn install
cp .env.example .env.dev
cp .env.example .env.staging
cp .env.example .env.production
```

## Env files

### Automatic creation of env files using Vault's stored secrets

You can automatically create and fill the projects environments files using Vault's stored secrets.

#### Installing teller

We are using [Teller](https://github.com/SpectralOps/teller) in order to syncronize our local env files with our vault's stored secret. In order to install teller we need to:

**MacOS**

```bash
brew tap spectralops/tap && brew install teller
```

**Linux**

For linux you can download Teller's source code from [here](https://github.com/spectralops/teller/releases).

#### Setting up Vault

In order for the script to access your Vault's stored secret we need to provide the following env variables:

- `VAULT_ADDR`: The vault server address where the secrets are stored. For example, for Amalgama's vaul server we will use `https://vault.amalgama.co`.
- `VAULT_TOKEN`: The access token for the user which has access to the secrets. There are two different ways to obtain this token:

  1. Using the [vault's cli](https://www.vaultproject.io/docs/commands) with the `login` command along with the `oidc` method:

     ```bash
     vault login -method=oidc
     ```

     After logging-in successfuly we need to copy the access token that is shown in the console screen.

  2. From the [web ui](https://vault.amalgama.co/): after logging-in we should go the upper right menu and select the `Copy token` option.

#### Syncing the env files

In order to sync your environment files for `dev`, `staging` and `production` you can run the following command:

```shell
VAULT_ADDR=https://vault.amalgama.co VAULT_TOKEN=access-token env/setup-env.sh all
```

## Available Scripts

In the project directory, you can run:

### `yarn install`

To install dependencies<br />

### `npx pod-install`

To install iOS dependencies<br />. It is the same to `cd ios` && `pod install`.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn run:ios:dev`

### `yarn run:ios:staging`

### `yarn run:ios:production`

To run ios<br />

### `yarn run:android:dev`

### `yarn run:android:staging`

### `yarn run:android:production`

To run android<br />

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn linters`

To run both style and js linters<br />

### `yarn lint`

To run js linter<br />

### `yarn stylelint`

To run style linter<br />

### `yarn new:component {component name}`

To create a new component's code and test files and folders<br />

### `yarn new:providerService {service name}`

To create a new service's code and test files and folders along with it's provider<br />

### `yarn new:entity {EntityName}`

To create a new entity's code, test and factory files<br />

# Deploy beta version of the app

## Android

Creates a release of the app for the specified environment and deploys it to Firebase App Distribution. It calculates the version name of the app based in the tags included in the current branch.

For the deployment to work it's necessary to put the firebase deploy json credentials files in the `android/deploy_credentials` folder:

- **Development**: `android/deploy_credentials/dev.json`
- **Staging**: `android/deploy_credentials/staging.json`
- **Production**: `android/deploy_credentials/production.json`

### Development

Creates a development version of the app and deploys it to Firebase App Distribution

###`yarn beta:android:dev`

### Staging

Creates a staging version of the app and deploys it to Firebase App Distribution

### `yarn beta:android:staging`

### Production

Creates a production version of the app and deploys it to Firebase App Distribution

###`yarn beta:android:production`

## Push to TestFlight

It is usign the tool [Fastlane](https://fastlane.tools/) along with [Match](https://docs.fastlane.tools/actions/match/).

Make sure you have access to the [certificates repository](https://git.amalgama.co/ios/certificates).

You need to add your Apple ID on .env files.

### `APPLE_ID={apple id email}`

### Development

Creates a development version of the app and deploys it to TestFlight

### `beta:ios:dev`

### Staging

Creates a staging version of the app and deploys it to TestFlight

### `beta:ios:staging`

### Production

Creates a production version of the app and deploys it to TestFlight

### `beta:ios:production`

## Requirements

### Android

In order to sign the release apk / bundle we need to setup the keystore credentials:

1. Download the `wilco.keystore` file and place in `android/app/`.
2. Create the file `~/.gradle/gradle.properties` with the next information:
   ```
   WILCO_UPLOAD_STORE_FILE=wilco.keystore
   WILCO_UPLOAD_KEY_ALIAS=wilco
   WILCO_UPLOAD_STORE_PASSWORD=<STORE_PASSWORD>
   WILCO_UPLOAD_KEY_PASSWORD=<KEY_PASSWORD>
   ```
   Replacing the `<STORE_PASSWORD>` and `<KEY_PASSWORD>` with the correct values. You can find the link to download the keystore file and the credentials in the [Credentials document](https://docs.google.com/document/d/1n-Mk3HXoP_ANsKWhm0ihDWsDyjfUqjgKuzVQhQ6EQ0I/edit?usp=sharing).

## Generate release version

### Android

#### Generate staging release

- **Bundle**: `yarn release:android:bundle:staging`. The generated bundle can be found in `android/app/build/outputs/bundle/stagingRelease/app-release.aab`.
- **Apk**: `yarn release:android:apk:staging`. The generated apk can be found in `android/app/build/outputs/apk/staging/release/app-release.apk`.

#### Generate production release

- **Bundle**: `yarn release:android:bundle:production`. The generated bundle can be found in `android/app/build/outputs/bundle/productionRelease/app-release.aab`.
- **Apk**: `yarn release:android:apk:production`. The generated apk can be found in `android/app/build/outputs/apk/production/release/app-release.apk`.
