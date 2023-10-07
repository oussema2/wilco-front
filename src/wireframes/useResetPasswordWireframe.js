import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import ResetPasswordPresenter from '../presenters/ResetPasswordPresenter';
import ConfirmPasswordResetService from '../services/ConfirmPasswordResetService';
import ConfirmPasswordReset from '../interactors/ConfirmPasswordReset';

const useResetPasswordWireframe = ( { oobCode } ) => {
	const rootStore = useRootStore();
	const snackbarService = useSnackbarService();
	const navigation = useNavigation();
	const keyboard = Keyboard;
	const confirmPasswordResetService = new ConfirmPasswordResetService();
	const confirmPasswordReset = new ConfirmPasswordReset( { confirmPasswordResetService } );

	const createPresenter = () => new ResetPasswordPresenter( {
		snackbarService,
		keyboard,
		navigation,
		rootStore,
		confirmPasswordReset,
		oobCode,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useResetPasswordWireframe;
