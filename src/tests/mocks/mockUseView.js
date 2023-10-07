const mockUseView = ( hook, view ) => {
	jest.spyOn( hook, 'default' );
	hook.default.mockImplementation( () => view );

	return view;
};

export default mockUseView;
