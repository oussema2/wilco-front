import React from 'react';
import {
	Pressable,
	ScrollView,
	Text,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import noop from '../../../helpers/noop';
import { mentionStyles } from '../MentionInput.styles';

import { ActivityIndicator } from '../../ActivityIndicator';
import { palette } from '../../../Theme';
import { styles } from './HashtagSuggestions.styles';
import { simplifyNameToSearch } from '../../../helpers/strings';
import { vector } from '../../../assets/icons';
import { Image } from '../../Image';

const HashtagSuggestions = ( {
	onSuggestionPress, presenter
} ) => {
	if ( presenter.keyword == null ) {
		return null;
	}

	const trimmedValue = simplifyNameToSearch( presenter.keyword );

	const filterSuggestionsCallback = ( option ) => {
		const trimmedOption = simplifyNameToSearch( option.name );
		return trimmedOption.startsWith( trimmedValue );
	};

	const filteredSuggestions = presenter.suggestions.filter( filterSuggestionsCallback );

	const renderLoader = () => {
		if ( presenter.isLoadingSuggestions && filteredSuggestions.length === 0 ) {
			return (
				<ActivityIndicator
					testID="activityIndicator-testID"
					isLoading={presenter.isLoadingSuggestions}
					size="small"
					color={palette.primary.default}
					containerStyle={mentionStyles.activityIndicator}
				/>
			);
		}
		return null;
	};

	const renderSuggestions = () => (
		filteredSuggestions
			.slice( 0, 5 )
			.map( ( sug ) => (
				<View key={sug.id} style={mentionStyles.suggestionItem}>
					<Pressable style={styles.itemContainer} onPress={() => onSuggestionPress( sug )}>
						<Image testID="hashtag-image" style={styles.hashtagImage} source={vector} />
						<Text style={styles.item}>{sug.name}</Text>
					</Pressable>
				</View>
			) )
	);

	return (
		<ScrollView
			testID="hashtagSuggestions-testID"
			keyboardShouldPersistTaps="always"
			style={filteredSuggestions.length && mentionStyles.suggestionContainer}
		>
			{ renderLoader() }
			{ renderSuggestions() }
		</ScrollView>
	);
};

HashtagSuggestions.propTypes = {
	onSuggestionPress: PropTypes.func,
	presenter: PropTypes.shape( {
		keyword: PropTypes.string,
		suggestions: PropTypes.arrayOf( PropTypes.object ).isRequired,
		isLoadingSuggestions: PropTypes.bool.isRequired
	} )
};

HashtagSuggestions.defaultProps = {
	onSuggestionPress: noop,
	presenter: {
		keyword: '',
		suggestions: [],
		isLoadingSuggestions: false
	}
};

export default observer( HashtagSuggestions );
