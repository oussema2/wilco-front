import EntityService from './EntityService';

export default class NotificationService extends EntityService {
	async putFirebaseToken( token ) {
		await this.api.put( '1/users/me/device', { device: { token } } );
	}

	async deleteFirebaseToken() {
		try {
			await this.api.delete( '1/users/me/device' );
		} catch ( e ) {
		}
	}

	async getUnreadNotifications() {
		try {
			const response = await this.api.get( '1/pilots/me/unread_number' );
			return response;
		} catch ( e ) {
			return null;
		}
	}
}
