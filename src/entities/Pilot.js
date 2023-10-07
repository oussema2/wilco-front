import { makeAutoObservable } from 'mobx';
import Aircraft from './Aircraft';
import PostFlight from './PostFlight';
import Credential from './Credential';
import Role from './Role';

export default class Pilot {
	constructor( {
		id,
		firstName,
		lastName,
		email,
		description,
		homeAirport,
		profilePictureUrl,
		profilePictureThumbnailUrl,
		primaryAircraftId,
		aircrafts,
		latestFlights,
		certificates,
		ratings,
		communityTags,
		intercomIOSHash,
		intercomAndroidHash,
		roles,
		airports,
		totalHours,
		cometchatUid,
		cometchatAuthToken
	} ) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.description = description;
		this.homeAirport = homeAirport;
		this.profilePictureUrl = profilePictureUrl;
		this.profilePictureThumbnailUrl = profilePictureThumbnailUrl;
		this.primaryAircraftId = primaryAircraftId;
		this.aircrafts = aircrafts;
		this.latestFlights = latestFlights;
		this.certificates = certificates;
		this.ratings = ratings;
		this.communityTags = communityTags;
		this.intercomIOSHash = intercomIOSHash;
		this.intercomAndroidHash = intercomAndroidHash;
		this.airports = airports;
		this.roles = roles;
		this.totalHours = totalHours;
		this.cometchatAuthToken = cometchatAuthToken;
		this.cometchatUid = cometchatUid;

		makeAutoObservable( this );
	}

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}

	get profilePictureSource() {
		return ( this.profilePictureUrl && { uri: this.profilePictureUrl } ) || null;
	}

	get profilePictureThumbnailSource() {
		return ( this.profilePictureThumbnailUrl && { uri: this.profilePictureThumbnailUrl } ) || null;
	}

	get primaryAircraft() {
		return ( this.aircrafts && this.aircrafts.find( ( { id } ) => id === this.primaryAircraftId ) )
					|| null;
	}

	get hasTotalHours() {
		return !!this.totalHours;
	}

	addAircraft( aircraft ) {
		if ( !this.aircrafts ) this.aircrafts = [];
		this.aircrafts.push( aircraft );
	}

	removeAircraft( aircraftId ) {
		if ( !this.aircrafts ) return;
		this._removeFromAircraftArray( aircraftId );
		this._unsetPrimaryAircraftIfHasId( aircraftId );
	}

	setCertificates( certificates ) {
		this.certificates = certificates;
	}

	setRatings( ratings ) {
		this.ratings = ratings;
	}

	setCommunityTags( communityTags ) {
		this.communityTags = communityTags;
	}

	setRoles( roles ) {
		this.roles = roles;
	}

	setLatestFlights( latestFlights ) {
		this.latestFlights = latestFlights;
	}

	setAirports( airports ) {
		this.airports = airports;
	}

	toJSON() {
		return {
			id: this.id,
			first_name: this.firstName,
			last_name: this.lastName,
			user: { email: this.email },
			description: this.description,
			home_airport: this.homeAirport,
			profile_picture_url: this.profilePictureUrl,
			profile_picture_thumbnail_url: this.profilePictureThumbnailUrl,
			primary_aircraft_id: this.primaryAircraftId,
			aircrafts: this.aircrafts.map( ( aircraft ) => aircraft.toJSON() ),
			latest_flights: this.latestFlights?.map( ( postFlight ) => postFlight.toJSON() ),
			certificates: this.certificates?.map( ( certificate ) => certificate.toJSON() ),
			ratings: this.ratings?.map( ( rating ) => rating.toJSON() ),
			community_tags: this.communityTags?.map( ( tag ) => tag ),
			roles: this.roles?.map( ( role ) => role.toJSON() ),
			airports: this.airports,
			total_hours: this.totalHours,
			intercom_ios_hasheable: this.intercomIOSHash,
			intercom_android_hasheable: this.intercomAndroidHash,
			cometchat_uid: this.cometchatUid,
			cometchat_auth_token: this.cometchatAuthToken
		};
	}

	static fromJSON( data ) {
		const aircrafts = data.aircrafts && data.aircrafts.map( ( aircraftJSON ) => (
			Aircraft.fromJSON( aircraftJSON )
		) );

		const latestFlights = data.latest_flights && data.latest_flights.map( ( flightJSON ) => (
			PostFlight.fromJSON( flightJSON )
		) );

		const certificates = data.certificates && data.certificates.map( ( credentialJSON ) => (
			Credential.fromJSON( credentialJSON )
		) );

		const ratings = data.ratings && data.ratings.map( ( credentialJSON ) => (
			Credential.fromJSON( credentialJSON )
		) );

		const roles = data.roles && data.roles.map( ( roleJSON ) => (
			Role.fromJSON( roleJSON )
		) );

		return new Pilot( {
			id: data.id,
			firstName: data.first_name,
			lastName: data.last_name,
			email: data.user?.email,
			description: data.description,
			homeAirport: data.home_airport,
			profilePictureUrl: data.profile_picture_url,
			profilePictureThumbnailUrl: data.profile_picture_thumbnail_url,
			primaryAircraftId: data.primary_aircraft_id,
			aircrafts,
			latestFlights,
			certificates,
			ratings,
			communityTags: data.community_tags,
			intercomIOSHash: data.intercom_ios_hasheable,
			intercomAndroidHash: data.intercom_android_hasheable,
			roles,
			airports: data.airports,
			totalHours: data.total_hours,
			cometchatUid: data.cometchat_uid,
			cometchatAuthToken: data.cometchat_auth_token
		} );
	}

	_removeFromAircraftArray( aircraftId ) {
		const index = this.aircrafts.findIndex( ( aircraft ) => aircraft.id === aircraftId );
		if ( index !== -1 ) this.aircrafts.splice( index, 1 );
	}

	_unsetPrimaryAircraftIfHasId( aircraftId ) {
		if ( this.primaryAircraftId === aircraftId ) this.primaryAircraftId = null;
	}
}
