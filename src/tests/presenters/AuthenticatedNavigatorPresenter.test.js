import AuthenticatedNavigatorPresenter from '../../presenters/AuthenticatedNavigatorPresenter';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import PilotStore from '../../stores/PilotStore';
import PilotFactory from '../factories/PilotFactory';

describe( 'AuthenticatedNavigatorPresenter', () => {
	const makeAutoObservable = jest.fn();
	const helpCenterService = {
		registerIdentifiedUser: jest.fn()
	};
	const pilotStore = new PilotStore();
	const pilot = PilotFactory.build();
	pilotStore.add( pilot );
	pilotStore.setCurrentPilotId( pilot.id );

	const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new AuthenticatedNavigatorPresenter( {
			helpCenterService,
			getCurrentPilotFromStore,
			makeAutoObservable
		} );
	} );

	describe( 'initialize()', () => {
		it( 'calls to registerIdentifiedUser', () => {
			presenter.initialize();
			expect( helpCenterService.registerIdentifiedUser )
				.toHaveBeenCalledWith( getCurrentPilotFromStore.execute() );
		} );
	} );
} );
