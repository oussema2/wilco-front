/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import BaseScreen from '../BaseScreen/BaseScreen';
import useAddAircraftWireframe from '../../wireframes/useAddAircraftWireframe';
import { AircraftForm } from '../../components/AircraftForm';

const AddAircraft = ( { route } ) => {
	const presenter = useAddAircraftWireframe( {
		previousScreen: route.params.previousScreen
	} );

	return (
		<BaseScreen isLoading={presenter?.isLoading}>
			<AircraftForm presenter={presenter} />
		</BaseScreen>
	);
};

AddAircraft.propTypes = {
	route: PropTypes.shape( {
		params: PropTypes.shape( {
			previousScreen: PropTypes.string.isRequired
		} ).isRequired
	} ).isRequired
};

export default observer( AddAircraft );
