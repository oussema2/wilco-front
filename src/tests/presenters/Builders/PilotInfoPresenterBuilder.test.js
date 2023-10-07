import PilotInfoPresenter from '../../../presenters/PilotInfoPresenter';
import PilotInfoPresenterBuilder from '../../../presenters/Builders/PilotInfoPresenterBuilder';
import PostFactory from '../../factories/PostFactory';
import GetCurrentPilotFromStore from '../../../interactors/GetCurrentPilotFromStore';
import MockRootStore from '../../mocks/MockRootStore';

jest.mock( '../../../interactors/GetCurrentPilotFromStore' );

describe( 'PilotInfoPresenterBuilder', () => {
	const pilot = PostFactory.build();
	const navigation = 'navigationMock';
	const rootStore = new MockRootStore();
	const getCurrentPilotFromStore = GetCurrentPilotFromStore( { store: rootStore.pilotStore } );
	describe( 'build()', () => {
		const presenter = PilotInfoPresenterBuilder.build( {
			pilot, navigation, getCurrentPilotFromStore
		} );
		it( 'creates the PilotInfoPresenterBuilder correctly', () => {
			expect( presenter ).toBeInstanceOf( PilotInfoPresenter );
			expect( presenter.pilot ).toEqual( pilot );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.getCurrentPilotFromStore ).toEqual( getCurrentPilotFromStore );
		} );
	} );
} );
