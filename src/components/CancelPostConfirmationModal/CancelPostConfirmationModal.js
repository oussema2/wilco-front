import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '../ConfirmationModal';
import noop from '../../helpers/noop';

const CancelPostConfirmationModal = ( {
	testID, open, onConfirmPress, onBackdropPress, confirmationButtonOptions
} ) => (
	<ConfirmationModal
		testID={testID}
		open={open}
		onConfirmPress={onConfirmPress}
		onBackdropPress={onBackdropPress}
		confirmationButtonOptions={{
			title: 'Cancel',
			type: 'destructive',
			...confirmationButtonOptions
		}}
		cancelButtonOptions={{
			title: 'Keep posting',
			type: 'constructive'
		}}
		title="Cancel Post Creation?"
		description="If you cancel the creation, you'll lose all the information."
	/>
);

CancelPostConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	confirmationButtonOptions: PropTypes.instanceOf( Object )
};

CancelPostConfirmationModal.defaultProps = {
	testID: 'cancelPostConfirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	confirmationButtonOptions: {}
};

export default CancelPostConfirmationModal;
