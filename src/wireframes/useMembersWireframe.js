import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useSnackbarService } from '../providers/SnackbarProvider';
import { useRootStore } from '../providers/RootStoreProvider';
import GetEntitiesFromStore from '../interactors/GetEntitiesFromStore';
import Api from '../services/Api';
import MembersPresenter from '../presenters/MembersPresenter';
import EntityServiceFactory from '../services/EntityServiceFactory';
import FetchEntitiesFromRemote from '../interactors/FetchEntitiesFromRemote';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';

const useMembersWireframe = () => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const snackbarService = useSnackbarService();

	const createPresenter = () => {
		const { pilotStore, authenticationStore } = rootStore;
		const api = new Api( { authenticationStore } );

		const pilotService = EntityServiceFactory.forPilots( { api } );

		const fetchPilotsFromRemote = new FetchEntitiesFromRemote( {
			store: pilotStore,
			service: pilotService
		} );

		const getPilotsFromStore = new GetEntitiesFromStore( { store: pilotStore } );

		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );

		return new MembersPresenter( {
			fetchPilotsFromRemote,
			getPilotsFromStore,
			navigation,
			snackbarService,
			rootStore,
			getCurrentPilotFromStore,
			makeAutoObservable
		} );
	};

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useMembersWireframe;
