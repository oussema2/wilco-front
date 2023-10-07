import React from 'react';
import { EmptyState } from '../EmptyState';
import { aircraft } from '../../assets/icons';

const EmptyAircraftList = ( ) => {
	const _emptyText = 'You have no aircrafts in your hangar.\nYou can add your first one.';
	return <EmptyState source={aircraft} text={_emptyText} />;
};

export default EmptyAircraftList;
