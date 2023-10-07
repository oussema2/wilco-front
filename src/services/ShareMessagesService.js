import { Share } from 'react-native';
import Config from 'react-native-config';

let sharedInstance;

export const SHARE_DEFAULTS = {
	content: {
		title: 'Invite other pilots to be part of Wilco to share, learn, discover, mentor and much more.',
		message: `Hi. I’m a WILCO user and I’m inviting you to join this general aviation app at no charge. WILCO is designed specifically for the GA community - pilots, mechanics, airport managers, and other stakeholders and enthusiasts. Join WILCO and build your GA community now.\nLearn more at: ${Config.BASE_URL_LANDING}`
	},
	options: {
		dialogTitle: 'Invite other pilots to be part of Wilco to share, learn, discover, mentor and much more.',
		subject: 'Invite other pilots to be part of Wilco to share, learn, discover, mentor and much more.',
		excludedActivityTypes: [
			'com.apple.UIKit.activity.AddToReadingList',
			'com.apple.UIKit.activity.AirDrop',
			'com.apple.UIKit.activity.AssignToContact',
			'com.apple.UIKit.activity.CopyToPasteboard',
			'com.apple.UIKit.activity.MarkupAsPDF',
			'com.apple.UIKit.activity.OpenInIBooks',
			'com.apple.UIKit.activity.PostToFlickr',
			'com.apple.UIKit.activity.PostToTencentWeibo',
			'com.apple.UIKit.activity.PostToVimeo',
			'com.apple.UIKit.activity.PostToWeibo',
			'com.apple.UIKit.activity.Print',
			'com.apple.reminders.RemindersEditorExtension',
			'com.apple.UIKit.activity.SaveToCameraRoll',
			'com.apple.mobilenotes.SharingExtension',
			'com.apple.mobileslideshow.StreamShareService'
		]
	}
};

export default class ShareMessagesService {
	constructor( { shareBackend = Share } = {} ) {
		this.shareBackend = shareBackend;
	}

	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new ShareMessagesService();
		return sharedInstance;
	}

	shareMessage = ( {
		content = SHARE_DEFAULTS.content,
		options = SHARE_DEFAULTS.options
	} ) => {
		this.shareBackend.share( content, options );
	}
}
