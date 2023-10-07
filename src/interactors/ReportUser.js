export default class ReportUser {
	constructor( { pilotService } ) {
		this.pilotService = pilotService;
	}

	execute( { attributes } ) {
		return this
			.pilotService
			.reportUser( attributes );
	}
}
