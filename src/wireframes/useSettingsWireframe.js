import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import SettingsPresenter from '../presenters/SettingsPresenter';
import { useModalService } from '../providers/ModalProvider';
import Api from '../services/Api';
import LogOutService from '../services/LogOutService';
import LogOutUser from '../interactors/LogOutUser';
import NotificationService from '../services/NotificationService';
import HelpCenterService from '../services/HelpCenterService';

const useSettingsWireframe = ( ) => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();

	const {
		authenticationStore, pilotStore, postStore, commentStore, notificationStore
	} = rootStore;
	const api = new Api( { authenticationStore } );
	const logOutService = new LogOutService( {
		api, pilotStore, postStore, commentStore, notificationStore
	} );
	const notificationService = new NotificationService( { api } );
	const helpCenterService = HelpCenterService.shared();
	const logOutUser = new LogOutUser( { logOutService, notificationService, helpCenterService } );

	const createPresenter = () => new SettingsPresenter( {
		rootStore,
		navigation,
		modalService,
		logOutUser,
		helpCenterService,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useSettingsWireframe;
