import Credential from '../../entities/Credential';
import CredentialFactory from '../factories/CredentialFactory';
import CredentialBuilder from '../../builders/CredentialBuilder';

describe( 'CredentialBuilder', () => {
	let builder;
	const credential = CredentialFactory.build();
	const credentialJSON = credential.toJSON();

	beforeEach( () => {
		jest.clearAllMocks();
		builder = new CredentialBuilder( );
	} );

	describe( 'build', () => {
		const buildCredential = () => builder.build( credentialJSON );

		it( 'returns a credential instance', () => {
			expect( buildCredential() ).toBeInstanceOf( Credential );
		} );
	} );
} );
