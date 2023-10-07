import { StackActions } from '@react-navigation/native';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';

export class CommentNotificationType {
	navigate( navigation, notification ) {
		const	{ postId } = notification;

		const pushAction = StackActions.push( AUTHENTICATED_ROUTES.postDetail.name, { postId, 'scrollToFirstComment': true } );

		navigation.dispatch( pushAction );
	}

	action() {
		return 'commented on your post';
	}

	getPostId( data ) {
		return data.post_id;
	}
}
