import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import PreferencesPresenter from '../presenters/PreferencesPresenter';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';
import EntityServiceFactory from '../services/EntityServiceFactory';
import Api from '../services/Api';
import UpdatePilotAirports from '../interactors/UpdatePilotAirports';
import { useModalService } from '../providers/ModalProvider';
import { useAnalyticsService } from '../providers/AnalyticsProvider';

const usePreferencesWireframe = () => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();

	const createPresenter = () => {
		const { pilotStore, authenticationStore } = rootStore;
		const api = new Api( { authenticationStore } );
		const airportService = EntityServiceFactory.forAirports( { api } );

		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );

		const updatePilotAirports = new UpdatePilotAirports(
			{ store: pilotStore, service: airportService }
		);

		return new PreferencesPresenter( {
			makeAutoObservable,
			rootStore,
			navigation,
			modalService,
			snackbarService,
			getCurrentPilotFromStore,
			updatePilotAirports,
			analyticsService
		} );
	};

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default usePreferencesWireframe;
