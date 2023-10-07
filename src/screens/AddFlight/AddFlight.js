/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import { NavigationBar } from '../../components/NavigationBar';
import { HorizontalPadding } from '../../components/HorizontalPadding';
import useAddFlightWireframe from '../../wireframes/useAddFlightWireframe';
import { styles } from './AddFlight.styles';
import { AircraftSelection } from '../../components/AircraftSelection';
import { FlightListContainer } from '../../components/FlightListContainer';
import { TrackSwitch } from '../../components/TrackSwitch';
import { FlightForm } from '../../components/FlightForm';
import { KeyboardAwareScrollView } from '../../components/KeyboardAwareScrollView';
import FlightFormSwitch from './components/FlightFormSwitch';
import { PrimaryButton } from '../../components';

const AddFlight = ( { route } ) => {
	const presenter = useAddFlightWireframe( {
		previousScreen: route.params.previousScreen
	} );
	const ref = useRef();
	const [ flightsSectionPositionY, setFlightsSectionPositionY ] = useState( 0 );

	const _onLayoutFlightsSection = ( event ) => {
		const { layout } = event.nativeEvent;
		setFlightsSectionPositionY( layout.y );
	};

	const _scrollToFlightsSection = () => {
		ref?.current?.scrollTo( { y: flightsSectionPositionY, animated: true } );
	};

	useEffect( () => {
		if ( presenter?.shouldShowFlightForm || presenter?.scrollToFlightsSection ) {
			_scrollToFlightsSection();
		}
	}, [ presenter?.shouldShowFlightForm, presenter?.scrollToFlightsSection ] );

	useEffect( () => {
		const newAircraftId = route.params?.newAircraftId;
		if ( newAircraftId && presenter ) presenter.onAircraftSelected( newAircraftId );
	}, [ route.params, presenter ] );

	const _fixedBottomContent = () => (
		<View>
			<View style={styles.buttonContainer}>
				<PrimaryButton
					testID="add-flight-button"
					title={presenter.buttonTitle}
					size="big"
					disabled={presenter.isPostButtonDisabled}
					onPress={presenter.onSaveButtonPressed}
				/>
			</View>
		</View>
	);

	return (
		<BaseScreen isLoading={presenter?.isLoading}>
			{!!presenter && (
				<>
					<HorizontalPadding>
						<NavigationBar
							title="Share a flight"
							onBackArrowPress={presenter.onBackArrowPressed}
						/>
					</HorizontalPadding>
					<KeyboardAwareScrollView
						ref={ref}
						fixedBottomContent={_fixedBottomContent()}
						style={styles.keyboardAwareScrollView}
					>

						<View style={styles.subHeaderContainer}>
							<Text style={styles.subHeaderText}>
								Select an aircraft and the flight
								{'\n'}
								you want to share to others.
							</Text>
						</View>

						<View style={styles.aircraftSelectionContainer}>
							<View style={styles.separatorView} />
							<AircraftSelection
								title="Aircraft Detail - Choose an aircraft"
								required
								showButtonInBottom
								onAddAircraft={presenter.addAircraftButtonWasPressed}
								aircrafts={presenter.selectableAircrafts}
								selectedAircraftID={presenter.selectedAircraftID}
								onAircraftSelected={( aircraftID ) => presenter.onAircraftSelected( aircraftID )}
								onAircraftOptionsPressed={
									( aircraftID ) => presenter.onAircraftOptionsPressed( aircraftID )
								}
							/>
						</View>

						<View style={styles.sectionBackground} onLayout={_onLayoutFlightsSection}>
							{presenter.shouldShowAircraftFlights && (
								<View>
									<View style={styles.flightSeparatorView} />
									<FlightListContainer
										testID="aircraftFlights-FlightListContainer"
										listOfFlights={presenter.aircraftFlightsToPresent}
										selectedFlightID={presenter.selectedFlightID}
										onFlightSelected={( flightID ) => presenter.onFlightSelected( flightID )}
									/>
								</View>
							) }

							{presenter.shouldShowTrackSwitch && (
								<View>
									<TrackSwitch
										testID="flight-track"
										shouldShowTrack={presenter.shouldShowTrack}
										toggleShowTrack={presenter.toggleShowTrack}
										trackSource={presenter.trackSource}
									/>
								</View>
							)}

							{presenter.shouldShowFlightFormSwitch && (
								<View>
									<View style={styles.trackSeparatorView} />
									<FlightFormSwitch
										testID="flightManuallySwitch-testID"
										shouldShowAddFlightManually={presenter.shouldShowFlightFormManually}
										toggleShowAddFlightManually={presenter.toggleFlightFormManually}
									/>
								</View>
							)}

							{presenter.shouldShowFlightForm && (
								<FlightForm
									testID="flight-form"
									presenter={presenter.flightFormPresenter}
								/>
							) }

							<View style={styles.trackSeparatorView} />
						</View>
					</KeyboardAwareScrollView>
				</>
			)}
		</BaseScreen>
	);
};

AddFlight.propTypes = {
	route: PropTypes.shape( {
		params: PropTypes.shape( {
			previousScreen: PropTypes.string.isRequired,
			newAircraftId: PropTypes.number,
			flightData: PropTypes.objectOf( PropTypes.any )
		} ).isRequired
	} ).isRequired
};

export default observer( AddFlight );
