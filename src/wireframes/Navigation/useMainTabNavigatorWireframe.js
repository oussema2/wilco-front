import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import MainTabNavigatorPresenter from '../../presenters/Navigation/MainTabNavigatorPresenter';
import { useRootStore } from '../../providers/RootStoreProvider';
import FetchUnreadNotificationCountFromRemote
	from '../../interactors/FetchUnreadNotificationCountFromRemote';
import GetUnreadNotificationCountFromStore
	from '../../interactors/GetUnreadNotificationCountFromStore';
import SubscribeToPushNotifications from '../../interactors/SubscribeToPushNotifications';
import PushNotificationsService from '../../services/PushNotificationsService';
import Api from '../../services/Api';
import EntityServiceFactory from '../../services/EntityServiceFactory';
import ChatService from '../../services/ChatService';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';

const useMainTabNavigatorWireframe = () => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const root = useRootStore();

	useEffect( () => {
		const { notificationStore, authenticationStore, pilotStore } = root;

		const pushNotificationsService = new PushNotificationsService();

		const api = new Api( { authenticationStore } );

		const notificationService = EntityServiceFactory.forNotifications( { api } );

		const chatService = ChatService.shared();

		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );

		const fetchUnreadNotificationCountFromRemote = new FetchUnreadNotificationCountFromRemote( {
			store: notificationStore,
			service: notificationService
		} );

		const getUnreadNotificationCountFromStore = new GetUnreadNotificationCountFromStore( {
			store: notificationStore
		} );

		const subscribeToPushNotifications = new SubscribeToPushNotifications( {
			pushNotificationsService,
			notificationService
		} );

		const presenter = new MainTabNavigatorPresenter( {
			fetchUnreadNotificationCountFromRemote,
			getUnreadNotificationCountFromStore,
			subscribeToPushNotifications,
			getCurrentPilotFromStore,
			chatService,
			makeAutoObservable
		} );

		setPresenterInstance( presenter );
		presenter.onMount();

		return () => { presenter.onUnmount(); };
	}, [ root ] );

	return presenterInstance;
};

export default useMainTabNavigatorWireframe;
