import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PilotProfilePresenter from '../presenters/PilotProfilePresenter';
import { useRootStore } from '../providers/RootStoreProvider';
import GetEntityFromStore from '../interactors/GetEntityFromStore';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';
import EntityServiceFactory from '../services/EntityServiceFactory';
import Pilot from '../entities/Pilot';
import FetchEntityFromRemote from '../interactors/FetchEntityFromRemote';
import Api from '../services/Api';
import { useModalService } from '../providers/ModalProvider';
import { useActionSheetService } from '../providers/ActionSheetProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import PostBuilder from '../builders/PostBuilder';
import GetPostsByPilotFromStore from '../interactors/GetPostsByPilotFromStore';
import { useAnalyticsService } from '../providers/AnalyticsProvider';
import EntityService from '../services/EntityService';
import FetchNestedPostsFromRemote from '../interactors/FetchNestedPostsFromRemote';
import BlockUser from '../interactors/BlockUser';

const usePilotProfileWireframe = ( { pilotId } ) => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const modalService = useModalService();
	const actionSheetService = useActionSheetService();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();

	const createPresenter = () => {
		const {
			pilotStore, authenticationStore, postStore, aircraftStore, commentStore, notificationStore
		} = rootStore;
		const api = new Api( { authenticationStore } );

		const pilotService = EntityServiceFactory.forPilots( { api, buildEntity: Pilot.fromJSON } );

		const fetchPilotFromRemote = new FetchEntityFromRemote( {
			store: pilotStore, service: pilotService
		} );

		const getPilotFromStore = new GetEntityFromStore( { store: pilotStore } );
		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );

		const postBuilder = new PostBuilder( { pilotStore, aircraftStore, commentStore } );
		const postService = new EntityService( { api, buildEntity: postBuilder.build, basePath: 'posts' } );
		const fetchPostsFromRemote = new FetchNestedPostsFromRemote( {
			store: rootStore.postStore, service: postService, nestedEntityName: 'pilots'
		} );
		const getPostsFromStore = new GetPostsByPilotFromStore( { store: postStore } );

		const blockUser = new BlockUser( {
			pilotService, postStore, pilotStore, commentStore, notificationStore
		} );

		return new PilotProfilePresenter( {
			pilotId,
			navigation,
			rootStore,
			analyticsService,
			getPilotFromStore,
			getCurrentPilotFromStore,
			fetchPilotFromRemote,
			fetchPostsFromRemote,
			getPostsFromStore,
			modalService,
			actionSheetService,
			blockUser,
			snackbarService
		} );
	};

	const [ presenter ] = useState( createPresenter );

	useFocusEffect(
		React.useCallback( () => {
			if ( presenter ) presenter.refreshPresenter.onRefresh( { showLoader: false } );
		}, [] )
	);

	return presenter;
};

export default usePilotProfileWireframe;
