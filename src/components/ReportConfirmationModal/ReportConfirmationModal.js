import React from 'react';
import PropTypes from 'prop-types';
import { ConfirmationModal } from '../ConfirmationModal';
import noop from '../../helpers/noop';

const ReportConfirmationModal = ( {
	testID, open, onConfirmPress, onBackdropPress, reportableName
} ) => (
	<ConfirmationModal
		testID={testID}
		open={open}
		onConfirmPress={onConfirmPress}
		onBackdropPress={onBackdropPress}
		confirmationButtonOptions={{
			title: 'Report',
			type: 'destructive'
		}}
		title={`Report ${reportableName}?`}
		description={`You’ll report this ${reportableName?.toLowerCase()} in order for an admin to check it.`}
	/>
);

ReportConfirmationModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onConfirmPress: PropTypes.func,
	onBackdropPress: PropTypes.func,
	reportableName: PropTypes.string
};

ReportConfirmationModal.defaultProps = {
	testID: 'reportConfirmationModal-Component',
	open: false,
	onConfirmPress: noop,
	onBackdropPress: noop,
	reportableName: 'Post'
};

export default ReportConfirmationModal;
