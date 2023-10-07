import { Text, TextInput } from 'react-native';
import { Input } from 'react-native-elements';

const setMaxFontSizeMultiplier = () => {
	const maxFontSizeMultiplier = 1.3;

	Text.defaultProps = {
		...Text.defaultProps,
		maxFontSizeMultiplier
	};

	Input.defaultProps = {
		...Input.defaultProps,
		maxFontSizeMultiplier
	};

	TextInput.defaultProps = {
		...TextInput.defaultProps,
		maxFontSizeMultiplier
	};
};

export default setMaxFontSizeMultiplier;
