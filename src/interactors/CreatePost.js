import ExtractorMessageService from '../services/ExtractorMessageService';

export default class CreatePost {
	constructor(
		{
			postService,
			postStore,
			pilotStore,
			extractorMessageService = ExtractorMessageService.shared()
		}
	) {
		this.postService = postService;
		this.postStore = postStore;
		this.pilotStore = pilotStore;
		this.extractorMessageService = extractorMessageService;
	}

	async execute( {
		title, message, visibility, communityTags, flightParams, base64Photos
	} ) {
		const mentionsIds = this.extractorMessageService.extractMentionsIDs( message );
		const airports = this.extractorMessageService.extractLocations( message );
		const hashtags = this.extractorMessageService.extractHashtags( message );
		const post = await this.postService.createPost( {
			title,
			message,
			visibility,
			communityTags,
			mentionsIds,
			airports,
			hashtags,
			base64Photos,
			flightParams
		} );
		this.postStore.addToFront( post );
		this.pilotStore.currentPilot.setLatestFlights( post.pilot.latestFlights );
	}
}
