// eslint-disable-next-line max-classes-per-file
import 'react-native-gesture-handler/jestSetup';
import mock from 'react-native-permissions/mock';

jest.mock( 'react-native-reanimated', () => {
	// eslint-disable-next-line global-require
	const Reanimated = require( 'react-native-reanimated/mock' );

	// The mock for `call` immediately calls the callback which is incorrect
	// So we override it with a no-op
	Reanimated.default.call = () => {};

	return Reanimated;
} );

jest.mock( 'react-native/Libraries/Animated/NativeAnimatedHelper' );

jest.mock( '@react-native-firebase/messaging', () => ( {} ) );
jest.mock( '@react-native-firebase/analytics', () => () => ( {} ) );
jest.mock( 'react-native-permissions', () => mock );
jest.mock( 'react-native-image-crop-picker', () => ( {} ) );
jest.mock( '@baronha/react-native-multiple-image-picker', () => ( {
	openPicker: jest.fn().mockImplementation( () => Promise.resolve() )
} ) );
jest.mock( 'react-native-fs', () => ( {
	mkdir: jest.fn(),
	moveFile: jest.fn(),
	copyFile: jest.fn(),
	pathForBundle: jest.fn(),
	pathForGroup: jest.fn(),
	getFSInfo: jest.fn(),
	getAllExternalFilesDirs: jest.fn(),
	unlink: jest.fn(),
	exists: jest.fn(),
	stopDownload: jest.fn(),
	resumeDownload: jest.fn(),
	isResumable: jest.fn(),
	stopUpload: jest.fn(),
	completeHandlerIOS: jest.fn(),
	readDir: jest.fn(),
	readDirAssets: jest.fn(),
	existsAssets: jest.fn(),
	readdir: jest.fn(),
	setReadable: jest.fn(),
	stat: jest.fn(),
	readFile: jest.fn(),
	read: jest.fn(),
	readFileAssets: jest.fn(),
	hash: jest.fn(),
	copyFileAssets: jest.fn(),
	copyFileAssetsIOS: jest.fn(),
	copyAssetsVideoIOS: jest.fn(),
	writeFile: jest.fn(),
	appendFile: jest.fn(),
	write: jest.fn(),
	downloadFile: jest.fn(),
	uploadFiles: jest.fn(),
	touch: jest.fn(),
	MainBundlePath: jest.fn(),
	CachesDirectoryPath: jest.fn(),
	DocumentDirectoryPath: jest.fn(),
	ExternalDirectoryPath: jest.fn(),
	ExternalStorageDirectoryPath: jest.fn(),
	TemporaryDirectoryPath: jest.fn(),
	LibraryDirectoryPath: jest.fn(),
	PicturesDirectoryPath: jest.fn()
} ) );

jest.mock( 'react-native-pager-view', () => {
	const RealComponent = jest.requireActual( 'react-native-pager-view' );
	// eslint-disable-next-line global-require,no-shadow
	const React = require( 'react' );

	return class PagerView extends React.Component {
		index = 0;

		setPage = ( page ) => {
			this.index = Math.max(
				0,
				// eslint-disable-next-line react/prop-types,react/destructuring-assignment
				Math.min( page, React.Children.count( this.props.children ) )
			);
		};

		render() {
			return (
				// eslint-disable-next-line max-len
				// eslint-disable-next-line react/destructuring-assignment,react/prop-types,react/jsx-pascal-case
				<RealComponent.default>{this.props.children}</RealComponent.default>
			);
		}
	};
} );

jest.mock( 'react-native-sound', () => {
	class SoundMock {
		// eslint-disable-next-line no-unused-vars,no-useless-constructor,no-empty-function
		constructor( path, type, callback ) {}
	}

	SoundMock.prototype.setVolume = jest.fn();
	SoundMock.prototype.setNumberOfLoops = jest.fn();
	SoundMock.prototype.getCurrentTime = jest.fn().mockImplementation( 10 );
	SoundMock.prototype.play = jest.fn();
	SoundMock.prototype.stop = jest.fn();

	SoundMock.setCategory = jest.fn();

	return SoundMock;
} );

jest.mock( '../cometchat-pro-react-native-ui-kit/CometChatWorkspace',
	() => (
		{
			CometChatConversationListWithMessages: () => 'mocked component',
			CometChatMessages: () => 'mocked component'
		} )
);

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useFocusEffect: () => ( {} ),
	useNavigation: () => ( {} )
} ) );
