import React from 'react';
import {
	Pressable,
	ScrollView,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import noop from '../../../helpers/noop';
import HeaderView from '../../HeaderView/HeaderView';
import { mentionStyles } from '../MentionInput.styles';

import {
	hasOnlyOneWord,
	hasWordsThatStartWithValue,
	simplifyNameToSearch
} from '../../../helpers/strings';
import { ActivityIndicator } from '../../ActivityIndicator';
import { palette } from '../../../Theme';

const PilotSuggestions = ( {
	onSuggestionPress, presenter
} ) => {
	if ( presenter.keyword == null ) {
		return null;
	}

	const simplifiedTextValue = simplifyNameToSearch( presenter.keyword );

	const filterSuggestionsCallback = ( option ) => {
		const simplifiedOptionName = simplifyNameToSearch( option.name );
		if ( hasOnlyOneWord( presenter.keyword ) ) {
			return hasWordsThatStartWithValue( simplifiedOptionName, simplifiedTextValue );
		}
		return simplifiedOptionName.includes( simplifiedTextValue );
	};

	const filteredSuggestions = presenter.suggestions.filter( filterSuggestionsCallback );

	return (
		<ScrollView
			testID="pilotSuggestions-testID"
			keyboardShouldPersistTaps="always"
			style={filteredSuggestions.length && mentionStyles.suggestionContainer}
		>
			{presenter.isLoadingSuggestions
				&& filteredSuggestions.length === 0
				&& (
					<ActivityIndicator
						testID="activityIndicator-testID"
						isLoading={presenter.isLoadingSuggestions}
						size="small"
						color={palette.primary.default}
						containerStyle={mentionStyles.activityIndicator}
					/>
				)}

			{filteredSuggestions
				.slice( 0, 5 )
				.map( ( user ) => (
					<View key={user.id} style={mentionStyles.suggestionItem}>
						<Pressable onPress={() => onSuggestionPress( user )}>
							<HeaderView
								pilotName={user.name}
								bodyInfo={user.primaryAircraft?.makeAndModel}
								pilotOnPress={() => onSuggestionPress( user )}
								imageSource={user.profilePictureThumbnailSource}
							/>
						</Pressable>
					</View>
				) )}
		</ScrollView>
	);
};

PilotSuggestions.propTypes = {
	onSuggestionPress: PropTypes.func,
	presenter: PropTypes.shape( {
		keyword: PropTypes.string,
		suggestions: PropTypes.arrayOf( PropTypes.object ).isRequired,
		isLoadingSuggestions: PropTypes.bool.isRequired
	} )
};

PilotSuggestions.defaultProps = {
	onSuggestionPress: noop,
	presenter: {
		keyword: '',
		suggestions: [],
		isLoadingSuggestions: false
	}
};

export default observer( PilotSuggestions );
