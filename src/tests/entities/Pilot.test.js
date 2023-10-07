import Pilot from '../../entities/Pilot';
import PilotFactory from '../factories/PilotFactory';
import AircraftFactory from '../factories/AircraftFactory';
import PostFlightFactory from '../factories/PostFlightFactory';
import CredentialFactory from '../factories/CredentialFactory';
import RoleFactory from '../factories/RoleFactory';

describe( 'Pilot entity', () => {
	describe( '@addAircraft', () => {
		it( 'adds the aircraft', () => {
			const aircraft = AircraftFactory.build( );
			const pilot = PilotFactory.build( { aircrafts: null } );

			pilot.addAircraft( aircraft );

			expect( pilot.aircrafts ).toEqual( [ aircraft ] );
		} );
	} );

	describe( '@removeAircraft', () => {
		describe( 'when the pilot has null aircraft list', () => {
			it( 'does nothing', () => {
				const pilot = PilotFactory.build( { aircrafts: null } );
				pilot.removeAircraft( 5 );
				expect( pilot.aircrafts ).toEqual( null );
			} );
		} );

		describe( 'when the pilot does not have any aircraft', () => {
			it( 'does nothing', () => {
				const pilot = PilotFactory.build( { aircrafts: [] } );
				pilot.removeAircraft( 5 );
				expect( pilot.aircrafts ).toEqual( [] );
			} );
		} );

		describe( 'when the pilot has aircrafts', () => {
			const aircraft1 = AircraftFactory.build( { id: 4 } );
			const aircraft2 = AircraftFactory.build( { id: 6 } );
			let pilot;

			const buildPilot = ( { primaryAircraftId = null } = {} ) => {
				pilot = PilotFactory.build( {
					primaryAircraftId,
					aircrafts: [ aircraft1, aircraft2 ]
				} );
			};

			beforeEach( () => buildPilot() );

			describe( 'when the given aircraft ID is not from any aircraft', () => {
				it( 'does nothing', () => {
					pilot.removeAircraft( 5 );
					expect( pilot.aircrafts ).toEqual( [ aircraft1, aircraft2 ] );
				} );
			} );

			describe( 'when give aircraft ID is from one of the aircrafts', () => {
				it( 'removes the aircraft', () => {
					pilot.removeAircraft( aircraft1.id );
					expect( pilot.aircrafts ).toEqual( [ aircraft2 ] );
				} );

				describe( 'when the pilot had that aircraft as primary', () => {
					it( 'sets the primary aircraft ID to null', () => {
						buildPilot( { primaryAircraftId: aircraft1.id } );
						pilot.removeAircraft( aircraft1.id );
						expect( pilot.primaryAircraftId ).toBeNull();
					} );
				} );

				describe( 'when the pilot had another aircraft as primary', () => {
					it( 'does not change the primary aircraft', () => {
						buildPilot( { primaryAircraftId: aircraft2.id } );
						pilot.removeAircraft( aircraft1.id );
						expect( pilot.primaryAircraftId ).toEqual( aircraft2.id );
					} );
				} );
			} );
		} );
	} );

	describe( '@setCertificates', () => {
		describe( 'when there are no certificates', () => {
			it( 'removes previously certificates from the pilot', () => {
				const certificates = null;

				const pilot = PilotFactory.build();

				pilot.setCertificates( certificates );

				expect( pilot.certificates ).toEqual( certificates );
			} );
		} );

		describe( 'when there are certificates', () => {
			it( 'sets the certificates to the pilot', () => {
				const certificates = CredentialFactory.buildList( 4 );

				const pilot = PilotFactory.build( { certificates: null } );

				pilot.setCertificates( certificates );

				expect( pilot.certificates ).toEqual( certificates );
			} );
		} );
	} );

	describe( '@setRatings', () => {
		describe( 'when there are no ratings', () => {
			it( 'removes previously ratings from the pilot', () => {
				const ratings = null;

				const pilot = PilotFactory.build();

				pilot.setRatings( ratings );

				expect( pilot.ratings ).toEqual( ratings );
			} );
		} );

		describe( 'when there are ratings', () => {
			it( 'sets the ratings to the pilot', () => {
				const ratings = CredentialFactory.buildList( 3 );

				const pilot = PilotFactory.build( { ratings: null } );

				pilot.setRatings( ratings );

				expect( pilot.ratings ).toEqual( ratings );
			} );
		} );
	} );

	describe( '@setCommunityTags', () => {
		describe( 'when there are no community tags', () => {
			it( 'removes previously community tags from the pilot', () => {
				const communityTags = null;

				const pilot = PilotFactory.build();

				pilot.setCommunityTags( communityTags );

				expect( pilot.communityTags ).toEqual( communityTags );
			} );
		} );

		describe( 'when there are community tags', () => {
			it( 'sets the community tags to the pilot', () => {
				const communityTags = [ 'tag 1', 'tag 2' ];

				const pilot = PilotFactory.build( { communityTags: null } );

				pilot.setCommunityTags( communityTags );

				expect( pilot.communityTags ).toEqual( communityTags );
			} );
		} );
	} );

	describe( '@setRoles', () => {
		describe( 'when there are no roles', () => {
			it( 'removes previously roles from the pilot', () => {
				const roles = null;

				const pilot = PilotFactory.build();

				pilot.setRoles( roles );

				expect( pilot.roles ).toEqual( roles );
			} );
		} );

		describe( 'when there are roles', () => {
			it( 'sets the roles to the pilot', () => {
				const roles = [ 'EZE', 'MAD' ];

				const pilot = PilotFactory.build( { communityTags: null } );

				pilot.setRoles( roles );

				expect( pilot.roles ).toEqual( roles );
			} );
		} );
	} );

	describe( '@setLatestFlights', () => {
		describe( 'when there are no latest flights', () => {
			it( 'removes previously latest flights from the pilot', () => {
				const latestFlights = null;
				const pilot = PilotFactory.build();

				pilot.setLatestFlights( latestFlights );

				expect( pilot.latestFlights ).toEqual( latestFlights );
			} );
		} );

		describe( 'when there are latest flights', () => {
			it( 'sets the latest flights to the pilot', () => {
				const latestFlights = PostFlightFactory.buildList( 3 );
				const pilot = PilotFactory.build();

				pilot.setLatestFlights( latestFlights );

				expect( pilot.latestFlights ).toEqual( latestFlights );
			} );
		} );
	} );

	describe( '@setAirports', () => {
		describe( 'when there are no airports', () => {
			it( 'removes previously airports from the pilot', () => {
				const airports = null;
				const pilot = PilotFactory.build( { airports: [ 'EZE' ] } );

				pilot.setAirports( airports );

				expect( pilot.airports ).toEqual( airports );
			} );
		} );

		describe( 'when there are airports', () => {
			it( 'sets the airports to the pilot', () => {
				const airports = [ 'EZE', 'MAD' ];
				const pilot = PilotFactory.build();

				pilot.setAirports( airports );

				expect( pilot.airports ).toEqual( airports );
			} );
		} );
	} );

	describe( '@profilePictureSource', () => {
		describe( 'when it has a profile picture url', () => {
			it( 'returns the picture source', () => {
				const pilot = PilotFactory.build();
				expect( pilot.profilePictureSource ).toEqual( { uri: pilot.profilePictureUrl } );
			} );
		} );

		describe( 'when it does not have a profile picture url', () => {
			it( 'returns null', () => {
				const pilot = PilotFactory.build( { profilePictureUrl: null } );
				expect( pilot.profilePictureSource ).toBeNull();
			} );
		} );
	} );

	describe( '@profilePictureThumbnailSource', () => {
		describe( 'when it has a profile picture thumbnail url', () => {
			it( 'returns the picture source', () => {
				const pilot = PilotFactory.build();
				expect( pilot.profilePictureThumbnailSource )
					.toEqual( { uri: pilot.profilePictureThumbnailUrl } );
			} );
		} );

		describe( 'when it does not have a profile picture thumbnail url', () => {
			it( 'returns null', () => {
				const pilot = PilotFactory.build( { profilePictureThumbnailUrl: null } );
				expect( pilot.profilePictureThumbnailSource ).toBeNull();
			} );
		} );
	} );

	describe( '@primaryAircraft', () => {
		describe( 'when there\'s no aircrafts', () => {
			it( 'returns null', () => {
				const pilot = PilotFactory.build( { primaryAircraftId: null, aircrafts: null } );
				expect( pilot.primaryAircraft ).toBeNull();
			} );
		} );

		describe( 'when there\'s no primary aircraft', () => {
			it( 'returns null', () => {
				const pilot = PilotFactory.build( { primaryAircraftId: null } );
				expect( pilot.primaryAircraft ).toBeNull();
			} );
		} );

		describe( 'when there\'s a primary aircraft', () => {
			it( 'returns the primary aircraft', () => {
				const aircrafts = AircraftFactory.buildList( 3 );
				const pilot = PilotFactory.build( {
					aircrafts,
					primaryAircraftId: aircrafts[ 1 ].id
				} );

				expect( pilot.primaryAircraft ).toBe( aircrafts[ 1 ] );
			} );
		} );
	} );

	describe( 'fromJSON', () => {
		const aircraftsJSON = [
			{
				id: 14,
				make_and_model: 'Cessna 123',
				tail_number: '123ABC',
				picture_url: 'sample_picture_1',
				picture_thumbnail_url: 'sample_picture_thumbnail_1'
			},
			{
				id: 17,
				make_and_model: 'Piper 456',
				tail_number: '321XYZ',
				picture_url: 'sample_picture_2',
				picture_thumbnail_url: 'sample_picture_thumbnail_2'
			}
		];

		const postFlightsJSON = [ {
			id: 69,
			to: 'KHPN',
			from: 'KFRG',
			departure_time: '2021-08-19T18:54:47.000Z',
			arrival_time: '2021-08-19T19:12:26.000Z',
			max_speed: null,
			max_altitude: null,
			distance: null,
			duration: 18,
			aircraft: aircraftsJSON[ 0 ],
			track_url: 'https://wilco-api-dev.tuvi.amalgama.co/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWtCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bc4f1d7314ddef3385c572a44da0e4db476e22d3/track222'
		} ];

		const certificatesJSON = [ {
			id: 1,
			name: 'Certificate 1',
			custom: false
		} ];

		const ratingsJSON = [ {
			id: 5,
			name: 'Rating 5',
			custom: false
		} ];

		const rolesJSON = [ {
			id: 1,
			name: 'ROLE 1',
			custom: false
		} ];

		const communityTagsJSON = [ 'tag 1', 'tag X' ];
		const airportsJSON = [ 'EZE', 'MAD' ];

		const pilotJSON = {
			id: 1,
			first_name: 'Wilco',
			last_name: 'Test',
			user: { email: 'mail@test.com' },
			description: 'test description',
			home_airport: 'AEP',
			profile_picture_url: 'http://picture',
			profile_picture_thumbnail_url: 'http://picture_thumbnail',
			primary_aircraft_id: 14,
			aircrafts: aircraftsJSON,
			latest_flights: postFlightsJSON,
			certificates: certificatesJSON,
			ratings: ratingsJSON,
			community_tags: communityTagsJSON,
			airports: airportsJSON,
			roles: rolesJSON,
			total_hours: '3',
			intercom_ios_hasheable: 'intercom-ios-hash',
			intercom_android_hasheable: 'intercom-android-hash',
			cometchat_uid: 'dev1',
			cometchat_auth_token: 'cometchat-auth-token'
		};

		const pilot = Pilot.fromJSON( pilotJSON );

		it( 'creates the pilot with the correct properties', () => {
			expect( pilot.id ).toEqual( 1 );
			expect( pilot.firstName ).toEqual( 'Wilco' );
			expect( pilot.lastName ).toEqual( 'Test' );
			expect( pilot.email ).toEqual( 'mail@test.com' );
			expect( pilot.description ).toEqual( 'test description' );
			expect( pilot.homeAirport ).toEqual( 'AEP' );
			expect( pilot.profilePictureUrl ).toEqual( 'http://picture' );
			expect( pilot.profilePictureThumbnailUrl ).toEqual( 'http://picture_thumbnail' );
			expect( pilot.primaryAircraftId ).toEqual( 14 );
			expect( pilot.aircrafts.length ).toEqual( 2 );
			expect( pilot.latestFlights.length ).toEqual( 1 );
			expect( pilot.certificates.length ).toEqual( 1 );
			expect( pilot.ratings.length ).toEqual( 1 );
			expect( pilot.aircrafts[ 0 ].id ).toEqual( 14 );
			expect( pilot.aircrafts[ 0 ].makeAndModel ).toEqual( 'Cessna 123' );
			expect( pilot.aircrafts[ 0 ].tailNumber ).toEqual( '123ABC' );
			expect( pilot.aircrafts[ 0 ].pictureUrl ).toEqual( 'sample_picture_1' );
			expect( pilot.aircrafts[ 0 ].pictureThumbnailUrl ).toEqual( 'sample_picture_thumbnail_1' );
			expect( pilot.aircrafts[ 1 ].id ).toEqual( 17 );
			expect( pilot.aircrafts[ 1 ].makeAndModel ).toEqual( 'Piper 456' );
			expect( pilot.aircrafts[ 1 ].tailNumber ).toEqual( '321XYZ' );
			expect( pilot.aircrafts[ 1 ].pictureUrl ).toEqual( 'sample_picture_2' );
			expect( pilot.aircrafts[ 1 ].pictureThumbnailUrl ).toEqual( 'sample_picture_thumbnail_2' );
			expect( pilot.certificates[ 0 ].id ).toEqual( 1 );
			expect( pilot.ratings[ 0 ].id ).toEqual( 5 );
			expect( pilot.roles[ 0 ].id ).toEqual( 1 );
			expect( pilot.roles[ 0 ].name ).toEqual( 'ROLE 1' );
			expect( pilot.roles[ 0 ].custom ).toEqual( false );
			expect( pilot.communityTags[ 0 ] ).toEqual( 'tag 1' );
			expect( pilot.communityTags[ 1 ] ).toEqual( 'tag X' );
			expect( pilot.airports[ 0 ] ).toEqual( 'EZE' );
			expect( pilot.airports[ 1 ] ).toEqual( 'MAD' );
			expect( pilot.intercomIOSHash ).toEqual( 'intercom-ios-hash' );
			expect( pilot.intercomAndroidHash ).toEqual( 'intercom-android-hash' );
			expect( pilot.cometchatUid ).toEqual( 'dev1' );
			expect( pilot.cometchatAuthToken ).toEqual( 'cometchat-auth-token' );
		} );

		describe( 'when the pilot JSON has no aircrafts', () => {
			const pilotJSONWithoutAircrafts = {
				...pilotJSON, latest_flights: [], aircrafts: [], primary_aircraft_id: null
			};

			it( 'creates the pilot with the correct properties and without aircrafts', () => {
				const pilotWithoutAircrafts = Pilot.fromJSON( pilotJSONWithoutAircrafts );
				expect( pilotWithoutAircrafts.aircrafts ).toEqual( [] );
			} );
		} );
	} );

	describe( 'toJSON', () => {
		const aircrafts = [
			AircraftFactory.build(),
			AircraftFactory.build()
		];

		const latestFlights = [
			PostFlightFactory.build()
		];

		const certificates = [
			CredentialFactory.build()
		];

		const ratings = [
			CredentialFactory.build()
		];

		const roles = [
			RoleFactory.build()
		];

		const communityTags = [ 'tag 1', 'tag 2' ];
		const airports = [ 'EZE', 'MAD' ];

		const pilot = PilotFactory.build( {
			aircrafts, latestFlights, certificates, ratings, communityTags, roles, airports
		} );
		const json = pilot.toJSON();

		it( 'returns the pilot\'s json', () => {
			expect( json ).toEqual( {
				id: pilot.id,
				first_name: pilot.firstName,
				last_name: pilot.lastName,
				user: { email: pilot.email },
				description: pilot.description,
				home_airport: pilot.homeAirport,
				profile_picture_url: pilot.profilePictureUrl,
				profile_picture_thumbnail_url: pilot.profilePictureThumbnailUrl,
				primary_aircraft_id: pilot.primaryAircraftId,
				intercom_ios_hasheable: pilot.intercomIOSHash,
				intercom_android_hasheable: pilot.intercomAndroidHash,
				cometchat_uid: pilot.cometchatUid,
				cometchat_auth_token: pilot.cometchatAuthToken,
				aircrafts: [
					{
						id: aircrafts[ 0 ].id,
						make_and_model: aircrafts[ 0 ].makeAndModel,
						tail_number: aircrafts[ 0 ].tailNumber,
						picture_url: aircrafts[ 0 ].pictureUrl,
						picture_thumbnail_url: aircrafts[ 0 ].pictureThumbnailUrl,
						flights: []
					},
					{
						id: aircrafts[ 1 ].id,
						make_and_model: aircrafts[ 1 ].makeAndModel,
						tail_number: aircrafts[ 1 ].tailNumber,
						picture_url: aircrafts[ 1 ].pictureUrl,
						picture_thumbnail_url: aircrafts[ 1 ].pictureThumbnailUrl,
						flights: []
					}
				],
				latest_flights: [ {
					id: latestFlights[ 0 ].id,
					to: latestFlights[ 0 ].to,
					from: latestFlights[ 0 ].from,
					departure_time: latestFlights[ 0 ].departureTime,
					arrival_time: latestFlights[ 0 ].arrivalTime,
					max_speed: latestFlights[ 0 ].maxSpeed,
					max_altitude: latestFlights[ 0 ].maxAltitude,
					distance: latestFlights[ 0 ].distance,
					duration: latestFlights[ 0 ].duration,
					aircraft: {
						id: latestFlights[ 0 ].aircraft.id,
						make_and_model: latestFlights[ 0 ].aircraft.makeAndModel,
						tail_number: latestFlights[ 0 ].aircraft.tailNumber,
						picture_url: latestFlights[ 0 ].aircraft.pictureUrl,
						picture_thumbnail_url: latestFlights[ 0 ].aircraft.pictureThumbnailUrl,
						flights: []
					},
					track_url: latestFlights[ 0 ].trackUrl
				} ],
				certificates: [ {
					id: certificates[ 0 ].id,
					name: certificates[ 0 ].name,
					custom: certificates[ 0 ].custom
				} ],
				ratings: [ {
					id: ratings[ 0 ].id,
					name: ratings[ 0 ].name,
					custom: ratings[ 0 ].custom
				} ],
				community_tags: [ communityTags[ 0 ], communityTags[ 1 ] ],
				airports: [ airports[ 0 ], airports[ 1 ] ],
				roles: [ {
					id: roles[ 0 ].id,
					name: roles[ 0 ].name,
					custom: roles[ 0 ].custom
				} ],
				total_hours: pilot.totalHours
			} );
		} );

		describe( 'when the pilot has no aircrafts', () => {
			const pilotWithoutAircrafts = PilotFactory.build( { aircrafts } );

			it( 'returns the pilot\'s json without aircrafts', () => {
				expect( pilotWithoutAircrafts.toJSON.aircrafts ).toBeUndefined();
			} );
		} );
	} );

	describe( '@name', () => {
		const pilot = PilotFactory.build();

		it( 'returns the name', () => {
			expect( pilot.name ).toEqual( `${pilot.firstName} ${pilot.lastName}` );
		} );
	} );

	describe( '@hasTotalHours', () => {
		const pilot = PilotFactory.build();

		describe( 'when the pilot has not defined their total hours', () => {
			it( 'returns false', () => {
				pilot.totalHours = '';

				expect( pilot.hasTotalHours ).toEqual( false );
			} );
		} );

		describe( 'when the pilot has defined their total hours', () => {
			it( 'returns true', () => {
				pilot.totalHours = '11 hours';

				expect( pilot.hasTotalHours ).toEqual( true );
			} );
		} );
	} );
} );
