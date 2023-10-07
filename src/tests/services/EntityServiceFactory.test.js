import EntityServiceFactory from '../../services/EntityServiceFactory';
import Pilot from '../../entities/Pilot';
import CommentService from '../../services/CommentService';
import Aircraft from '../../entities/Aircraft';
import FlightService from '../../services/FlightService';
import NotificationService from '../../services/NotificationService';
import AirportService from '../../services/AirportService';
import CredentialService from '../../services/CredentialService';
import EntityService from '../../services/EntityService';

describe( 'EntityServiceFactory', () => {
	const api = jest.fn();
	const buildEntity = jest.fn();

	describe( '@forComments', () => {
		it( 'creates the comments service', () => {
			const service = EntityServiceFactory.forComments( { api, buildEntity } );

			expect( service ).toBeInstanceOf( CommentService );
			expect( service ).toEqual( {
				api,
				basePath: 'comments',
				buildEntity,
				apiVersion: '1'
			} );
		} );
	} );

	describe( '@forFlights', () => {
		it( 'creates the flights service', () => {
			const service = EntityServiceFactory.forFlights( { api, buildEntity } );

			expect( service ).toBeInstanceOf( FlightService );
			expect( service ).toEqual( {
				api,
				basePath: 'flights',
				buildEntity,
				apiVersion: '1'
			} );
		} );
	} );

	describe( '@forPilots', () => {
		it( 'creates the pilots service', () => {
			const service = EntityServiceFactory.forPilots( { api } );

			expect( service ).toEqual( {
				api,
				basePath: 'pilots',
				buildEntity: Pilot.fromJSON,
				apiVersion: '1'
			} );
		} );
	} );

	describe( '@forAircrafts', () => {
		it( 'creates the aircrafts service', () => {
			const service = EntityServiceFactory.forAircrafts( { api } );

			expect( service ).toEqual( {
				api,
				basePath: 'pilots/me/aircrafts',
				buildEntity: Aircraft.fromJSON,
				apiVersion: '1'
			} );
		} );
	} );

	describe( '@forNotifications', () => {
		it( 'creates the notifications service', () => {
			const service = EntityServiceFactory.forNotifications( { api, buildEntity } );

			expect( service ).toBeInstanceOf( NotificationService );
			expect( service ).toEqual( {
				api,
				basePath: 'pilots/me/notifications',
				buildEntity,
				apiVersion: '1'
			} );
		} );
	} );

	describe( '@forCredentials', () => {
		it( 'creates the credentials service', () => {
			const service = EntityServiceFactory.forCredentials( { api, buildEntity } );

			expect( service ).toBeInstanceOf( CredentialService );
			expect( service ).toEqual( {
				api,
				basePath: 'credentials',
				buildEntity,
				apiVersion: '1'
			} );
		} );
	} );

	describe( '@forTags', () => {
		it( 'creates the tags service', () => {
			const service = EntityServiceFactory.forTags( { api, buildEntity } );

			expect( service ).toBeInstanceOf( EntityService );
			expect( service ).toEqual( {
				api,
				basePath: 'communities',
				buildEntity,
				apiVersion: '1'
			} );
		} );
	} );

	describe( '@forRoles', () => {
		it( 'creates the roles service', () => {
			const service = EntityServiceFactory.forRoles( { api, buildEntity } );

			expect( service ).toBeInstanceOf( EntityService );
			expect( service ).toEqual( {
				api,
				basePath: 'roles/default_roles',
				buildEntity,
				apiVersion: '1'
			} );
		} );
	} );

	describe( '@forAirports', () => {
		it( 'creates the airport service', () => {
			const service = EntityServiceFactory.forAirports( { api, buildEntity } );

			expect( service ).toBeInstanceOf( AirportService );
			expect( service ).toEqual( {
				api,
				basePath: 'pilots/me/airports',
				buildEntity,
				apiVersion: '1'
			} );
		} );
	} );
} );
