import { makeAutoObservable } from 'mobx';
import MentionInputState from './State/MentionInputState';
import NullMentionInputState from './State/NullMentionInputState';

export default class MentionInputPresenter {
	constructor( {
		fetchHashtagsFromRemote,
		fetchPilotsFromRemote,
		getHashtagsFromStore,
		getPilotsFromStore
	} ) {
		this.trigger = undefined;
		this.nullState = new NullMentionInputState();

		this.pilotMentionInputState = new MentionInputState( {
			fetchEntitiesFromRemote: fetchPilotsFromRemote,
			getEntitiesFromStore: getPilotsFromStore,
			searchKey: 'search'
		} );

		this.hashtagMentionInputState = new MentionInputState( {
			fetchEntitiesFromRemote: fetchHashtagsFromRemote,
			getEntitiesFromStore: getHashtagsFromStore,
			searchKey: 'text'
		} );

		makeAutoObservable( this );
	}

	get hasKeyword() {
		return this.pilotMentionInputState.hasKeyword || this.hashtagMentionInputState.hasKeyword;
	}
}
