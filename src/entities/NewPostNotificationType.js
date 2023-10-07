import { StackActions } from '@react-navigation/native';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';

export class NewPostNotificationType {
	navigate( navigation, notification ) {
		const	{ postId } = notification;

		const pushAction = StackActions.push( AUTHENTICATED_ROUTES.postDetail.name, { postId } );

		navigation.dispatch( pushAction );
	}

	action() {
		return 'shared a new post!';
	}

	getPostId( data ) {
		return data.id;
	}
}
