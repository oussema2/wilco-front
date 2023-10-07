/* eslint-disable jest/no-export */

export const itPresentsErrorWithCustomMessages = ( { buildPresenter } ) => {
	it( 'returns the assigned custom message', () => {
		const customMessages = { for_custom_message: 'Custom message' };
		const error = { errorName: 'for_custom_message' };
		const presenter = buildPresenter( error, customMessages );
		expect( presenter.presentError() ).toEqual( 'Custom message' );
	} );
};
