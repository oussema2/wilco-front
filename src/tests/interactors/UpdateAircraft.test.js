import UpdateAircraft from '../../interactors/UpdateAircraft';
import AircraftFactory from '../factories/AircraftFactory';
import WilcoError from '../../errors/WilcoError';
import InputError from '../../errors/InputError';
import UnknownError from '../../errors/UnknownError';

/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-try-expect */

describe( 'UpdateAircraft', () => {
	let updateAircraft;
	const storedAircraft = AircraftFactory.build();
	const store = { update: jest.fn( () => storedAircraft ) };
	const service = { patch: jest.fn() };

	beforeEach( () => {
		jest.clearAllMocks();
		updateAircraft = new UpdateAircraft( { store, service } );
	} );

	describe( '@execute()', () => {
		const aircraftId = storedAircraft.id;
		const params = { makeAndModel: 'model', tailNumber: '123ABC' };

		it( 'updates the aircraft with the given parameters', async () => {
			await updateAircraft.execute( aircraftId, params );
			expect( service.patch ).toHaveBeenCalledWith( aircraftId, params );
		} );

		describe( 'when the aircraft is updated successfully', () => {
			const updatedAircraft = AircraftFactory.build();

			beforeEach( () => {
				service.patch.mockResolvedValueOnce( updatedAircraft );
			} );

			it( 'updates the aircraft in the aircraft store', async () => {
				const result = await updateAircraft.execute( aircraftId, params );
				expect( store.update ).toHaveBeenCalledWith( result );
			} );

			it( 'returns the updated aircraft', async () => {
				const result = await updateAircraft.execute( aircraftId, params );
				expect( result ).toBe( updatedAircraft );
			} );
		} );

		describe( 'when the aircraft creation fails with an input error', () => {
			beforeEach( () => {
				service.patch.mockRejectedValueOnce( new InputError() );
			} );

			it( 'throws a WilcoError', async () => {
				await expect( updateAircraft.execute( aircraftId, params ) ).rejects.toThrow( WilcoError );
			} );

			it( 'indicates that the aircraft is repeated in the thrown error', async () => {
				try {
					await updateAircraft.execute( params );
				} catch ( error ) {
					expect( error.errorName ).toEqual( 'repeated_aircraft' );
					expect( error.errorDescription ).toEqual( 'You already have an aircraft with that tail number.' );
				}
			} );
		} );

		describe( 'when the aircraft creation fails with another error', () => {
			beforeEach( () => {
				service.patch.mockRejectedValueOnce( new UnknownError() );
			} );

			it( 'throws the same error', async () => {
				await expect( updateAircraft.execute( params ) ).rejects.toThrow( UnknownError );
			} );
		} );
	} );
} );
