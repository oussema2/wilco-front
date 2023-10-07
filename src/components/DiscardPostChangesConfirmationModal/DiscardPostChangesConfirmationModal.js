import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '../ConfirmationModal';
import noop from '../../helpers/noop';

const DiscardPostChangesConfirmationModal = ( {
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
			title: 'Keep Editing',
			type: 'constructive'
		}}
		title="Discard Changes?"
		description="If you cancel without saving, you'll lose all the changes made."
	/>
);

DiscardPostChangesConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	confirmationButtonOptions: PropTypes.instanceOf( Object )
};

DiscardPostChangesConfirmationModal.defaultProps = {
	testID: 'discardPostChangesConfirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	confirmationButtonOptions: {}
};

export default DiscardPostChangesConfirmationModal;
