import { AppVersionChecker } from '@rr-ss/app-version-checker';
import FirebaseMinVersionsFetcher from '@rr-ss/firebase-min-versions-fetcher';
import { useEffect, useState } from 'react';
import AppPresenter from './AppPresenter';
import RemoteConfigService from '../../services/RemoteConfigService';
import ChatService from '../../services/ChatService';

const useAppPresenter = () => {
	const [ presenterInstance, setPresenterInstance ] = useState( null );
	useEffect( () => {
		const versionChecker = new AppVersionChecker( {
			minVersionsFetcher: new FirebaseMinVersionsFetcher()
		} );

		const remoteConfigService = RemoteConfigService.shared();
		const chatService = ChatService.shared();

		const presenter = new AppPresenter(
			{
				versionChecker,
				remoteConfigService,
				chatService
			} );

		presenter.onMount();
		setPresenterInstance( presenter );
	}, [] );

	return presenterInstance;
};

export default useAppPresenter;
