import React from 'react';
import { render } from '@testing-library/react-native';
import { PilotInfo } from '../../../components/PilotInfo';
import PilotInfoPresenter from '../../../presenters/PilotInfoPresenter';
import PilotFactory from '../../factories/PilotFactory';
import Form from '../../../forms/Form';
import fields from '../../../forms/editProfileFields';
import CredentialsPresenter from '../../../presenters/CredentialsPresenter';
import CommunityTagsPresenter from '../../../presenters/CommunityTagsPresenter';

describe( '<PilotInfo />', () => {
	const testID = 'testing-PilotInfo-component';
	const form = new Form( { fields } );
	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };

	const presenter = new PilotInfoPresenter( {
		navigation: { navigate() {} },
		pilot: PilotFactory.build(),
		form,
		makeAutoObservable() {}
	} );

	const credentialsPresenter = new CredentialsPresenter( {
		pilot: PilotFactory.build(),
		form,
		makeAutoObservable() {}
	} );

	const communityTagsPresenter = new CommunityTagsPresenter( {
		pilot: PilotFactory.build(),
		form,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		makeAutoObservable() {}
	} );

	let component;

	const setUp = ( ) => {
		component = render(
			<PilotInfo
				testID={testID}
				pilotInfoPresenter={presenter}
				credentialsPresenter={credentialsPresenter}
				communityTagsPresenter={communityTagsPresenter}
			/>
		);
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'displays the title and input', () => {
		expect( component.getByText( 'Pilot Info' ) ).toBeDefined();
		expect( component.getByText( 'Home airport' ) ).toBeDefined();
		expect( component.queryByTestId( testID ) ).toBeDefined();
		expect( component.getByText( 'Add an aircraft' ) ).toBeDefined();
		expect( component.getByText( 'Aircrafts' ) ).toBeDefined();
		expect( component.getByText( 'Primary aircraft' ) ).toBeDefined();
		expect( component.getByText( 'Communities' ) ).toBeDefined();
		expect( component.queryByTestId( 'tags-component' ) ).toBeDefined();
		expect( component.queryByTestId( 'community-input' ) ).toBeDefined();
		expect( component.queryByTestId( 'total-hours-input' ) ).toBeDefined();
	} );
} );
