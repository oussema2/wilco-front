import React from 'react';
import PropTypes from 'prop-types';
import HeaderView from './HeaderView';

const MemberHeaderView = ( {
	testID, pilotName, primaryAircraftMakeAndModel, homeAirport, optionsOnPress, pilotOnPress,
	imageSource, rightAction
} ) => (
	<HeaderView
		testID={testID}
		pilotName={pilotName}
		bodyInfo={primaryAircraftMakeAndModel}
		bodySecondaryInfo={homeAirport}
		optionsOnPress={optionsOnPress}
		pilotOnPress={pilotOnPress}
		imageSource={imageSource}
		rightAction={rightAction}
	/>
);

MemberHeaderView.propTypes = {
	testID: PropTypes.string,
	pilotName: PropTypes.string.isRequired,
	primaryAircraftMakeAndModel: PropTypes.string,
	homeAirport: PropTypes.string,
	optionsOnPress: PropTypes.oneOfType( [ PropTypes.func, PropTypes.oneOf( [ false ] ) ] ),
	pilotOnPress: PropTypes.func,
	imageSource: PropTypes.oneOfType( [ PropTypes.string, PropTypes.object ] ),
	rightAction: PropTypes.shape( {
		onPress: PropTypes.func,
		imageSource: PropTypes.node
	} )
};

MemberHeaderView.defaultProps = {
	testID: 'postHeaderView-component',
	primaryAircraftMakeAndModel: null,
	homeAirport: null,
	optionsOnPress: null,
	pilotOnPress: () => {},
	imageSource: null,
	rightAction: null
};

export default MemberHeaderView;
