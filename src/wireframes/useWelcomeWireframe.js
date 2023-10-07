import { useEffect, useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import WelcomePresenter from '../presenters/WelcomePresenter';

const useWelcomeWireframe = () => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	const rootStore = useRootStore();
	const navigation = useNavigation();

	useEffect( () => {
		const presenter = new WelcomePresenter( {
			navigation, makeAutoObservable
		} );

		setPresenterInstance( presenter );
	}, [ rootStore ] );

	return presenterInstance;
};

export default useWelcomeWireframe;
