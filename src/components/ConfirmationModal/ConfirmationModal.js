import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from 'react-native-elements';
import { Text, View } from 'react-native';
import { styles } from './ConfirmationModal.styles';
import { ModalGradient } from '../ModalGradient';
import { ActionSheetButton } from '../ActionSheetButton';
import noop from '../../helpers/noop';

const ConfirmationModal = ( {
	testID,
	open,
	onConfirmPress,
	onBackdropPress,
	confirmationButtonOptions,
	cancelButtonOptions,
	title,
	description,
	descriptionStyle
} ) => (
	<Overlay
		testID={testID}
		overlayStyle={styles.overlay}
		isVisible={open}
		onBackdropPress={onBackdropPress}
	>
		<ModalGradient style={styles.modal}>
			<View style={styles.textContainer}>
				<Text testID="modalTitle-Text" style={styles.title}>
					{ title }
				</Text>
				<Text testID="modalDescription-Text" style={[ styles.description, descriptionStyle ]}>
					{ description }
				</Text>
			</View>
			<ActionSheetButton onPress={onConfirmPress} {...confirmationButtonOptions} />
			<ActionSheetButton title="Cancel" onPress={onBackdropPress} {...cancelButtonOptions} />
		</ModalGradient>
	</Overlay>
);

ConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	confirmationButtonOptions: PropTypes.instanceOf( Object ),
	cancelButtonOptions: PropTypes.instanceOf( Object ),
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	descriptionStyle: PropTypes.instanceOf( Object )
};

ConfirmationModal.defaultProps = {
	testID: 'confirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	confirmationButtonOptions: {},
	cancelButtonOptions: {},
	descriptionStyle: {}
};

export default ConfirmationModal;
