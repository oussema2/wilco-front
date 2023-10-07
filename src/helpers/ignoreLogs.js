import { LogBox } from 'react-native';

const ignoreLogs = () => {
	LogBox.ignoreLogs( [ 'Non-serializable values were found in the navigation state' ] );
	LogBox.ignoreLogs( [ 'Setting a timer' ] );
};

export default ignoreLogs;
