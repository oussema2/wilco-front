import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import { useRootStore } from '../providers/RootStoreProvider';
import { useSnackbarService } from '../providers/SnackbarProvider';
import LogInPresenter from '../presenters/LogInPresenter';
import LogInUser from '../interactors/LogInUser';
import FetchCurrentPilotFromRemote from '../interactors/FetchCurrentPilotFromRemote';
import LogInService from '../services/LogInService';
import EntityServiceFactory from '../services/EntityServiceFactory';
import Api from '../services/Api';
import OAuthResponseDeserializer from '../services/OAuthResponseDeserializer';
import ApiResponseDeserializer from '../services/ApiResponseDeserializer';
import PilotBuilder from '../builders/PilotBuilder';

const useLogInWireframe = () => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const rootStore = useRootStore();
	const snackbarService = useSnackbarService();
	const navigation = useNavigation();

	useEffect( () => {
		const { authenticationStore } = rootStore;
		const authResponseDeserializerKlass = OAuthResponseDeserializer;
		const apiResponseDeserializerKlass = ApiResponseDeserializer;
		const keyboard = Keyboard;

		const authApi = new Api( {
			authenticationStore,
			responseDeserializerKlass: authResponseDeserializerKlass
		} );
		const api = new Api( {
			authenticationStore,
			responseDeserializerKlass: apiResponseDeserializerKlass
		} );
		const pilotBuilder = new PilotBuilder( { aircraftStore: rootStore.aircraftStore } );
		const logInService = new LogInService( { api: authApi } );
		const pilotService = EntityServiceFactory.forPilots( {
			api, buildEntity: pilotBuilder.build
		} );
		const logInUser = new LogInUser( { logInService } );
		const fetchPilot = new FetchCurrentPilotFromRemote( {
			store: rootStore.pilotStore,
			service: pilotService
		} );
		const presenter = new LogInPresenter( {
			logInUser, fetchPilot, snackbarService, keyboard, navigation, makeAutoObservable
		} );

		setPresenterInstance( presenter );
	}, [ rootStore ] );

	return presenterInstance;
};

export default useLogInWireframe;
