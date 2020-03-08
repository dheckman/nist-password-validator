import React from 'react';
import isAscii from 'validator/es/lib/isAscii';
import PasswordInput from '../components/PasswordInput';

class PasswordValidator extends React.Component {
  constructor(props) {
    super(props);
    this.minLength = 8;
    this.maxLength = 64;
    this.state = {
      commonPasswords: [],
      password: '',
      message: '',
    };

    this.checkPassword = this.checkPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.minimumCharacterCheck = this.minimumCharacterCheck.bind(this);
    this.asciiCharacterCheck = this.asciiCharacterCheck.bind(this);
    this.commonPasswordCheck = this.commonPasswordCheck.bind(this);
  }

  componentDidMount() {
    this.fetchPws();
  }

  async fetchPws() {
    const response = await fetch('http://localhost:3000/passwords');
    const passwords = await response.text();
    const commonPasswords = passwords.split(/\r?\n/);
    this.setState({ commonPasswords });
  }

  checkPassword(e) {
    e.preventDefault();
    this.minimumCharacterCheck();
    this.asciiCharacterCheck();
    this.commonPasswordCheck();
  }

  minimumCharacterCheck() {
    const { password } = this.state;
    let message;
    if (password.length < this.minLength || password.length > this.maxLength) {
      message = 'Password must be between 8 and 64 characters.';
    }
    this.setState({ message });
  }

  asciiCharacterCheck() {
    const { password } = this.state;
    if (!isAscii(password)) {
      this.setState({ message: 'Password must contain only ASCII characters.' });
    }
  }

  commonPasswordCheck() {
    const { password, commonPasswords } = this.state;
    if (commonPasswords.includes(password)) {
      this.setState({ message: 'Please choose a more unique password.' });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { password, message } = this.state;
    return (
      <>
        <PasswordInput
          checkPassword={this.checkPassword}
          password={password}
          onChange={this.handleChange}
        />
        {message}
      </>
    );
  }
}

export default PasswordValidator;
