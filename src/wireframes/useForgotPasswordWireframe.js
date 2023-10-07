import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import ForgotPasswordPresenter from '../presenters/ForgotPasswordPresenter';
import SendPasswordResetEmailService from '../services/SendPasswordResetEmailService';
import SendPasswordResetEmail from '../interactors/SendPasswordResetEmail';

const useForgotPasswordWireframe = () => {
	const rootStore = useRootStore();
	const snackbarService = useSnackbarService();
	const navigation = useNavigation();
	const keyboard = Keyboard;
	const sendPasswordResetEmailService = new SendPasswordResetEmailService();
	const sendPasswordResetEmail = new SendPasswordResetEmail( { sendPasswordResetEmailService } );

	const createPresenter = () => new ForgotPasswordPresenter( {
		snackbarService,
		keyboard,
		navigation,
		rootStore,
		sendPasswordResetEmail,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useForgotPasswordWireframe;
