import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import PilotFactory from '../factories/PilotFactory';

describe( 'GetCurrentPilotFromStore', () => {
	describe( '@execute()', () => {
		it( 'returns the current pilot from the store', () => {
			const pilot = PilotFactory.build();
			const store = {
				currentPilot: pilot
			};

			const interactor = new GetCurrentPilotFromStore( { store } );

			expect( interactor.execute() ).toBe( pilot );
		} );
	} );
} );
