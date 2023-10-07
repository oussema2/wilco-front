import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useActionSheetService } from '../providers/ActionSheetProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import { useAnalyticsService } from '../providers/AnalyticsProvider';
import GetCurrentPilotFromStore from '../interactors/GetCurrentPilotFromStore';
import EditPilotProfilePresenter from '../presenters/EditPilotProfilePresenter';
import { useModalService } from '../providers/ModalProvider';
import EntityServiceFactory from '../services/EntityServiceFactory';
import Api from '../services/Api';
import Pilot from '../entities/Pilot';
import DeleteAircraft from '../interactors/DeleteAircraft';
import CredentialBuilder from '../builders/CredentialBuilder';
import FetchCredentialsFromRemote from '../interactors/FetchCredentialsFromRemote';
import UpdatePilot from '../interactors/UpdatePilot';
import FetchEntitiesFromRemote from '../interactors/FetchEntitiesFromRemote';
import CommunityTag from '../entities/CommunityTag';
import GetEntitiesFromStore from '../interactors/GetEntitiesFromStore';
import Role from '../entities/Role';

const useEditPilotProfileWireframe = ( ) => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const navigation = useNavigation();
	const rootStore = useRootStore();
	const modalService = useModalService();
	const actionSheetService = useActionSheetService();
	const snackbarService = useSnackbarService();
	const analyticsService = useAnalyticsService();

	useEffect( () => {
		const { pilotStore, authenticationStore, communityTagStore } = rootStore;
		const api = new Api( { authenticationStore } );

		const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );

		const pilotService = EntityServiceFactory.forPilots( { api, buildEntity: Pilot.fromJSON } );
		const communityTagService = EntityServiceFactory.forTags( {
			api,
			buildEntity: CommunityTag.fromJSON
		} );

		const aircraftService = EntityServiceFactory.forAircrafts( { api } );
		const updatePilot = new UpdatePilot( { store: pilotStore, service: pilotService } );
		const deleteAircraft = new DeleteAircraft( { service: aircraftService, pilotStore } );

		const credentialBuilder = new CredentialBuilder();
		const credentialService = EntityServiceFactory.forCredentials( {
			api,
			buildEntity: credentialBuilder.build
		} );
		const fetchCredentialsFromRemote = new FetchCredentialsFromRemote( {
			certificateStore: rootStore.certificateStore,
			ratingStore: rootStore.ratingStore,
			service: credentialService
		} );

		const fetchCommunityTagsFromRemote = new FetchEntitiesFromRemote( {
			store: communityTagStore,
			service: communityTagService
		} );

		const getCommunityTagsFromStore = new GetEntitiesFromStore( { store: communityTagStore } );

		const roleService = EntityServiceFactory.forRoles( {
			api,
			buildEntity: Role.fromJSON
		} );

		const fetchRolesFromRemote = new FetchEntitiesFromRemote( {
			store: rootStore.roleStore,
			service: roleService
		} );

		const getRolesFromStore = new GetEntitiesFromStore(
			{ store: rootStore.roleStore } );

		const presenter = new EditPilotProfilePresenter( {
			navigation,
			modalService,
			getCurrentPilotFromStore,
			updatePilot,
			deleteAircraft,
			actionSheetService,
			snackbarService,
			analyticsService,
			fetchCredentialsFromRemote,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			fetchRolesFromRemote,
			getRolesFromStore,
			makeAutoObservable
		} );

		setPresenterInstance( presenter );

		return () => { presenter.onUnmount(); };
	}, [ rootStore ] );

	return presenterInstance;
};

export default useEditPilotProfileWireframe;
