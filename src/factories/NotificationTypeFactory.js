import { LikeNotificationType } from '../entities/LikeNotificationType';
import { NullNotificationType } from '../entities/NullNotificationType';
import { CommentNotificationType } from '../entities/CommentNotificationType';
import { NewPostNotificationType } from '../entities/NewPostNotificationType';
import { MentionNotificationType } from '../entities/MentionNotificationType';
import { NewPreferredPostNotificationType } from '../entities/NewPreferredPostNotificationType';
import { NOTIFICATIONS_TYPES } from '../constants/NotificationsTypes';

export class NotificationTypeFactory {
	static build( type ) {
		switch ( type ) {
		case NOTIFICATIONS_TYPES.like:
			return new LikeNotificationType();
		case NOTIFICATIONS_TYPES.comment:
			return new CommentNotificationType();
		case NOTIFICATIONS_TYPES.newPost:
			return new NewPostNotificationType();
		case NOTIFICATIONS_TYPES.mention:
			return new MentionNotificationType();
		case NOTIFICATIONS_TYPES.newPreferredPost:
			return new NewPreferredPostNotificationType();
		default:
			return new NullNotificationType();
		}
	}
}
