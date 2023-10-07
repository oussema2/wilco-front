import DateToDisplay from '../../../presenters/ToDisplay/DateToDisplay';

describe( 'DateToDisplay', () => {
	describe( '@displayShort', () => {
		describe( 'when the date is between today', () => {
			describe( 'when the date is earlier than a minute ago', () => {
				const halfAMinuteAgo = new Date();
				halfAMinuteAgo.setSeconds( halfAMinuteAgo.getSeconds() - 30 );
				const dateDisplayer = new DateToDisplay( { date: halfAMinuteAgo } );

				it( 'returns the just now text', () => {
					const expectedDate = 'Just now';
					expect( dateDisplayer.displayShort ).toEqual( expectedDate );
				} );
			} );

			describe( 'when the date is earlier than an hour ago', () => {
				const halfAnHourAgo = new Date();
				halfAnHourAgo.setMinutes( halfAnHourAgo.getMinutes() - 30 );
				const dateDisplayer = new DateToDisplay( { date: halfAnHourAgo } );

				it( 'returns the difference in minutes rounded down', () => {
					const dateDiff = new Date().getTime() - halfAnHourAgo.getTime();
					const expectedDate = `${Math.floor( dateDiff / ( 1000 * 60 ) )}m`;
					expect( dateDisplayer.displayShort ).toEqual( expectedDate );
				} );
			} );

			describe( 'when the date is later than an hour ago', () => {
				const oneHourAgo = new Date();
				oneHourAgo.setHours( oneHourAgo.getHours() - 1 );
				const dateDisplayer = new DateToDisplay( { date: oneHourAgo } );

				it( 'returns the difference in hours rounded down', () => {
					const dateDiff = new Date().getTime() - oneHourAgo.getTime();
					const expectedDate = `${Math.floor( dateDiff / ( 1000 * 60 * 60 ) )}h`;
					expect( dateDisplayer.displayShort ).toEqual( expectedDate );
				} );
			} );
		} );

		describe( 'when the date is yesterday', () => {
			const yesterday = new Date();
			yesterday.setHours( yesterday.getHours() - 24 );
			const dateDisplayer = new DateToDisplay( { date: yesterday } );

			it( 'returns the correct date', () => {
				const hours = yesterday.getHours().toLocaleString( 'en-US', {
					minimumIntegerDigits: 2, useGrouping: false
				} );
				const minutes = yesterday.getMinutes().toLocaleString( 'en-US', {
					minimumIntegerDigits: 2, useGrouping: false
				} );
				const dateHour = `${hours}:${minutes}`;
				const expectedDate = `Yesterday at ${dateHour}`;
				expect( dateDisplayer.displayShort ).toEqual( expectedDate );
			} );
		} );

		describe( 'when the date is before yesterday', () => {
			const oldDate = new Date( '2021-01-01' );
			const dateDisplayer = new DateToDisplay( { date: oldDate } );

			it( 'returns the correct date', () => {
				const expectedDate = 'January 1 at 00:00';
				expect( dateDisplayer.displayShort ).toEqual( expectedDate );
			} );
		} );
	} );

	describe( '@displayFull', () => {
		describe( 'when the date is from today', () => {
			const today = new Date();
			today.setHours( 17 );
			today.setMinutes( 32 );
			const dateDisplayer = new DateToDisplay( { date: today } );

			it( 'returns the time with the "Today" word', () => {
				const expectedDate = 'Today, 17:32';
				expect( dateDisplayer.displayFull ).toEqual( expectedDate );
			} );
		} );

		describe( 'when the date from yesterday', () => {
			const yesterday = new Date();
			yesterday.setHours( 5 - 24 );
			yesterday.setMinutes( 46 );
			const dateDisplayer = new DateToDisplay( { date: yesterday } );

			it( 'returns the time with the "Yesterday" word', () => {
				const expectedDate = 'Yesterday, 05:46';
				expect( dateDisplayer.displayFull ).toEqual( expectedDate );
			} );
		} );

		describe( 'when the date is before yesterday', () => {
			const oldDate = new Date( '2021-04-16 12:36' );
			const dateDisplayer = new DateToDisplay( { date: oldDate } );

			it( 'returns the date and time including the weekday', () => {
				const expectedDate = 'Friday 16 Apr, 12:36';
				expect( dateDisplayer.displayFull ).toEqual( expectedDate );
			} );
		} );
	} );

	describe( '@hourAndMinutes', () => {
		describe( 'when the hour has one digit', () => {
			const hourAndMinutes = '01:41';
			const date = new Date( `2021-06-29T${hourAndMinutes}:55.075Z` );
			const dateToDisplay = new DateToDisplay( { date } );

			it( 'returns the hours with two digits', () => {
				expect( dateToDisplay.hourAndMinutes ).toEqual( hourAndMinutes );
			} );
		} );

		describe( 'when the minute has one digit', () => {
			const hourAndMinutes = '13:05';
			const date = new Date( `2021-06-29T${hourAndMinutes}:55.075Z` );
			const dateToDisplay = new DateToDisplay( { date } );

			it( 'returns the hours with two digits', () => {
				expect( dateToDisplay.hourAndMinutes ).toEqual( hourAndMinutes );
			} );
		} );
	} );

	describe( '@monthAndDate', () => {
		describe( 'when the day has one digit', () => {
			const date = new Date( '2021-06-01T01:41:55.075Z' );
			const dateToDisplay = new DateToDisplay( { date } );

			it( 'returns the month and day with two digits', () => {
				expect( dateToDisplay.monthAndDate ).toEqual( 'Jun. 1' );
			} );
		} );

		describe( 'when the day has two digit', () => {
			const date = new Date( '2021-06-30T01:41:55.075Z' );
			const dateToDisplay = new DateToDisplay( { date } );

			it( 'returns the month and day with two digits', () => {
				expect( dateToDisplay.monthAndDate ).toEqual( 'Jun. 30' );
			} );
		} );
	} );

	describe( '@monthAndDateShort', () => {
		describe( 'when the day has one digit', () => {
			const date = new Date( '2021-06-01T01:41:55.075Z' );
			const dateToDisplay = new DateToDisplay( { date } );

			it( 'returns the month and day with two digits', () => {
				expect( dateToDisplay.monthAndDateShort ).toEqual( '06/01' );
			} );
		} );

		describe( 'when the day has two digit', () => {
			const date = new Date( '2021-06-30T01:41:55.075Z' );
			const dateToDisplay = new DateToDisplay( { date } );

			it( 'returns the month and day with two digits', () => {
				expect( dateToDisplay.monthAndDateShort ).toEqual( '06/30' );
			} );
		} );

		describe( 'when the month has two digit', () => {
			const date = new Date( '2021-12-01T01:41:55.075Z' );
			const dateToDisplay = new DateToDisplay( { date } );

			it( 'returns the month and day with two digits', () => {
				expect( dateToDisplay.monthAndDateShort ).toEqual( '12/01' );
			} );
		} );
	} );
} );
