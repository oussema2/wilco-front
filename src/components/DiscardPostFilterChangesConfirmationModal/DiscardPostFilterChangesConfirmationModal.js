import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '../ConfirmationModal';
import noop from '../../helpers/noop';

const DiscardPostFilterChangesConfirmationModal = ( {
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
		description="To avoid losing the changes made, please apply them before going back."
	/>
);

DiscardPostFilterChangesConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	confirmationButtonOptions: PropTypes.instanceOf( Object )
};

DiscardPostFilterChangesConfirmationModal.defaultProps = {
	testID: 'discardPostFilterChangesConfirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	confirmationButtonOptions: {}
};

export default DiscardPostFilterChangesConfirmationModal;
