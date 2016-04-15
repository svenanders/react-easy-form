import React from 'react';
import getNextId from './getNextId';

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

class Select extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      id: this.context.labelId || this.props.id || getNextId('select_')
    };
  }

  componentDidMount() {
    const hasInitialValue = this.context.getFormData(this.props.name) != undefined;
    if (!isEmpty(this.props.values) && !hasInitialValue) {
      this.context.updateFormData(this.props.name, this.props.values[0]);
    }
  }

	handleChange(event){
		this.context.updateFormData(this.props.name, event.target.value);
	}

  render() {

    const {values} = this.props;
    let options = [];
    if (Array.isArray(values)) {
      options = values.map((value, index) => {
	       return (<option key={index} value={value}>{value}</option>);
      });
    } else {
			const keys = Object.keys(values);
			for (let key of keys) {
				const value = values[key];
				options.push(<option key={key} value={key}>{value}</option>);
			}
    }

    const {id} = this.state;
    const {className, disabled} = this.props;
    return (
      	<select className={className}
            		disabled={disabled}
								defaultValue = {this.context.getFormData(this.props.name) }
								onChange = { this.handleChange.bind(this) }
            		id={id}>
                {options}
      	</select>
    );
  }
};

Select.propTypes = {
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
	values: React.PropTypes.oneOfType([
		React.PropTypes.array.isRequired,
		React.PropTypes.object.isRequired
	])
};

Select.defaultProps = {
	disabled: false
};

Select.contextTypes = {
	labelId: React.PropTypes.string,
	updateFormData: React.PropTypes.func,
	getFormData: React.PropTypes.func
};

export default Select;
