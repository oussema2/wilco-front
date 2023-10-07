import { DeviceEventEmitter } from 'react-native';
import { ROUTES } from '../navigation/MainTabNavigator/routes';
import { HOME_TABS } from '../constants/HomeTabs';

export class NewPreferredPostNotificationType {
	navigate( navigation ) {
		DeviceEventEmitter.emit( 'navigateToMyFeed' );
		navigation.navigate( ROUTES.Home.name, { initialIndex: HOME_TABS.myFeed.index } );
	}

	action() {
		return 'shared a new post!';
	}

	getPostId( data ) {
		return data.id;
	}
}
