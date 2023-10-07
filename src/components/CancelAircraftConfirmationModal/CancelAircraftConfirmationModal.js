import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '../ConfirmationModal';
import noop from '../../helpers/noop';

const CancelAircraftConfirmationModal = ( {
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
			title: 'Keep creating',
			type: 'constructive'
		}}
		title="Cancel Aircraft Creation?"
		description="If you cancel the creation, you'll lose all the information."
	/>
);

CancelAircraftConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	confirmationButtonOptions: PropTypes.instanceOf( Object )
};

CancelAircraftConfirmationModal.defaultProps = {
	testID: 'cancelAircraftConfirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	confirmationButtonOptions: {}
};

export default CancelAircraftConfirmationModal;
