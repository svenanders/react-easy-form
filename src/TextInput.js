import React from 'react';
import getNextId from './getNextId';

class TextInput extends React.Component {

	constructor(...args) {
		super(...args);
		this.state = {
			id: this.context.labelId || this.props.id ||  getNextId('select_')
		};
	}

	componentDidMount() {
		const hasInitialValue = this.context.getFormData(this.props.name) != undefined;
		if (!hasInitialValue) {
			this.context.updateFormData(this.props.name, '');
		}
	}

	handleChange(event){
		this.context.updateFormData(this.props.name, event.target.value);
	}

	controlledChange(onChangeEvent){
		onChangeEvent.bind(this);
		this.handleChange.bind(this)
	}
	
	render() {
		const {disabled, required, type, placeholder, 
			pattern, title, className, onKeyUp, value, controlled} = this.props;
			const {id} = this.state;

			if(controlled){
				return (
					<input disabled={disabled}
					id={id}
					title={title}
					pattern={pattern}
					placeholder={placeholder}
					className={className}
					ref={this.props.name}
					value={this.props.value}
				  onKeyUp = {this.onKeyUp ? this.onKeyUp.bind(this) : null}
				  onChange = { this.handleChange.bind(this) }
				  required={required}
					type={type} />
				);
			} else {
				return (
					<input disabled={disabled}
					id={id}
					title={title}
					pattern={pattern}
					placeholder={placeholder}
					className={className}
	 			  onKeyUp = {this.onKeyUp ? this.onKeyUp.bind(this) : null}
					ref={this.props.name}
					defaultValue = {this.context.getFormData(this.props.name) }
					onChange = { this.handleChange.bind(this) }
					required={required}
					type={type} />
				);
			}
	}
}

TextInput.propTypes = {
	className: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	id: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func,
	pattern: React.PropTypes.string,
	value: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	required: React.PropTypes.bool,
	title: React.PropTypes.string,
	type: (props, propName) => {
		if (!/email|text|url|password/.test(props[propName])) {
			return new Error('TextInput type must be one of email, text, url or password.');
		}
	}
};

TextInput.defaultProps = {
	disabled: false,
	required: false,
	type: 'text'
};

TextInput.contextTypes = {
	labelId: React.PropTypes.string,
	updateFormData: React.PropTypes.func,
	getFormData: React.PropTypes.func
};

export default TextInput;
