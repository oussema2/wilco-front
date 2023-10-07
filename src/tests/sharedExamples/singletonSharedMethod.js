/* eslint-disable jest/no-export */

export const itSingletonSharedMethod = ( Class ) => {
	const firstInstance = Class.shared();
	const secondInstance = Class.shared();
	it( 'calls the backend\'s shared method the first time', () => {
		expect( firstInstance ).toBeInstanceOf( Class );
	} );

	it( 'calls the backend\'s shared method the second time', () => {
		expect( secondInstance ).toBeInstanceOf( Class );
		expect( firstInstance ).toEqual( secondInstance );
	} );
};
