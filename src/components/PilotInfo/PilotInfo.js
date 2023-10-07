/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { SuplementalTitle } from '../SuplementalTitle';
import { TextInput } from '../TextInput';
import { AircraftSelection } from '../AircraftSelection';
import { HorizontalPadding } from '../HorizontalPadding';
import { HOME_AIRPORT, PRIMARY_AIRCRAFT_ID, TOTAL_HOURS } from '../../constants/formFields/editProfileForm';
import { styles } from './PilotInfo.styles';
import Aircraft from '../../entities/Aircraft';
import Form from '../../forms/Form';
import { TouchableInput } from '../TouchableInput';
import CredentialsPresenter from '../../presenters/CredentialsPresenter';
import CommunityTagsPresenter from '../../presenters/CommunityTagsPresenter';
import { CommunityInput } from '../CommunityInput';
import { Tags } from '../Tags';
import CollapsableCredentials from './components/CollapsableCredentials';
import { TextArea } from '../TextArea';
import { CERTIFICATES_OTHER, RATINGS_OTHER } from '../../constants/formFields/editCredentialsForm';

const PilotInfo = ( {
	testID, pilotInfoPresenter,
	credentialsPresenter, communityTagsPresenter, scrollTo
} ) => {
	const [ communityTagSectionPositionY, setCommunityTagSectionPositionY ] = useState( 0 );

	const _onLayoutCommunityTagSection = ( event ) => {
		const { layout } = event.nativeEvent;
		setCommunityTagSectionPositionY( layout.y );
	};

	const _scrollTo = () => {
		scrollTo( communityTagSectionPositionY );
	};

	return (
		<View testID={testID}>
			<HorizontalPadding>
				<SuplementalTitle testID="pilotInfo-SuplementalTitle" text="Pilot Info" />
				<View style={styles.separatorView} />
				<TextInput
					testID="homeAirport-TextInput"
					autoCapitalize="characters"
					error={pilotInfoPresenter.form.$( HOME_AIRPORT ).error}
					inputProps={pilotInfoPresenter.form.$( HOME_AIRPORT ).bind()}
				/>
				<View style={styles.separatorView} />
			</HorizontalPadding>

			<AircraftSelection
				title="Aircrafts"
				onAddAircraft={pilotInfoPresenter.addAircraftButtonWasPressed}
				aircrafts={pilotInfoPresenter.aircrafts}
				selectedAircraftID={null}
				onAircraftSelected={() => {}}
				onAircraftOptionsPressed={pilotInfoPresenter.aircraftOptionsWerePressed}
				showAvatar
			/>

			<HorizontalPadding>
				<TouchableInput
					label={pilotInfoPresenter.form.$( PRIMARY_AIRCRAFT_ID ).label}
					value={pilotInfoPresenter.selectedPrimaryAircraftMakeAndModel}
					placeholder={pilotInfoPresenter.form.$( PRIMARY_AIRCRAFT_ID ).placeholder}
					onPress={() => pilotInfoPresenter.primaryAircraftInputWasPressed()}
				/>
			</HorizontalPadding>

			<View onLayout={_onLayoutCommunityTagSection} style={styles.communityTagSection}>
				<HorizontalPadding style={styles.communityTagSection}>
					<View style={styles.separatorViewCommunity} />
					<CommunityInput
						label={communityTagsPresenter.titleText}
						onSubmit={communityTagsPresenter.addNewTag}
						placeholder={communityTagsPresenter.placeholderText}
						helperText={communityTagsPresenter.helperText}
						options={communityTagsPresenter.tagsFromStore}
						isLoading={communityTagsPresenter.isLoading}
						hasError={communityTagsPresenter.hasError}
						scrollTo={_scrollTo}
					/>
					<Tags
						items={communityTagsPresenter.tags}
						onRemove={communityTagsPresenter.removeTag}
					/>
				</HorizontalPadding>
			</View>

			<HorizontalPadding style={styles.credentialSection}>
				<SuplementalTitle testID="pilotInfo-CredentialsTitle" text="Credentials" />
			</HorizontalPadding>

			<CollapsableCredentials
				testID="Certificates"
				title="Certificates"
				selectedItems={credentialsPresenter.selectedCertificates}
				onSelectionsChange={credentialsPresenter.onSelectionsCertificatesChange}
				items={credentialsPresenter.certificates}
				otherInputOptions={{
					error: credentialsPresenter.form.$( CERTIFICATES_OTHER ).error,
					inputProps: credentialsPresenter.form.$( CERTIFICATES_OTHER ).bind(),
					placeholder: credentialsPresenter.form.$( CERTIFICATES_OTHER ).placeholder,
					isOtherOptionSelected: credentialsPresenter.isOptionOtherSelectedCertificates
				}}
			/>

			<CollapsableCredentials
				testID="Ratings"
				title="Ratings / Endorsements"
				selectedItems={credentialsPresenter.selectedRatings}
				onSelectionsChange={credentialsPresenter.onSelectionsRatingsChange}
				items={credentialsPresenter.ratings}
				otherInputOptions={{
					error: credentialsPresenter.form.$( RATINGS_OTHER ).error,
					inputProps: credentialsPresenter.form.$( RATINGS_OTHER ).bind(),
					placeholder: credentialsPresenter.form.$( RATINGS_OTHER ).placeholder,
					isOtherOptionSelected: credentialsPresenter.isOptionOtherSelectedRatings
				}}
			/>

			<HorizontalPadding>
				<View style={styles.separatorView} />
				<TextArea
					testID="total-hours-input"
					capitalizeFirstLetter
					inputProps={pilotInfoPresenter.form.$( TOTAL_HOURS ).bind()}
					maxLength={30}
				/>
			</HorizontalPadding>

		</View>
	);
};

PilotInfo.propTypes = {
	testID: PropTypes.string,
	pilotInfoPresenter: PropTypes.shape( {
		addAircraftButtonWasPressed: PropTypes.func.isRequired,
		primaryAircraftInputWasPressed: PropTypes.func.isRequired,
		aircrafts: PropTypes.arrayOf( PropTypes.instanceOf( Aircraft ) ).isRequired,
		form: PropTypes.instanceOf( Form ).isRequired,
		aircraftOptionsWerePressed: PropTypes.func.isRequired,
		selectedPrimaryAircraftMakeAndModel: PropTypes.string.isRequired
	} ).isRequired,
	credentialsPresenter: PropTypes.instanceOf( CredentialsPresenter ).isRequired,
	communityTagsPresenter: PropTypes.instanceOf( CommunityTagsPresenter ).isRequired,
	scrollTo: PropTypes.func
};

PilotInfo.defaultProps = {
	testID: 'pilotInfo-Component',
	scrollTo: () => {}
};

export default observer( PilotInfo );
