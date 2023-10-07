import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import BaseScreen from '../BaseScreen/BaseScreen';
import { NavigationBar } from '../../components/NavigationBar';
import usePilotProfileWireframe from '../../wireframes/usePilotProfileWireframe';
import HorizontalPadding from '../../components/HorizontalPadding/HorizontalPadding';
import PilotPosts from './components/PilotPosts';
import SkeletonPilotProfile from './components/SkelentonPilotProfile';
import PilotInfo from './components/PilotInfo';
import { PILOT_PROFILE_TABS } from '../../constants/pilotProfileTabs';
import { styles } from './PilotProfile.styles';

const PilotProfile = ( {
	testID,
	route
} ) => {
	const pilotId = route.params?.pilotId;
	const enableBackButton = route.params?.enableBackButton;
	const presenter = usePilotProfileWireframe( { pilotId } );
	const ref = useRef( null );
	useScrollToTop( ref );
	const [ tabIndex, setTabIndex ] = React.useState( PILOT_PROFILE_TABS.pilotInfo.index );

	const _onPressTitle = () => {
		ref?.current?.scrollToOffset( { animated: true, offset: 0 } );
	};

	const fixedHeader = () => (
		<HorizontalPadding>
			<NavigationBar
				title={presenter.navigationBarTitle}
				onBackArrowPress={enableBackButton && presenter.backButtonWasPressed}
				onTitlePress={_onPressTitle}
				rightAction={{
					image: presenter.headerRightImageSource,
					onPress: presenter.headerRightButtonWasPressed
				}}
			/>
		</HorizontalPadding>
	);

	const showProfile = () => (
		<View style={styles.container}>
			{fixedHeader()}
			<PilotPosts
				showPosts={tabIndex === PILOT_PROFILE_TABS.activity.index}
				pilotId={pilotId}
				presenter={presenter}
				pilotInfo={(
					<PilotInfo
						presenter={presenter}
						index={tabIndex}
						setIndex={setTabIndex}
					/>
				)}
				ref={ref}
			/>
		</View>
	);

	return (
		<BaseScreen testID={testID} isLoading={presenter && presenter.isLoading} edgeTop>
			{presenter && presenter.pilot ? showProfile() : <SkeletonPilotProfile />}
		</BaseScreen>
	);
};

PilotProfile.propTypes = {
	testID: PropTypes.string,
	route: PropTypes.instanceOf( Object ).isRequired
};

PilotProfile.defaultProps = {
	testID: 'pilotProfile-screen'
};

export default observer( PilotProfile );
