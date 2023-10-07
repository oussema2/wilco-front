import { makeAutoObservable, runInAction } from 'mobx';

export default class FetchCredentialsFromRemote {
	constructor( { certificateStore, ratingStore, service } ) {
		this.certificateStore = certificateStore;
		this.ratingStore = ratingStore;
		this.service = service;

		makeAutoObservable( this );
	}

	async execute() {
		const entities = await this._fetchFromService();
		runInAction( () => {
			this._putCertificatesInStore( entities.certificates );
			this._putRatingsInStore( entities.ratings );
		} );
		return entities;
	}

	_fetchFromService() {
		return this.service.fetchAll();
	}

	_putCertificatesInStore( entities ) {
		this.certificateStore.updateAll( entities );
	}

	_putRatingsInStore( entities ) {
		this.ratingStore.updateAll( entities );
	}
}
