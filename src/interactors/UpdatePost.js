import ExtractorMessageService from '../services/ExtractorMessageService';

export default class UpdatePost {
	constructor( {
		postStore, pilotStore, service, extractorMessageService = ExtractorMessageService.shared()
	} ) {
		this.postStore = postStore;
		this.pilotStore = pilotStore;
		this.service = service;
		this.extractorMessageService = extractorMessageService;
	}

	async execute( entityId, params ) {
		const airports = this.extractorMessageService.extractLocations( params.message );
		const hashtags = this.extractorMessageService.extractHashtags( params.message );
		const mentionsIDs = this.extractorMessageService.extractMentionsIDs( params.message );
		const newParams = {
			...params,
			airports,
			hashtags,
			mentionsIDs
		};
		const updatedPost = await this._updateInService( entityId, newParams );
		this._putInStore( entityId, updatedPost );
		return updatedPost;
	}

	_updateInService( entityId, params ) {
		return this.service.patch( entityId, params );
	}

	_putInStore( entityId, updatedPost ) {
		this.postStore.update( updatedPost );
		this.pilotStore.currentPilot.setLatestFlights( updatedPost.pilot.latestFlights );
	}
}
