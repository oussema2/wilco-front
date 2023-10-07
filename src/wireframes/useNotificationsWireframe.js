import React, { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import GetEntitiesFromStore from '../interactors/GetEntitiesFromStore';
import Api from '../services/Api';
import EntityServiceFactory from '../services/EntityServiceFactory';
import NotificationBuilder from '../builders/NotificationBuilder';
import NotificationsPresenter from '../presenters/NotificationsPresenter';
import ClearUnreadNotifications from '../interactors/ClearUnreadNotifications';
import FetchEntitiesFromRemote from '../interactors/FetchEntitiesFromRemote';
import GetNotificationsByTypeFromStore from '../interactors/GetNotificationsByTypeFromStore';
import { useAnalyticsService } from '../providers/AnalyticsProvider';

const useNotificationsWireframe = () => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const analyticsService = useAnalyticsService();

	const createPresenter = () => {
		const { notificationStore, pilotStore, authenticationStore } = rootStore;
		const api = new Api( { authenticationStore } );
		const notificationBuilder = new NotificationBuilder( { pilotStore } );

		const notificationService = EntityServiceFactory.forNotifications( {
			api, buildEntity: notificationBuilder.build
		} );

		const fetchNotificationsFromRemote = new FetchEntitiesFromRemote( {
			store: notificationStore,
			service: notificationService
		} );

		const getNotificationsFromStore = new GetEntitiesFromStore( { store: notificationStore } );

		const getNotificationsByTypeFromStore = new GetNotificationsByTypeFromStore(
			{ store: notificationStore }
		);

		const clearUnreadNotifications = new ClearUnreadNotifications( {
			store: notificationStore
		} );

		return new NotificationsPresenter( {
			fetchNotificationsFromRemote,
			getNotificationsFromStore,
			getNotificationsByTypeFromStore,
			rootStore,
			clearUnreadNotifications,
			navigation,
			analyticsService,
			makeAutoObservable
		} );
	};

	const [ presenter ] = useState( createPresenter );

	useFocusEffect(
		React.useCallback( () => {
			if ( presenter ) presenter.updateScreen();
		}, [] )
	);

	return presenter;
};

export default useNotificationsWireframe;
