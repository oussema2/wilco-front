/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { TITLE, MESSAGE, VISIBILITY } from '../../constants/formFields/postForm';
import useEditPostWireframe from '../../wireframes/useEditPostWireframe';
import BaseScreen from '../BaseScreen/BaseScreen';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Title } from '../../components/Title';
import { ImageCarousel } from '../../components/ImageCarousel';
import EditPostHeader from './components/EditPostHeader';
import { HorizontalPadding } from '../../components/HorizontalPadding';
import { styles } from '../CreatePost/CreatePost.styles';
import { TextArea } from '../../components/TextArea';
import { KeyboardAwareScrollView } from '../../components/KeyboardAwareScrollView';
import { TouchableInput } from '../../components/TouchableInput';
import { AddPhotosButton } from '../../components/AddPhotosButton';
import { CommunityInput } from '../../components/CommunityInput';
import { Tags } from '../../components/Tags';
import MessageTooltipPopover from '../CreatePost/components/MessageTooltipPopover';
import { onLayout, scrollTo } from '../../helpers/scroll';
import { FlightSelection } from '../../components/FlightSelection';

const EditPost = ( { testID, route } ) => {
	const { postId } = route.params;
	const presenter = useEditPostWireframe( { postId } );
	const ref = useRef();
	const [ communityTagSectionPositionY, setCommunityTagSectionPositionY ] = useState( 0 );
	const [ messageSectionPositionY, setMessageSectionPositionY ] = useState( 0 );

	useEffect( () => {
		const flightData = route.params?.flightData;
		if ( flightData && presenter ) presenter.onAircraftFlightSelected( flightData );
	}, [ route.params, presenter ] );

	const renderSubmitButton = () => (
		<View>
			<View style={styles.buttonContainer}>
				<PrimaryButton
					testID="submit-button"
					title={presenter.submitButtonTitle}
					size="big"
					disabled={presenter.isSubmitButtonDisabled}
					onPress={presenter.form.onSubmit}
				/>
			</View>
		</View>
	);

	return (
		<BaseScreen testID={testID} isLoading={presenter?.isLoading}>
			{!!presenter && (
				<>
					<HorizontalPadding>
						<EditPostHeader
							rightButton={presenter.rightHeaderButton}
						/>
					</HorizontalPadding>

					<KeyboardAwareScrollView
						ref={ref}
						fixedBottomContent={renderSubmitButton()}
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

						<View onLayout={( event ) => { onLayout( event, setMessageSectionPositionY ); }}>
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
								<Title text="Photo" style={styles.imagesTitle} testID="image-title-testID" />
							</HorizontalPadding>

							{presenter.hasPhotos && (
								<>
									<ImageCarousel testID="photo-carousel" previewSources={presenter.photoSources} removeImage={presenter.removePhoto} />
								</>
							)}

							<View style={styles.postBarContainer}>
								<AddPhotosButton
									testID="add-photos-button"
									title={presenter.addPhotosButtonTitle}
									onPhotosSelected={presenter.photosWereSelected}
									maxPhotosAllowed={presenter.photosAllowed}
									showPlaceholder={!presenter.hasPhotos}
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

EditPost.propTypes = {
	testID: PropTypes.string,
	route: PropTypes.instanceOf( Object ).isRequired
};

EditPost.defaultProps = {
	testID: 'editPost-screen'
};

export default observer( EditPost );
