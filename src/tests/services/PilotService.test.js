import PilotService from '../../services/PilotService';
import EntityServiceFactory from '../../services/EntityServiceFactory';
import Pilot from '../../entities/Pilot';
import PilotFactory from '../factories/PilotFactory';

describe( 'PilotService', () => {
	const api = { patch: jest.fn(), get: jest.fn(), post: jest.fn() };
	const buildEntity = jest.fn();
	const basePath = 'pilot';
	let service;

	const pilotService = new PilotService( { api, buildEntity, basePath } );

	beforeEach( () => {
		api.patch.mockClear();
		api.get.mockClear();
		api.post.mockClear();
	} );

	describe( '@patch', () => {
		const pilotId = 4;
		const params = {
			firstName: 'first name',
			lastName: 'last name',
			description: 'description',
			homeAirport: 'SAEZ',
			primaryAircraftId: 7,
			profilePictureBase64: '/base/64',
			certificates: [ 5 ],
			customCertificates: [ 'custom certificate 1', 'custom certificate 2' ],
			ratings: [ 1 ],
			customRatings: [ 'custom rating 1', 'custom rating 2' ],
			communityTags: [ 'tag 1', 'tag 2' ],
			rolesIDs: [ 1, 2 ],
			customRoles: [ 'Role Test 1', 'Role test 2' ],
			totalHours: '4'
		};

		it( 'serializes the provided parameters', async () => {
			await pilotService.patch( pilotId, params );

			expect( api.patch ).toHaveBeenCalledWith(
				`1/pilot/${pilotId}`,
				{
					pilot: {
						first_name: params.firstName,
						last_name: params.lastName,
						description: params.description,
						home_airport: params.homeAirport,
						primary_aircraft_id: params.primaryAircraftId,
						profile_picture_base64: params.profilePictureBase64,
						certificate_ids: params.certificates,
						custom_certificates: params.customCertificates,
						rating_ids: params.ratings,
						custom_ratings: params.customRatings,
						community_tags: params.communityTags,
						roles: params.rolesIDs,
						custom_roles: params.customRoles,
						total_hours: params.totalHours
					}
				} );
		} );
	} );

	describe( '@fetchAll()', () => {
		service = EntityServiceFactory.forPilots( {
			api, buildEntity: Pilot.build
		} );

		const expectedUrl = '1/pilots?page=1&per_page=999999';
		it( 'fetches all the pilots', () => {
			service.fetchAll();
			expect( api.get ).toHaveBeenCalledWith( expectedUrl );
		} );

		it( 'returns all the pilots', async () => {
			const pilots = PilotFactory.buildList( 2 );
			api.get.mockReturnValueOnce( pilots.map( ( pilot ) => pilot.toJSON() ) );
			const postsResponse = await service.fetchAll();
			expect( postsResponse.entities ).toEqual( pilots );
		} );
	} );

	describe( '@blockUser()', () => {
		const pilotId = 4;

		service = EntityServiceFactory.forPilots( {
			api, buildEntity: Pilot.build
		} );

		const expectedUrl = `1/pilots/${pilotId}/block`;
		it( 'blocks to the user', () => {
			service.blockUser( pilotId );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl );
		} );
	} );

	describe( '@reportUser()', () => {
		const reportedPilotId = 10;

		service = EntityServiceFactory.forPilots( {
			api, buildEntity: Pilot.build
		} );

		const expectedUrl = `1/pilots/${reportedPilotId}/reports`;
		const attributes = {
			reason: 'spam',
			details: 'text',
			reported_pilot_id: reportedPilotId,
			reporter_pilot_id: 1
		};

		it( 'reports to the user', () => {
			service.reportUser( attributes );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl, attributes );
		} );
	} );
} );
