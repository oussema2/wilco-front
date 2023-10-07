/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import BaseScreen from '../BaseScreen/BaseScreen';
import useEditAircraftWireframe from '../../wireframes/useEditAircraftWireframe';
import { AircraftForm } from '../../components/AircraftForm';

const EditAircraft = ( { route } ) => {
	const { aircraftId, previousScreen } = route.params;
	const presenter = useEditAircraftWireframe( { aircraftId, previousScreen } );

	return (
		<BaseScreen isLoading={presenter?.isLoading}>
			<AircraftForm presenter={presenter} />
		</BaseScreen>
	);
};

EditAircraft.propTypes = {
	route: PropTypes.shape( {
		params: PropTypes.shape( {
			aircraftId: PropTypes.number,
			previousScreen: PropTypes.string.isRequired
		} ).isRequired
	} ).isRequired
};

export default observer( EditAircraft );
