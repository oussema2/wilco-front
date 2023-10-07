import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useModalService } from '../providers/ModalProvider';
import { useActionSheetService } from '../providers/ActionSheetProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';
import FetchAircraftFlights from '../interactors/FetchAircraftFlights';
import EntityServiceFactory from '../services/EntityServiceFactory';
import Api from '../services/Api';
import FlightBuilder from '../builders/FlightBuilder';
import GetFlightTrack from '../interactors/GetFlightTrack';
import DeleteAircraft from '../interactors/DeleteAircraft';
import { useAnalyticsService } from '../providers/AnalyticsProvider';
import AddFlightPresenter from '../presenters/AddFlightPresenter';

const useAddFlightWireframe = ( { previousScreen } ) => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();
	const actionSheetService = useActionSheetService();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();

	useEffect( () => {
		const {
			pilotStore, authenticationStore, flightStore, aircraftStore
		} = rootStore;

		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( {
			store: pilotStore
		} );
		const api = new Api( { authenticationStore } );
		const flightBuilder = new FlightBuilder( {
			aircraftStore, flightStore
		} );
		const flightService = EntityServiceFactory.forFlights( {
			api, buildEntity: flightBuilder.build
		} );
		const aircraftService = EntityServiceFactory.forAircrafts( { api } );
		const fetchAircraftFlights = new FetchAircraftFlights( {
			service: flightService
		} );
		const getFlightTrack = new GetFlightTrack( {
			service: flightService
		} );
		const deleteAircraft = new DeleteAircraft( {
			service: aircraftService,
			pilotStore
		} );

		const presenter = new AddFlightPresenter( {
			getCurrentPilotFromStore,
			fetchAircraftFlights,
			getFlightTrack,
			deleteAircraft,
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			previousScreen,
			makeAutoObservable
		} );

		setPresenterInstance( presenter );
	}, [ rootStore ] );

	return presenterInstance;
};

export default useAddFlightWireframe;
