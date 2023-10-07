import Font from '../../structures/Font.structure';

describe( 'Font', () => {
	describe( '@new', () => {
		it( 'creates the font correctly', () => {
			const fontFamily = 'fontFamily.black';
			const fontSize = 14;
			const lineHeight = 20;
			const letterSpacing = 0;
			const fontWeight = '500';
			const createdFont = new Font( {
				fontFamily,
				fontSize,
				lineHeight,
				letterSpacing,
				fontWeight
			} );

			expect( createdFont ).toMatchObject( {
				fontFamily,
				fontSize,
				lineHeight,
				letterSpacing,
				fontWeight
			} );
		} );
	} );
} );
