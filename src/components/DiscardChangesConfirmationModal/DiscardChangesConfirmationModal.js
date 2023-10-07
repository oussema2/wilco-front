import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '../ConfirmationModal';
import noop from '../../helpers/noop';

const DiscardChangesConfirmationModal = ( {
	testID, open, onConfirmPress, onBackdropPress, confirmationButtonOptions
} ) => (
	<ConfirmationModal
		testID={testID}
		open={open}
		onConfirmPress={onConfirmPress}
		onBackdropPress={onBackdropPress}
		confirmationButtonOptions={{
			title: 'Discard',
			type: 'destructive',
			...confirmationButtonOptions
		}}
		cancelButtonOptions={{
			title: 'Keep editing',
			type: 'constructive'
		}}
		title="Discard changes?"
		description="If you go back now, you will lose your changes."
	/>
);

DiscardChangesConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	confirmationButtonOptions: PropTypes.instanceOf( Object )
};

DiscardChangesConfirmationModal.defaultProps = {
	testID: 'discardChangesConfirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	confirmationButtonOptions: {}
};

export default DiscardChangesConfirmationModal;
