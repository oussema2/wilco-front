import * as actionSheetProvider from '../../providers/ModalProvider';
import MockModalService from './MockModalService';

const mockUseModalService = () => {
	const mockModalService = new MockModalService();

	jest.spyOn( actionSheetProvider, 'useModalService' );
	actionSheetProvider.useModalService.mockImplementation( () => mockModalService );

	return mockModalService;
};

export default mockUseModalService;
