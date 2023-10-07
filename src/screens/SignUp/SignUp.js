import React from 'react';
import { observer } from 'mobx-react-lite';
import useSignUpWireframe from '../../wireframes/useSignUpWireframe';
import BaseScreen from '../BaseScreen/BaseScreen';
import StepNavigation from '../../components/StepNavigation/StepNavigation';
import FirstStep from './Components/FirstStep';
import SecondStep from './Components/SecondStep';

const SignUp = ( ) => {
	const presenter = useSignUpWireframe();

	return (
		<BaseScreen isLoading={!!presenter && presenter.isLoading}>
			{!!presenter && (
				<StepNavigation
					currentStep={presenter.currentStep}
					onBackButtonPress={presenter.onBackButtonPressed}
				>
					<FirstStep presenter={presenter} />
					<SecondStep presenter={presenter} />
				</StepNavigation>
			) }
		</BaseScreen>
	);
};

SignUp.propTypes = {
};

SignUp.defaultProps = {
};

export default observer( SignUp );
