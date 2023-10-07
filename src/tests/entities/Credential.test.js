import Role from '../../entities/Role';
import RoleFactory from '../factories/RoleFactory';

describe( 'Credential entity', () => {
	describe( 'fromJSON', () => {
		const roleJSON = {
			id: 1, name: 'CREDENTIAL 1', custom: false
		};

		const role = Role.fromJSON( roleJSON );

		it( 'creates the Credential with the correct properties', () => {
			expect( role.id ).toEqual( 1 );
			expect( role.name ).toEqual( 'CREDENTIAL 1' );
			expect( role.custom ).toEqual( false );
		} );
	} );

	describe( 'toJSON', () => {
		const role = RoleFactory.build();
		const json = role.toJSON();

		it( 'returns the Credential\'s json', () => {
			expect( json ).toEqual( {
				id: role.id,
				name: role.name,
				custom: role.custom
			} );
		} );
	} );
} );
