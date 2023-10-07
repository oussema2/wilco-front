// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import OnBoardingPresenter from '../presenters/OnBoardingPresenter';
import OnBoardingManager from '../stores/OnBoardingManager';
import { useAnalyticsService } from '../providers/AnalyticsProvider';

const useOnBoardingWireframe = () => {
	const navigation = useNavigation();
	const analyticsService = useAnalyticsService();
	const onBoardingManager = new OnBoardingManager();

	const createPresenter = () => new OnBoardingPresenter( {
		navigation,
		onBoardingManager,
		analyticsService,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useOnBoardingWireframe;
