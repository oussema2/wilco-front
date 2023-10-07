import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import SignUpPresenter from '../presenters/SignUpPresenter';
import FetchCurrentPilotFromRemote from '../interactors/FetchCurrentPilotFromRemote';
import SignUpUser from '../interactors/SignUpUser';
import SignUpService from '../services/SignUpService';
import LogInService from '../services/LogInService';
import Api from '../services/Api';
import OAuthResponseDeserializer from '../services/OAuthResponseDeserializer';
import ApiResponseDeserializer from '../services/ApiResponseDeserializer';
import PilotBuilder from '../builders/PilotBuilder';
import EntityServiceFactory from '../services/EntityServiceFactory';
import FetchEntitiesFromRemote from '../interactors/FetchEntitiesFromRemote';
import GetEntitiesFromStore from '../interactors/GetEntitiesFromStore';
import Role from '../entities/Role';
import { useModalService } from '../providers/ModalProvider';
import { useAnalyticsService } from '../providers/AnalyticsProvider';

const useSignUpWireframe = () => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const snackbarService = useSnackbarService();
	const modalService = useModalService();
	const analyticsService = useAnalyticsService();

	useEffect( () => {
		const { authenticationStore } = rootStore;
		const api = new Api( {
			authenticationStore,
			responseDeserializerKlass: ApiResponseDeserializer
		} );
		const authApi = new Api( {
			authenticationStore,
			responseDeserializerKlass: OAuthResponseDeserializer
		} );
		const signUpService = new SignUpService( { api } );
		const pilotBuilder = new PilotBuilder( { aircraftStore: rootStore.aircraftStore } );
		const logInService = new LogInService( { api: authApi } );
		const pilotService = EntityServiceFactory.forPilots( {
			api, buildEntity: pilotBuilder.build
		} );
		const signUpUser = new SignUpUser( { signUpService, logInService } );
		const fetchPilot = new FetchCurrentPilotFromRemote( {
			store: rootStore.pilotStore,
			service: pilotService
		} );

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

		const presenter = new SignUpPresenter( {
			signUpUser,
			fetchPilot,
			snackbarService,
			navigation,
			fetchRolesFromRemote,
			getRolesFromStore,
			modalService,
			analyticsService,
			makeAutoObservable
		} );

		setPresenterInstance( presenter );
	}, [ rootStore ] );

	return presenterInstance;
};

export default useSignUpWireframe;
