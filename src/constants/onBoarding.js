import {
	onBoardingFirst,
	onBoardingSecond,
	onBoardingThird
} from '../assets/icons';

export const ONBOARDING_SLIDES = [
	{
		id: 1,
		title: 'Profile',
		subtitle: 'Create your profile so other WILCO members can get to know you.',
		image: onBoardingFirst,
		style: { width: 160, height: 116 }
	},
	{
		id: 2,
		title: 'Communities',
		subtitle: "Identify the GA communities you're a part of - e.g. flying clubs, flight schools, airport associations, alumni groups, public benefit flying orgs, etc.",
		image: onBoardingSecond,
		style: { width: 130, height: 116 }
	},
	{
		id: 3,
		title: 'Share your flights',
		subtitle: 'Post your flight track and information or manually enter flight details.',
		image: onBoardingThird,
		style: { width: 116, height: 116 }
	}
];
