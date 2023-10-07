import { StackActions } from '@react-navigation/native';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';

export class LikeNotificationType {
	navigate( navigation, notification ) {
		const	{ postId } = notification;

		const pushAction = StackActions.push( AUTHENTICATED_ROUTES.postDetail.name, { postId } );

		navigation.dispatch( pushAction );
	}

	action() {
		return 'liked your post';
	}

	getPostId( data ) {
		return data.post_id;
	}
}
