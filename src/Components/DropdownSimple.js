import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

class DropdownSimple extends Component {

  constructor() {
    super();

    this.state = {
      optionsLanguages: [
        { key: 1, text: 'Spanish', value: '1' },
        { key: 2, text: 'French', value: '2' },
        { key: 3, text: 'German', value: '3' },
        { key: 4, text: 'Italian', value: '4' }
      ],
      language: '',
      language_id: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e, value, key) => {
    this.setState({ language_id: value });
    this.props.handleChangeLanguage(e, value)
  }

  render() {
    const { optionsLanguages, language } = this.state
    return (
      <span>
      <Menu compact>
        <Dropdown
          text='Select Language'
          simple
          item
          value={language}
          options={optionsLanguages}
          onChange={(e, {value}) => this.handleChange(e, value, 'language')}
        />
      </Menu>
      </span>
    )
  }
}

export default DropdownSimple
