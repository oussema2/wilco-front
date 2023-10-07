import { Factory } from 'fishery';
import Notification from '../../entities/Notification';
import PilotFactory from './PilotFactory';
import { NotificationTypeFactory } from '../../factories/NotificationTypeFactory';
import { NOTIFICATIONS_TYPES } from '../../constants/NotificationsTypes';

export default Factory.define( ( { sequence, notificationType = NOTIFICATIONS_TYPES.like } ) => {
	const type = NotificationTypeFactory.build( notificationType );
	return ( new Notification( {
		id: sequence,
		type,
		createdAt: new Date( '12-13-2020' ),
		pilot: PilotFactory.build(),
		notificationType
	} ) );
} );
