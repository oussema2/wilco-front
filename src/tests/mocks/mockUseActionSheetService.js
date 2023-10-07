import * as actionSheetProvider from '../../providers/ActionSheetProvider';
import MockActionSheetService from './MockActionSheetService';

const mockUseActionSheetService = ( { service = new MockActionSheetService() } = {} ) => {
	const mockActionSheetService = service;

	jest.spyOn( actionSheetProvider, 'useActionSheetService' );
	actionSheetProvider.useActionSheetService.mockImplementation( () => mockActionSheetService );

	return mockActionSheetService;
};

export default mockUseActionSheetService;
