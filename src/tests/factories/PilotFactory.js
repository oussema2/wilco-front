import { Factory } from 'fishery';
import Pilot from '../../entities/Pilot';
import AircraftFactory from './AircraftFactory';
import CredentialFactory from './CredentialFactory';
import RoleFactory from './RoleFactory';

export default Factory.define( ( { sequence } ) => {
	const aircrafts = AircraftFactory.buildList( 2 );
	const certificates = CredentialFactory.buildList( 2 );
	const ratings = CredentialFactory.buildList( 2 );
	const roles = RoleFactory.buildList( 2 );
	const communityTags = [ 'tag 1', 'tag 2' ];
	const intercomIOSHash = `user-${sequence}-intercom-ios-hash`;
	const intercomAndroidHash = `user-${sequence}intercom-android-hash`;
	const cometchatUid = `dev${sequence}`;
	const cometchatAuthToken = 'cometchat-auth-token';

	return ( new Pilot( {
		id: sequence,
		firstName: 'First Name',
		lastName: 'Last Name',
		email: 'mail@test.com',
		description: 'Pilot description',
		profilePictureUrl: 'http://profile/picture/url',
		profilePictureThumbnailUrl: 'http://profile/picture/url',
		homeAirport: 'SAEZ',
		primaryAircraftId: aircrafts[ 0 ].id,
		aircrafts,
		certificates,
		ratings,
		communityTags,
		roles,
		intercomIOSHash,
		intercomAndroidHash,
		cometchatUid,
		cometchatAuthToken,
		totalHours: '11'
	} ) );
} );
