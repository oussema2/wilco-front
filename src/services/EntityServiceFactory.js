import Pilot from '../entities/Pilot';
import Aircraft from '../entities/Aircraft';
import Hashtag from '../entities/Hashtag';
import CommentService from './CommentService';
import FlightService from './FlightService';
import AircraftService from './AircraftService';
import PilotService from './PilotService';
import NotificationService from './NotificationService';
import CredentialService from './CredentialService';
import EntityService from './EntityService';
import AirportService from './AirportService';

const COMMENTS_API_PATH = 'comments';
const FLIGHTS_API_PATH = 'flights';
const OWN_AIRCRAFTS_API_PATH = 'pilots/me/aircrafts';
const PILOTS_API_PATH = 'pilots';
const OWN_AIRPORTS_API_PATH = 'pilots/me/airports';
const NOTIFICATIONS_API_PATH = 'pilots/me/notifications';
const CREDENTIALS_API_PATH = 'credentials';
const COMMUNITY_TAGS_API_PATH = 'communities';
const ROLES_API_PATH = 'roles/default_roles';
const HASHTAGS_API_PATH = 'hashtags';

export default class EntityServiceFactory {
	static forComments = ( { api, buildEntity } ) => (
		new CommentService( {
			api,
			basePath: COMMENTS_API_PATH,
			buildEntity
		} )
	)

	static forFlights = ( { api, buildEntity } ) => (
		new FlightService( {
			api,
			basePath: FLIGHTS_API_PATH,
			buildEntity
		} )
	)

	static forPilots = ( { api, buildEntity = Pilot.fromJSON } ) => (
		new PilotService( {
			api,
			basePath: PILOTS_API_PATH,
			buildEntity
		} )
	)

	static forAirports = ( { api, buildEntity = Pilot.fromJSON } ) => (
		new AirportService( {
			api,
			basePath: OWN_AIRPORTS_API_PATH,
			buildEntity
		} )
	)

	static forAircrafts = ( { api } ) => (
		new AircraftService( {
			api,
			basePath: OWN_AIRCRAFTS_API_PATH,
			buildEntity: Aircraft.fromJSON
		} )
	)

	static forNotifications = ( { api, buildEntity } ) => (
		new NotificationService( {
			api,
			basePath: NOTIFICATIONS_API_PATH,
			buildEntity
		} )
	)

	static forCredentials = ( { api, buildEntity } ) => (
		new CredentialService( {
			api,
			basePath: CREDENTIALS_API_PATH,
			buildEntity
		} )
	)

	static forTags = ( { api, buildEntity } ) => (
		new EntityService( {
			api,
			basePath: COMMUNITY_TAGS_API_PATH,
			buildEntity
		} )
	)

	static forRoles = ( { api, buildEntity } ) => (
		new EntityService( {
			api,
			basePath: ROLES_API_PATH,
			buildEntity
		} )
	)

	static forHashtags = ( { api, buildEntity = Hashtag.fromJSON } ) => (
		new EntityService( {
			api,
			basePath: HASHTAGS_API_PATH,
			buildEntity
		} )
	)
}
