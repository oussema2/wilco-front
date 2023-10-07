import { useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Api from '../services/Api';
import { useRootStore } from '../providers/RootStoreProvider';

import EntityServiceFactory from '../services/EntityServiceFactory';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';
import ReportUser from '../interactors/ReportUser';
import { useSnackbarService } from '../providers/SnackbarProvider';
import AlertMessagesService from '../services/AlertMessagesService';

import ReportUserPresenter from '../presenters/ReportUserPresenter';
import Pilot from '../entities/Pilot';

const useReportUserWireframe = () => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const rootStore = useRootStore();
	const { pilotStore, authenticationStore } = rootStore;
	const api = new Api( { authenticationStore } );
	const navigation = useNavigation();
	const snackbarService = useSnackbarService();

	useEffect( () => {
		const getCurrentPilot = new GetCurrentPilotFromStore( { store: pilotStore } );
		const pilotService = EntityServiceFactory.forPilots( { api, buildEntity: Pilot.fromJSON } );
		const reportUser = new ReportUser( { pilotService } );
		const alertMessagesService = AlertMessagesService.shared();

		const presenter = new ReportUserPresenter( {
			alertMessagesService,
			snackbarService,
			getCurrentPilot,
			reportUser,
			navigationService: navigation
		} );

		setPresenterInstance( presenter );
	}, [] );

	useFocusEffect(
		useCallback( () => {
			BackHandler.addEventListener( 'hardwareBackPress', presenterInstance?.onCrossPressed );

			return () => BackHandler.removeEventListener( 'hardwareBackPress', presenterInstance?.onCrossPressed );
		}, [ presenterInstance ] )
	);

	return presenterInstance;
};

export default useReportUserWireframe;
