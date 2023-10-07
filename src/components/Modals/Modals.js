import React from 'react';
import { observer } from 'mobx-react-lite';
import {
	DELETE_POST_CONFIRMATION_MODAL,
	DELETE_COMMENT_CONFIRMATION_MODAL,
	DELETE_AIRCRAFT_CONFIRMATION_MODAL,
	REPORT_CONFIRMATION_MODAL,
	DATE_PICKER_MODAL,
	AIRCRAFT_PICKER_MODAL,
	DISCARD_CHANGES_CONFIRMATION_MODAL,
	DISCARD_POST_CHANGES_CONFIRMATION_MODAL,
	DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL,
	CANCEL_POST_CONFIRMATION_MODAL,
	CANCEL_AIRCRAFT_CONFIRMATION_MODAL,
	VISIBILITY_PICKER_MODAL,
	LOG_OUT_CONFIRMATION_MODAL,
	DELETE_ACCOUNT_CONFIRMATION_MODAL,
	BLOCK_USER_CONFIRMATION_MODAL
} from '../../constants/modals';
import { useModalService } from '../../providers/ModalProvider';
import { DeletePostConfirmationModal } from '../DeletePostConfirmationModal';
import { DeleteCommentConfirmationModal } from '../DeleteCommentConfirmationModal';
import { DeleteAircraftConfirmationModal } from '../DeleteAircraftConfirmationModal';
import { ReportConfirmationModal } from '../ReportConfirmationModal';
import { DatePickerModal } from '../DatePickerModal';
import { DiscardChangesConfirmationModal } from '../DiscardChangesConfirmationModal';
import { DiscardPostChangesConfirmationModal } from '../DiscardPostChangesConfirmationModal';
import { DiscardPostFilterChangesConfirmationModal } from '../DiscardPostFilterChangesConfirmationModal';
import { CancelPostConfirmationModal } from '../CancelPostConfirmationModal';
import { AircraftPickerModal } from '../AircraftPickerModal';
import { VisibilityPickerModal } from '../VisibilityPickerModal';
import { CancelAircraftConfirmationModal } from '../CancelAircraftConfirmationModal';
import { LogOutConfirmationModal } from '../LogOutConfirmationModal';
import { DeleteAccountConfirmationModal } from '../DeleteAccountConfirmationModal';
import { BlockUserConfirmationModal } from '../BlockUserConfirmationModal';

const Modals = () => {
	const modalService = useModalService();

	const isOpen = ( key ) => {
		const modal = modalService.modals[ key ];
		return !!modal && modal.open;
	};

	return (
		<>
			<DeletePostConfirmationModal
				testID="modal-DeletePostConfirmationModal"
				open={isOpen( DELETE_POST_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( DELETE_POST_CONFIRMATION_MODAL )}
				{...modalService.getData( DELETE_POST_CONFIRMATION_MODAL )}
			/>
			<DeleteCommentConfirmationModal
				testID="modal-DeleteCommentConfirmationModal"
				open={isOpen( DELETE_COMMENT_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( DELETE_COMMENT_CONFIRMATION_MODAL )}
				{...modalService.getData( DELETE_COMMENT_CONFIRMATION_MODAL )}
			/>
			<DeleteAircraftConfirmationModal
				testID="modal-DeleteAircraftConfirmationModal"
				open={isOpen( DELETE_AIRCRAFT_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( DELETE_AIRCRAFT_CONFIRMATION_MODAL )}
				{...modalService.getData( DELETE_AIRCRAFT_CONFIRMATION_MODAL )}
			/>
			<ReportConfirmationModal
				testID="modal-ReportConfirmationModal"
				open={isOpen( REPORT_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( REPORT_CONFIRMATION_MODAL )}
				{...modalService.getData( REPORT_CONFIRMATION_MODAL )}
			/>
			<DiscardChangesConfirmationModal
				testID="modal-DiscardChangesConfirmationModal"
				open={isOpen( DISCARD_CHANGES_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( DISCARD_CHANGES_CONFIRMATION_MODAL )}
				{...modalService.getData( DISCARD_CHANGES_CONFIRMATION_MODAL )}
			/>
			<DiscardPostChangesConfirmationModal
				testID="modal-DiscardPostChangesConfirmationModal"
				open={isOpen( DISCARD_POST_CHANGES_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( DISCARD_POST_CHANGES_CONFIRMATION_MODAL )}
				{...modalService.getData( DISCARD_POST_CHANGES_CONFIRMATION_MODAL )}
			/>
			<DiscardPostFilterChangesConfirmationModal
				testID="modal-DiscardPostFilterChangesConfirmationModal"
				open={isOpen( DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL )}
				{...modalService.getData( DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL )}
			/>
			<CancelPostConfirmationModal
				testID="modal-CancelPostConfirmationModal"
				open={isOpen( CANCEL_POST_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( CANCEL_POST_CONFIRMATION_MODAL )}
				{...modalService.getData( CANCEL_POST_CONFIRMATION_MODAL )}
			/>
			<CancelAircraftConfirmationModal
				testID="modal-CancelAircraftConfirmationModal"
				open={isOpen( CANCEL_AIRCRAFT_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( CANCEL_AIRCRAFT_CONFIRMATION_MODAL )}
				{...modalService.getData( CANCEL_AIRCRAFT_CONFIRMATION_MODAL )}
			/>
			<DatePickerModal
				testID="modal-DatePickerModal"
				open={isOpen( DATE_PICKER_MODAL )}
				onBackdropPress={() => modalService.close( DATE_PICKER_MODAL )}
				{...modalService.getData( DATE_PICKER_MODAL )}
			/>
			<AircraftPickerModal
				testID="modal-AircraftPickerModal"
				open={isOpen( AIRCRAFT_PICKER_MODAL )}
				onBackdropPress={() => modalService.close( AIRCRAFT_PICKER_MODAL )}
				{...modalService.getData( AIRCRAFT_PICKER_MODAL )}
			/>
			<VisibilityPickerModal
				testID="modal-VisibilityPickerModal"
				open={isOpen( VISIBILITY_PICKER_MODAL )}
				onBackdropPress={() => modalService.close( VISIBILITY_PICKER_MODAL )}
				{...modalService.getData( VISIBILITY_PICKER_MODAL )}
			/>
			<LogOutConfirmationModal
				testID="modal-LogOutConfirmationModal"
				open={isOpen( LOG_OUT_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( LOG_OUT_CONFIRMATION_MODAL )}
				{...modalService.getData( LOG_OUT_CONFIRMATION_MODAL )}
			/>
			<DeleteAccountConfirmationModal
				testID="modal-DeleteAccountConfirmationModal"
				open={isOpen( DELETE_ACCOUNT_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( DELETE_ACCOUNT_CONFIRMATION_MODAL )}
				{...modalService.getData( DELETE_ACCOUNT_CONFIRMATION_MODAL )}
			/>
			<BlockUserConfirmationModal
				testID="modal-BlockUserConfirmationModal"
				open={isOpen( BLOCK_USER_CONFIRMATION_MODAL )}
				onBackdropPress={() => modalService.close( BLOCK_USER_CONFIRMATION_MODAL )}
				{...modalService.getData( BLOCK_USER_CONFIRMATION_MODAL )}
			/>
		</>
	);
};

export default observer( Modals );
