import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import DeleteAccountPresenter from '../presenters/DeleteAccountPresenter';
import { useModalService } from '../providers/ModalProvider';
import Api from '../services/Api';
import DeleteAccountService from '../services/DeleteAccountService';
import { useRootStore } from '../providers/RootStoreProvider';
import DeleteAccount from '../interactors/DeleteAccount';
import { useSnackbarService } from '../providers/SnackbarProvider';
import LogOutService from '../services/LogOutService';

const useDeleteAccountWireframe = ( ) => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();
	const snackbarService = useSnackbarService();

	const {
		authenticationStore, pilotStore, postStore, commentStore, notificationStore
	} = rootStore;
	const api = new Api( { authenticationStore } );
	const deleteAccountService = new DeleteAccountService( { api } );
	const logOutService = new LogOutService( {
		api, pilotStore, postStore, commentStore, notificationStore
	} );
	const deleteAccount = new DeleteAccount( { deleteAccountService, logOutService } );

	const createPresenter = () => new DeleteAccountPresenter( {
		navigation,
		modalService,
		deleteAccount,
		snackbarService,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useDeleteAccountWireframe;
