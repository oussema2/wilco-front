import noop from '../../helpers/noop';

/* eslint-disable jest/no-export */

export const itShowsRequestErrorInSnackbar = ( {
	request = noop,
	snackbarServiceMock,
	expectedMessage = '',
	beforeRequest = noop,
	afterRequest = noop
} ) => {
	it( 'shows the error message in snackbar', async () => {
		beforeRequest();
		await request();
		await afterRequest();
		expect( snackbarServiceMock.showError ).toHaveBeenCalledWith( { message: expectedMessage } );
		expect( snackbarServiceMock.showError ).toHaveBeenCalledTimes( 1 );
	} );
};
