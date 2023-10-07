export default class DeleteEntity {
	constructor( { entityService, entityStore } ) {
		this.entityService = entityService;
		this.entityStore = entityStore;
	}

	async execute( entityId ) {
		await this.entityService.delete( entityId );
		this.entityStore.delete( entityId );
	}
}
