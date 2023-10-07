import MobxReactForm from 'mobx-react-form';
import dvr from '../plugins/dvr';

export default class Form extends MobxReactForm {
	constructor(
		{ fields = [] } = {},
		{
			hooks,
			options = {
				validateOnChange: true,
				showErrorsOnChange: false,
				validationDebounceWait: 0
			},
			plugins = dvr
		} = {}
	) {
		super( { fields }, { options, hooks, plugins } );
	}
}
