import SubclassResponsibilityError from '../../errors/SubclassResponsibilityError';

describe( 'SubclassResponsibilityError', () => {
	describe( 'constructor()', () => {
		it( 'sets SubclassResponsibilityError as the name', () => {
			const error = new SubclassResponsibilityError();
			expect( error.name ).toBe( 'SubclassResponsibilityError' );
		} );

		it( 'sets the correct message', () => {
			const error = new SubclassResponsibilityError();
			expect( error.message ).toBe( 'Subclass responsibility' );
		} );
	} );
} );
