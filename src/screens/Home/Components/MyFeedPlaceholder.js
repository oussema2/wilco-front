import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { HorizontalPadding } from '../../../components/HorizontalPadding';
import { styles } from './Placeholder.styles';
import EmptyState from '../../../components/EmptyState/EmptyState';
import { star } from '../../../assets/icons';
import { TertiaryButton } from '../../../components/TertiaryButton';
import noop from '../../../helpers/noop';

const MyFeedPlaceholder = ( {
	testID, onButtonPress, text
} ) => (
	<View testID={testID} style={styles.placeholderContainer}>
		<ScrollView contentContainerStyle={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
			<HorizontalPadding style={styles.horizontalPadding}>
				<EmptyState
					source={star}
					imageStyle={styles.image}
					text={text}
				/>

				<View style={styles.separatorView} />

				<TertiaryButton
					testID="empty-state-preferences-button"
					title="Set up preferences"
					size="small"
					onPress={onButtonPress}
				/>

			</HorizontalPadding>
		</ScrollView>
	</View>
);

MyFeedPlaceholder.propTypes = {
	testID: PropTypes.string,
	onButtonPress: PropTypes.func,
	text: PropTypes.string
};

MyFeedPlaceholder.defaultProps = {
	testID: 'placeholder-home-screen',
	onButtonPress: noop,
	text: ''
};
export default observer( MyFeedPlaceholder );
