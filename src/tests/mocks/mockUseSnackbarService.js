import * as snackbarProvider from '../../providers/SnackbarProvider';
import MockSnackbarService from './MockSnackbarService';

const mockUseSnackbarService = ( { service = new MockSnackbarService() } = {} ) => {
	const mockSnackbarService = service;

	jest.spyOn( snackbarProvider, 'useSnackbarService' );
	snackbarProvider.useSnackbarService.mockImplementation( () => mockSnackbarService );

	return mockSnackbarService;
};

export default mockUseSnackbarService;
