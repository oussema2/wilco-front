import EntityServiceFactory from '../../services/EntityServiceFactory';
import CredentialBuilder from '../../builders/CredentialBuilder';
import CredentialFactory from '../factories/CredentialFactory';

describe( 'CredentialService', () => {
	const api = { patch: jest.fn(), get: jest.fn() };

	describe( '@fetchAll()', () => {
		const credentialBuilder = new CredentialBuilder();

		const service = EntityServiceFactory.forCredentials( {
			api, buildEntity: credentialBuilder.build
		} );

		const expectedUrl = '1/credentials';
		it( 'fetches all the credentials', () => {
			service.fetchAll();
			expect( api.get ).toHaveBeenCalledWith( expectedUrl );
		} );

		it( 'returns all the credentials', async () => {
			const certificates = CredentialFactory.buildList( 2 );
			const ratings = CredentialFactory.buildList( 2 );
			api.get.mockReturnValueOnce( {
				certificates: certificates.map( ( credential ) => credential.toJSON() ),
				ratings: ratings.map( ( credential ) => credential.toJSON() )
			} );
			const credentialsResponse = await service.fetchAll();
			expect( credentialsResponse ).toEqual( { certificates, ratings } );
		} );
	} );
} );
