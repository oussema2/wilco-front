import FontFactory from './structures/FontFactory.structure';

const colors = {
	grayscale: {
		black: '#000000',
		abbey: '#5B5B5B',
		shutterGrey: '#767676',
		aluminum: '#A0A0A0',
		iron: '#D3D3D3',
		mercury: '#E3E3E3',
		wildSand: '#F2F2F2',
		aliceBlue: '#F6F9FA',
		white: '#FFFFFF'
	},
	bluescale: {
		lightBlue: '#E6E7EA'
	},
	teal: {
		dark: '#C7F7FF',
		darkCyan: '#008BA5',
		default: '#12A3BE',
		middleBlue: '#99D3DE',
		background: '#E6F6F9',
		light: '#F6FEFF'
	},
	navy: {
		default: '#1F2E4E'
	},
	success: {
		default: '#00A86F'
	},
	warning: {
		default: '#FFFBE6'
	},
	error: {
		default: '#D60A50',
		background: '#FFEBF2'
	},
	skeleton: {
		background: '#C4C4C4',
		highlight: '#DBDBDB'
	},
	subtitle: {
		default: '#5C6780'
	}
};

const fontFamily = {
	regular: 'NotoSansJP-Regular', // 400
	medium: 'NotoSansJP-Medium', // 500
	bold: 'NotoSansJP-Bold', // 700
	black: 'NotoSansJP-Black' // 900
};

export const dimensions = {
	horizontalPadding: 20
};

export const palette = {
	primary: colors.teal,
	secondary: colors.navy,
	grayscale: colors.grayscale,
	bluescale: colors.bluescale,
	success: colors.success,
	warning: colors.warning,
	error: colors.error,
	skeleton: colors.skeleton,
	subtitle: colors.subtitle
};

export const fonts = {
	hero: FontFactory.createHero( fontFamily ),
	heading: FontFactory.createHeading( fontFamily ),
	suplementalTitle: FontFactory.createSuplementalTitle( fontFamily ),
	subTitle: FontFactory.createSubTitle( fontFamily ),
	title: FontFactory.createTitle( fontFamily ),
	buttonText: FontFactory.createButtonText( fontFamily ),
	buttonTextSmall: FontFactory.createButtonTextSmall( fontFamily ),
	textLink: FontFactory.createTextLink( fontFamily ),
	tabs: FontFactory.createTabs( fontFamily ),
	tabsMedium: FontFactory.createTabsMedium( fontFamily ),
	bodyFocus: FontFactory.createBodyFocus( fontFamily ),
	body: FontFactory.createBody( fontFamily ),
	bodySmall: FontFactory.createBodySmall( fontFamily ),
	caption: FontFactory.createCaption( fontFamily ),
	captionSmallFocus: FontFactory.createCaptionSmallFocus( fontFamily )
};
