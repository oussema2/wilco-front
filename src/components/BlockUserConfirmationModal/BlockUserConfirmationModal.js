import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '../ConfirmationModal';
import noop from '../../helpers/noop';
import { styles } from './BlockUserConfirmationModal.styles';

const BlockUserConfirmationModal = ( {
	testID, open, onConfirmPress, onBackdropPress, confirmationButtonOptions
} ) => (
	<ConfirmationModal
		testID={testID}
		open={open}
		onConfirmPress={onConfirmPress}
		onBackdropPress={onBackdropPress}
		confirmationButtonOptions={{
			title: 'Block',
			type: 'destructive',
			...confirmationButtonOptions
		}}
		title="Block User?"
		description={'By blocking, you’ll prevent any interaction with the user.\n There’s no chance of recovery.'}
		descriptionStyle={styles.descriptionStyle}
	/>
);

BlockUserConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	confirmationButtonOptions: PropTypes.instanceOf( Object )
};

BlockUserConfirmationModal.defaultProps = {
	testID: 'blockUserConfirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	confirmationButtonOptions: {}
};

export default BlockUserConfirmationModal;
