import MobxReactForm from 'mobx-react-form';
import Form from '../../forms/Form';

describe( 'Form', () => {
	const fields = [ {
		name: 'test field 1'
	}, {
		name: 'test field 2'
	} ];

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	describe( 'constructor()', () => {
		it( 'returns a mobx-react-form', () => {
			expect( new Form( ) ).toBeInstanceOf( MobxReactForm );
		} );

		describe( 'when fields aren\'t provided', () => {
			it( 'creates a form without fields', () => {
				expect( new Form( ).size ).toBe( 0 );
			} );
		} );

		describe( 'when fields are provided', () => {
			it( 'creates a form with the provided fields', () => {
				expect( new Form( { fields } ).size ).toBe( 2 );
			} );
		} );
	} );
} );
