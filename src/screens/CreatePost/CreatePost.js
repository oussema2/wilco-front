/* eslint-disable react/jsx-no-bind */
import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
	View
} from 'react-native';
import PropTypes from 'prop-types';
import { TITLE, MESSAGE, VISIBILITY } from '../../constants/formFields/postForm';
import useCreatePostWireframe from '../../wireframes/useCreatePostWireframe';
import BaseScreen from '../BaseScreen/BaseScreen';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AddPhotosButton } from '../../components/AddPhotosButton';
import { Title } from '../../components/Title';
import { ImageCarousel } from '../../components/ImageCarousel';
import CreatePostHeader from './components/CreatePostHeader';
import { HorizontalPadding } from '../../components/HorizontalPadding';
import { styles } from './CreatePost.styles';
import { TextArea } from '../../components/TextArea';
import { KeyboardAwareScrollView } from '../../components/KeyboardAwareScrollView';
import { TouchableInput } from '../../components/TouchableInput';
import { CommunityInput } from '../../components/CommunityInput';
import { Tags } from '../../components/Tags';
import MessageTooltipPopover from './components/MessageTooltipPopover';
import { onLayout, scrollTo } from '../../helpers/scroll';
import { useHardwareBackPress } from '../../hooks/useHardwareBackPress';
import { FlightSelection } from '../../components/FlightSelection';

const CreatePost = ( { route } ) => {
	const presenter = useCreatePostWireframe();
	const ref = useRef();
	const [ communityTagSectionPositionY, setCommunityTagSectionPositionY ] = useState( 0 );
	const [ messageSectionPositionY, setMessageSectionPositionY ] = useState( 0 );
	const [ selectedPhotos, setSelectedPhotos ] = useState( [] );

	useEffect( () => {
		const newAircraftId = route.params?.newAircraftId;
		if ( newAircraftId && presenter ) presenter.onAircraftSelected( newAircraftId );

		const flightData = route.params?.flightData;

		if ( flightData && presenter ) presenter.onAircraftFlightSelected( flightData );
	}, [ route.params, presenter ] );

	useHardwareBackPress( presenter?.rightHeaderButton.onPress );

	const _fixedBottomContent = () => (
		<View>
			<View style={styles.buttonContainer}>
				<PrimaryButton
					testID="post-button"
					title={presenter.buttonTitle}
					size="big"
					disabled={presenter.isPostButtonDisabled}
					onPress={presenter.form.onSubmit}
				/>
			</View>
		</View>
	);

	const _removeImage = ( item ) => {
		presenter.removePhoto( item );
		setSelectedPhotos( selectedPhotos.filter( ( photo ) => photo.path !== item.uri ) );
	};

	const _photosWereSelected = ( _photos ) => {
		presenter.photosWereSelected( _photos );
		setSelectedPhotos( _photos );
	};

	return (
		<BaseScreen isLoading={presenter?.isLoading}>
			{!!presenter && (
				<>
					<HorizontalPadding>
						<CreatePostHeader
							rightButton={presenter.rightHeaderButton}
						/>
					</HorizontalPadding>

					<KeyboardAwareScrollView
						ref={ref}
						fixedBottomContent={_fixedBottomContent()}
						style={styles.container}
					>

						<View style={styles.titleSeparatorView} />

						<HorizontalPadding style={styles.sectionBackground}>
							<TextArea
								testID="title-input"
								textInputStyle={styles.postTitleTextInput}
								inputProps={presenter.form.$( TITLE ).bind()}
								capitalizeFirstLetter
							/>
						</HorizontalPadding>

						<View style={styles.separatorView} />

						<View onLayout={( event ) => onLayout( event, setMessageSectionPositionY )}>
							<HorizontalPadding style={styles.sectionBackground}>
								<TextArea
									testID="message-input"
									textInputStyle={styles.postMessageTextInput}
									minimumLines={5}
									inputProps={presenter.form.$( MESSAGE ).bind()}
									supportMention
									capitalizeFirstLetter
									popover={<MessageTooltipPopover />}
									onFocus={() => scrollTo( { ref, positionY: messageSectionPositionY } )}
									bold={false}
								/>
							</HorizontalPadding>
						</View>

						<View style={styles.separatorView} />

						<FlightSelection
							selectedFlight={presenter.selectedFlight}
							selectedAircraft={presenter.selectedAircraft}
							onAddFlightButtonPressed={presenter.onAddFlightButtonPressed}
							onClearFlightPressed={presenter.onClearFlightPressed}
						/>

						<View style={styles.separatorView} />

						<View style={styles.sectionBackground}>
							<HorizontalPadding>
								<Title text="Photo" style={styles.imagesTitle} />
							</HorizontalPadding>

							{presenter.isAnyPhotoSelected && (
								<ImageCarousel testID="photo-carousel" previewSources={presenter.photoSources} removeImage={_removeImage} />
							)}

							<View style={styles.postBarContainer}>
								<AddPhotosButton
									testID="add-photos-button"
									title={presenter.addPhotosButtonTitle}
									onPhotosSelected={_photosWereSelected}
									maxPhotosAllowed={presenter.maxPhotosAllowed}
									selectedPhotos={selectedPhotos}
									showPlaceholder={!presenter.isAnyPhotoSelected}
								/>
							</View>
						</View>

						<View style={styles.separatorView} />

						<View
							onLayout={( event ) => onLayout( event, setCommunityTagSectionPositionY )}
							style={styles.sectionBackground}
						>
							<HorizontalPadding style={styles.communityTagSection}>
								<View style={styles.separatorViewCommunity} />
								<CommunityInput
									label={presenter.communityTagsPresenter.titleText}
									onSubmit={presenter.communityTagsPresenter.addNewTag}
									placeholder={presenter.communityTagsPresenter.placeholderText}
									helperText={presenter.communityTagsPresenter.helperText}
									options={presenter.communityTagsPresenter.tagsFromStore}
									isLoading={presenter.communityTagsPresenter.isLoading}
									hasError={presenter.communityTagsPresenter.hasError}
									scrollTo={() => scrollTo( { ref, positionY: communityTagSectionPositionY } )}
								/>
								<Tags
									items={presenter.communityTagsPresenter.tags}
									onRemove={presenter.communityTagsPresenter.removeTag}
								/>
							</HorizontalPadding>

							<View style={[ styles.separatorView, styles.container ]} />

							<HorizontalPadding style={styles.visibilityContainer}>
								<TouchableInput
									testID="visibility-input"
									label={presenter.form.$( VISIBILITY ).label}
									value={presenter.selectedVisibility}
									onPress={() => presenter.visibilityInputWasPressed()}
								/>
							</HorizontalPadding>
						</View>

						<View style={styles.finalSeparatorView} />

					</KeyboardAwareScrollView>
				</>
			) }
		</BaseScreen>
	);
};

CreatePost.propTypes = {
	route: PropTypes.shape( {
		params: PropTypes.shape( {
			newAircraftId: PropTypes.number,
			flightData: PropTypes.objectOf( PropTypes.any )
		} )
	} ).isRequired
};

export default observer( CreatePost );
