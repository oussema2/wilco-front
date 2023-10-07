import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '../ConfirmationModal';
import noop from '../../helpers/noop';

const LogOutConfirmationModal = ( {
	testID, open, onConfirmPress, onBackdropPress, confirmationButtonOptions
} ) => (
	<ConfirmationModal
		testID={testID}
		open={open}
		onConfirmPress={onConfirmPress}
		onBackdropPress={onBackdropPress}
		confirmationButtonOptions={{
			title: 'Yes',
			type: 'destructive',
			...confirmationButtonOptions
		}}
		title="Log Out?"
		description="Are you sure to leave Wilco?"
	/>
);

LogOutConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	confirmationButtonOptions: PropTypes.instanceOf( Object )
};

LogOutConfirmationModal.defaultProps = {
	testID: 'deleteAircraftConfirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	confirmationButtonOptions: {}
};

export default LogOutConfirmationModal;
