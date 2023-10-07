import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import EditAircraftPresenter from '../presenters/EditAircraftPresenter';
import Api from '../services/Api';
import EntityServiceFactory from '../services/EntityServiceFactory';
import GetEntityFromStore from '../interactors/GetEntityFromStore';
import UpdateAircraft from '../interactors/UpdateAircraft';
import { useRootStore } from '../providers/RootStoreProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import { useAnalyticsService } from '../providers/AnalyticsProvider';
import { useModalService } from '../providers/ModalProvider';

const useEditAircraftWireframe = ( { aircraftId, previousScreen } ) => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const root = useRootStore();
	const navigation = useNavigation();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();
	const modalService = useModalService();

	useEffect( () => {
		const api = new Api( { authenticationStore: root.authenticationStore } );
		const aircraftService = EntityServiceFactory.forAircrafts( { api } );

		const getAircraftFromStore = new GetEntityFromStore( { store: root.aircraftStore } );
		const updateAircraft = new UpdateAircraft( {
			store: root.aircraftStore,
			service: aircraftService
		} );

		const presenter = new EditAircraftPresenter( {
			aircraftId,
			previousScreen,
			getAircraftFromStore,
			updateAircraft,
			navigation,
			snackbarService,
			analyticsService,
			modalService,
			makeAutoObservable
		} );

		setPresenterInstance( presenter );
	}, [ root ] );

	return presenterInstance;
};

export default useEditAircraftWireframe;
