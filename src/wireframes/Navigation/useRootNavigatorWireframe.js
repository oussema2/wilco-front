import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useRootStore } from '../../providers/RootStoreProvider';
import RootNavigatorPresenter from '../../presenters/Navigation/RootNavigatorPresenter';
import FetchCurrentPilotFromRemote from '../../interactors/FetchCurrentPilotFromRemote';
import EntityServiceFactory from '../../services/EntityServiceFactory';
import PilotBuilder from '../../builders/PilotBuilder';
import Api from '../../services/Api';
import PushNotificationsService from '../../services/PushNotificationsService';
import navigation from '../../navigation/RootNavigation';
import DeepLinkService from '../../services/DeepLinkService';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import { useAnalyticsService } from '../../providers/AnalyticsProvider';

const useRootNavigatorWireframe = () => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const rootStore = useRootStore();
	const analyticsService = useAnalyticsService();
	const { pilotStore, aircraftStore } = rootStore;

	useEffect( () => {
		const authApi = new Api( {
			authenticationStore: rootStore.authenticationStore
		} );

		const pilotBuilder = new PilotBuilder( { aircraftStore } );

		const pilotService = EntityServiceFactory.forPilots( {
			api: authApi, buildEntity: pilotBuilder.build
		} );

		const fetchPilot = new FetchCurrentPilotFromRemote( {
			store: rootStore.pilotStore,
			service: pilotService
		} );

		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );

		const pushNotificationsService = new PushNotificationsService( {
			navigation,
			notificationStore: rootStore.notificationStore,
			analyticsService
		} );

		const deepLinkService = new DeepLinkService(
			{ navigation }
		);

		const presenter = new RootNavigatorPresenter( {
			authenticationStore: rootStore.authenticationStore,
			fetchPilot,
			getCurrentPilotFromStore,
			pushNotificationsService,
			deepLinkService,
			analyticsService,
			makeAutoObservable
		} );
		setPresenterInstance( presenter );
	}, [] );

	return presenterInstance;
};

export default useRootNavigatorWireframe;
