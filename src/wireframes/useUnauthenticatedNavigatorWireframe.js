import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import OnBoardingManager from '../stores/OnBoardingManager';
import UnauthenticatedNavigatorPresenter from '../presenters/UnauthenticatedNavigatorPresenter';

const useUnauthenticatedNavigatorWireframe = () => {
	const onBoardingManager = new OnBoardingManager();

	const createPresenter = () => new UnauthenticatedNavigatorPresenter( {
		onBoardingManager,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useUnauthenticatedNavigatorWireframe;
