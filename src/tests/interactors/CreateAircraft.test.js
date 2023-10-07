import CreateAircraft from '../../interactors/CreateAircraft';
import PilotFactory from '../factories/PilotFactory';
import AircraftFactory from '../factories/AircraftFactory';
import WilcoError from '../../errors/WilcoError';
import InputError from '../../errors/InputError';
import UnknownError from '../../errors/UnknownError';

/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-try-expect */

describe( 'CreateAircraft', () => {
	let createAircraft;
	const aircraftService = { create: jest.fn() };
	const storedAircraft = AircraftFactory.build();
	const aircraftStore = { update: jest.fn( () => storedAircraft ) };
	const pilotStore = { };

	beforeEach( () => {
		jest.clearAllMocks();
		pilotStore.currentPilot = PilotFactory.build( { aircrafts: null } );
		createAircraft = new CreateAircraft( { aircraftService, aircraftStore, pilotStore } );
	} );

	describe( '@execute()', () => {
		const params = { makeAndModel: 'model' };

		it( 'creates an aircraft with the given parameters', async () => {
			await createAircraft.execute( params );
			expect( aircraftService.create ).toHaveBeenCalledWith( params );
		} );

		describe( 'when the aircraft is created successfully', () => {
			const newAircraft = AircraftFactory.build();

			beforeEach( () => {
				aircraftService.create.mockResolvedValueOnce( newAircraft );
			} );

			it( 'adds the new aircraft to the aircraft store', async () => {
				const result = await createAircraft.execute( params );
				expect( aircraftStore.update ).toHaveBeenCalledWith( result );
			} );

			it( 'adds the new aircraft to the pilot', async () => {
				await createAircraft.execute( params );
				expect( pilotStore.currentPilot.aircrafts ).toEqual( [ storedAircraft ] );
			} );

			it( 'returns the new aircraft', async () => {
				const result = await createAircraft.execute( params );
				expect( result ).toBe( newAircraft );
			} );
		} );

		describe( 'when the aircraft creation fails with an input error', () => {
			beforeEach( () => {
				aircraftService.create.mockRejectedValueOnce( new InputError() );
			} );

			it( 'throws a WilcoError', async () => {
				await expect( createAircraft.execute( params ) ).rejects.toThrow( WilcoError );
			} );

			it( 'indicates that the aircraft is repeated in the thrown error', async () => {
				try {
					await createAircraft.execute( params );
				} catch ( error ) {
					expect( error.errorName ).toEqual( 'repeated_aircraft' );
					expect( error.errorDescription ).toEqual( 'You already have an aircraft with that tail number.' );
				}
			} );
		} );

		describe( 'when the aircraft creation fails with another error', () => {
			beforeEach( () => {
				aircraftService.create.mockRejectedValueOnce( new UnknownError() );
			} );

			it( 'throws the same error', async () => {
				await expect( createAircraft.execute( params ) ).rejects.toThrow( UnknownError );
			} );
		} );
	} );
} );
