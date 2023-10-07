import React from 'react';
import {
	View
} from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './SuggestionsList.styles';

const SuggestionsList = ( {
	testID, suggestionsVisible, suggestions, onPress
} ) => (
	<View style={[ styles.listContainer, !suggestionsVisible ? { marginBottom: 0 } : {} ]}>
		{suggestionsVisible && suggestions.length > 0 && (
			<View style={styles.list}>
				{suggestions.slice( 0, 5 )
					.map( ( item ) => (
						<TouchableOpacity
							key={item.id}
							onPress={() => onPress( item.name )}
							style={styles.listItem}
							testID={`${testID}-${item.id}`}
						>
							<Text numberOfLines={1} align="left" style={styles.listItemText}>{item.name}</Text>
						</TouchableOpacity>
					) )}
			</View>
		)}
	</View>
);

SuggestionsList.propTypes = {
	testID: PropTypes.string,
	suggestionsVisible: PropTypes.bool.isRequired,
	suggestions: PropTypes.any,
	onPress: PropTypes.func
};

SuggestionsList.defaultProps = {
	testID: 'suggestion-list',
	suggestions: [],
	onPress: () => {}
};

export default SuggestionsList;
