import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import AddAircraftPresenter from '../presenters/AddAircraftPresenter';
import CreateAircraft from '../interactors/CreateAircraft';
import EntityServiceFactory from '../services/EntityServiceFactory';
import Api from '../services/Api';
import { useRootStore } from '../providers/RootStoreProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import { useAnalyticsService } from '../providers/AnalyticsProvider';
import { useModalService } from '../providers/ModalProvider';

const useAddAircraftWireframe = ( { previousScreen } ) => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const root = useRootStore();
	const navigation = useNavigation();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();
	const modalService = useModalService();

	useEffect( () => {
		const api = new Api( { authenticationStore: root.authenticationStore } );

		const createAircraft = new CreateAircraft( {
			aircraftService: EntityServiceFactory.forAircrafts( { api } ),
			aircraftStore: root.aircraftStore,
			pilotStore: root.pilotStore
		} );

		const presenter = new AddAircraftPresenter( {
			navigation,
			createAircraft,
			previousScreen,
			snackbarService,
			analyticsService,
			modalService,
			makeAutoObservable
		} );

		setPresenterInstance( presenter );
	}, [ root ] );

	return presenterInstance;
};

export default useAddAircraftWireframe;
