import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import HelpCenterService from '../services/HelpCenterService';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';
import { useRootStore } from '../providers/RootStoreProvider';
import AuthenticatedNavigatorPresenter from '../presenters/AuthenticatedNavigatorPresenter';

const useAuthenticatedNavigatorWireframe = () => {
	const rootStore = useRootStore();
	const { pilotStore } = rootStore;
	const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );
	const helpCenterService = HelpCenterService.shared();
	const createPresenter = () => new AuthenticatedNavigatorPresenter( {
		getCurrentPilotFromStore,
		helpCenterService,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	presenter.initialize();

	return presenter;
};

export default useAuthenticatedNavigatorWireframe;
