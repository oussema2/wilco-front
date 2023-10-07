import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import { NavigationBar } from '../../components/NavigationBar';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import useInvitePeopleWireframe from '../../wireframes/useInvitePeopleWireframe';
import { Image } from '../../components/Image';
import { styles } from './InvitePeople.styles';
import { PrimaryButton } from '../../components';
import { Subtitle } from '../../components/Subtitle';
import { brandSymbol } from '../../assets/icons';
import { palette } from '../../Theme';

const InvitePeople = ( { testID } ) => {
	const presenter = useInvitePeopleWireframe();

	return (
		<BaseScreen testID={testID}>
			<HorizontalPadding>
				<NavigationBar
					title={presenter.title}
					testID="invite-people-navigation-bar-testID"
					onBackArrowPress={presenter.backButtonWasPressed}
				/>
			</HorizontalPadding>

			<ScrollView contentContainerStyle={styles.scrollView}>
				<Subtitle testID="subtitle-text" text={presenter.subtitle} style={styles.subtitle} />

				<View style={styles.imageContainer}>
					<Image
						testID="image-invite-people"
						source={brandSymbol}
						style={styles.image}
						tintColor={palette.primary.default}
						resizeMode="contain"
					/>
				</View>

				<PrimaryButton
					testID="share-button-testID"
					title={presenter.buttonTitle}
					size="medium"
					buttonStyle={styles.button}
					onPress={presenter.shareButtonWasPressed}
				/>
			</ScrollView>

		</BaseScreen>
	);
};

InvitePeople.propTypes = {
	testID: PropTypes.string
};

InvitePeople.defaultProps = {
	testID: 'invite-people-screen'
};

export default observer( InvitePeople );
