import EntityService from './EntityService';

export default class CredentialService extends EntityService {
	async fetchAll( ) {
		const path = `${this.apiVersion}/${this.basePath}`;
		const response = await this.api.get( path );
		return {
			certificates: response.certificates
				.map( ( entityJSON ) => this.buildEntity( entityJSON ) ),
			ratings: response.ratings.map( ( entityJSON ) => this.buildEntity( entityJSON ) )
		};
	}
}
