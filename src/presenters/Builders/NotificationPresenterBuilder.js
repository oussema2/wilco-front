import { makeAutoObservable } from 'mobx';
import NotificationPresenter from '../NotificationPresenter';

export default class NotificationPresenterBuilder {
	static build( {
		notification,
		navigation,
		analyticsService
	} ) {
		const presenter = new NotificationPresenter( {
			notification,
			navigation,
			analyticsService,
			makeAutoObservable
		} );

		return presenter;
	}
}
