import MockRootStore from './MockRootStore';
import * as rootState from '../../providers/RootStoreProvider';

const mockUseRootStore = () => {
	const mockRootStore = new MockRootStore();

	jest.spyOn( rootState, 'useRootStore' );
	rootState.useRootStore.mockImplementation( () => mockRootStore );

	return mockRootStore;
};

export default mockUseRootStore;
