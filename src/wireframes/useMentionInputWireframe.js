import { useState } from 'react';
import { useRootStore } from '../providers/RootStoreProvider';
import MentionInputPresenter from '../presenters/MentionInput/MentionInputPresenter';
import Api from '../services/Api';
import EntityServiceFactory from '../services/EntityServiceFactory';
import FetchEntitiesFromRemote from '../interactors/FetchEntitiesFromRemote';
import GetEntitiesFromStore from '../interactors/GetEntitiesFromStore';

const useMentionInputWireframe = ( ) => {
	const rootStore = useRootStore();

	const createPresenter = () => {
		const {
			pilotStore, authenticationStore, hashtagStore
		} = rootStore;

		const api = new Api( { authenticationStore } );

		const hashtagService = EntityServiceFactory.forHashtags( { api } );
		const pilotService = EntityServiceFactory.forPilots( { api } );

		const fetchHashtagsFromRemote = new FetchEntitiesFromRemote( {
			store: hashtagStore,
			service: hashtagService
		} );

		const fetchPilotsFromRemote = new FetchEntitiesFromRemote( {
			store: pilotStore,
			service: pilotService
		} );

		const getHashtagsFromStore = new GetEntitiesFromStore( { store: hashtagStore } );
		const getPilotsFromStore = new GetEntitiesFromStore( { store: pilotStore } );

		return new MentionInputPresenter( {
			fetchHashtagsFromRemote,
			fetchPilotsFromRemote,
			getHashtagsFromStore,
			getPilotsFromStore
		} );
	};

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useMentionInputWireframe;
