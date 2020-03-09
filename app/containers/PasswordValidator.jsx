import React from 'react';
import PasswordInput from '../components/PasswordInput';

class PasswordValidator extends React.Component {
  constructor(props) {
    super(props);
    this.minLength = 8;
    this.maxLength = 64;
    this.errorMessages = {
      length: 'Password must be between 8 and 64 characters.',
      characters: 'Password must contain only ASCII characters.',
      unique: 'Please choose a more unique password.',
    };
    this.successMessage = 'That is a darn good password right there.';
    this.state = {
      commonPasswords: [],
      password: '',
      messages: [],
    };

    this.validatePassword = this.validatePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.meetsLengthRequirements = this.meetsLengthRequirements.bind(this);
    this.isAscii = this.isAscii.bind(this);
    this.isUnique = this.isUnique.bind(this);
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

  validatePassword(e) {
    e.preventDefault();
    const { password } = this.state;
    const messageArray = [];
    !this.meetsLengthRequirements(password) && messageArray.push(this.errorMessages.length);
    !this.isAscii(password) && messageArray.push(this.errorMessages.characters);
    !this.isUnique(password) && messageArray.push(this.errorMessages.unique);
    if (messageArray.length === 0) {
      messageArray.push(this.successMessage);
    }
    this.setState({ messages: messageArray });
  }

  meetsLengthRequirements(password) {
    if ((password.length < this.minLength) || (password.length > this.maxLength)) {
      return false;
    }
    return true;
  }

  isAscii(password) {
    this.ascii = /^[ -~]+$/;
    if (this.ascii.test(password)) {
      return true;
    }
    return false;
  }

  isUnique(password) {
    const { commonPasswords } = this.state;
    if (commonPasswords.includes(password)) {
      return false;
    }
    return true;
  }

  handleChange(password) {
    this.setState({ password });
  }

  render() {
    const { password, messages } = this.state;
    return (
      <div className="passwordValidator">
        <div className="passwordValidatorInput">
          <PasswordInput
            validatePassword={this.validatePassword}
            password={password}
            onChange={this.handleChange}
          />
        </div>
        <div className="passwordValidator__message">
          {messages.map((error, i) => <span key={i}>{error}</span>)}
        </div>
      </div>
    );
  }
}

export default PasswordValidator;
