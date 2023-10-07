import { makeAutoObservable } from 'mobx';
import SecureStorageService from '../services/SecureStorageService';
import { ONBOARDING_WAS_SEEN_KEY } from '../constants/storageKeys';

export default class OnBoardingManager {
	constructor( {
		storageService = new SecureStorageService()
	} = {} ) {
		this.storageService = storageService;
		this._onBoardingWasSeen = this.storageService.getInt( { key: ONBOARDING_WAS_SEEN_KEY } );
		makeAutoObservable( this );
	}

	get isOnBoardingWasSeen() {
		return !!this.onBoardingWasSeen;
	}

	setOnBoardingAsSeen() {
		this._onBoardingWasSeen = 1;
		this.storageService.setInt( { key: ONBOARDING_WAS_SEEN_KEY, value: 1 } );
	}

	get onBoardingWasSeen() {
		return this._onBoardingWasSeen;
	}
}
