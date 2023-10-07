import { makeAutoObservable } from 'mobx';
import SecureStorageService from '../services/SecureStorageService';
import {
	HOME_PREFERENCES_TOOLTIP_WAS_SEEN_KEY
} from '../constants/storageKeys';

export default class TooltipManager {
	constructor( {
		storageService = new SecureStorageService()
	} = {} ) {
		this.storageService = storageService;
		this._homePreferencesTooltipWasSeen = this.storageService
			.getInt( { key: HOME_PREFERENCES_TOOLTIP_WAS_SEEN_KEY } );

		makeAutoObservable( this );
	}

	get isHomePreferencesTooltipWasSeen() {
		return !!this.homePreferencesTooltipWasSeen;
	}

	setHomePreferencesTooltipAsSeen() {
		this._homePreferencesTooltipWasSeen = 1;
		this.storageService.setInt( { key: HOME_PREFERENCES_TOOLTIP_WAS_SEEN_KEY, value: 1 } );
	}

	get homePreferencesTooltipWasSeen() {
		return this._homePreferencesTooltipWasSeen;
	}
}
