export default class CreateReport {
	constructor( { reportableService } ) {
		this.reportableService = reportableService;
	}

	async execute( { reportableId } ) {
		await this.reportableService.report( reportableId );
	}
}
