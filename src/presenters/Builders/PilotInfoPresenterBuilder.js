import { makeAutoObservable } from 'mobx';
import PilotInfoPresenter from '../PilotInfoPresenter';

export default class PilotInfoPresenterBuilder {
	static build( {
		pilot, navigation, getCurrentPilotFromStore
	} ) {
		const presenter = new PilotInfoPresenter( {
			navigation,
			pilot,
			getCurrentPilotFromStore,
			makeAutoObservable
		} );

		return presenter;
	}
}
