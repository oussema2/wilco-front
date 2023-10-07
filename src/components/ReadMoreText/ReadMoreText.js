import React from 'react';
import PropTypes from 'prop-types';
import ReadMore from '@fawazahmed/react-native-read-more';
import { View } from 'react-native';
import { styles } from './ReadMoreText.styles';

const ReadMoreText = ( {
	testID, text, onPress, style
} ) => (
	<View testID={testID}>
		<ReadMore
			style={style}
			seeMoreText=" ... more"
			seeLessText="  See less"
			seeMoreStyle={styles.seeMore}
			seeLessStyle={styles.seeLess}
			ellipsis=""
			numberOfLines={2}
			onPress={onPress}
		>
			{text}
		</ReadMore>
	</View>
);

ReadMoreText.propTypes = {
	testID: PropTypes.string,
	text: PropTypes.string,
	onPress: PropTypes.func,
	style: PropTypes.instanceOf( Object )
};

ReadMoreText.defaultProps = {
	testID: 'read-more-testID',
	text: '',
	onPress: () => {},
	style: {}
};

export default ReadMoreText;
