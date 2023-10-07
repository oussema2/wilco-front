import { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { useNavigation } from '@react-navigation/native';
import { useRootStore } from '../providers/RootStoreProvider';
import InvitePeoplePresenter from '../presenters/InvitePeoplePresenter';
import ShareMessagesService from '../services/ShareMessagesService';

const useInvitePeopleWireframe = ( ) => {
	const rootStore = useRootStore();
	const navigation = useNavigation();
	const shareMessagesService = ShareMessagesService.shared();

	const createPresenter = () => new InvitePeoplePresenter( {
		rootStore,
		navigation,
		shareMessagesService,
		makeAutoObservable
	} );

	const [ presenter ] = useState( createPresenter );

	return presenter;
};

export default useInvitePeopleWireframe;
