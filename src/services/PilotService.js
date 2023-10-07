import EntityService from './EntityService';

export default class PilotService extends EntityService {
	patch( pilotId, {
		firstName, lastName, description, homeAirport, primaryAircraftId, totalHours,
		profilePictureBase64, certificates, customCertificates, ratings, customRatings,
		communityTags, rolesIDs, customRoles
	} ) {
		const params = {
			pilot: {
				first_name: firstName,
				last_name: lastName,
				description,
				home_airport: homeAirport,
				primary_aircraft_id: primaryAircraftId,
				total_hours: totalHours,
				profile_picture_base64: profilePictureBase64,
				certificate_ids: certificates,
				custom_certificates: customCertificates,
				rating_ids: ratings,
				custom_ratings: customRatings,
				community_tags: communityTags,
				roles: rolesIDs,
				custom_roles: customRoles
			}
		};
		return super.patch( pilotId, params );
	}

	async blockUser( entityId ) {
		return this.api.post( `${this.baseEntityPath}/${entityId}/block` );
	}

	async reportUser( attributes ) {
		return this
			.api
			.post(
				`${this.baseEntityPath}/${attributes.reported_pilot_id}/reports`,
				attributes
			);
	}
}
