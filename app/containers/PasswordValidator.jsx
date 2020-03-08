import React from 'react';
import PasswordInput from '../components/PasswordInput';

class PasswordValidator extends React.Component {
  constructor(props) {
    super(props);
    this.minLength = 8;
    this.maxLength = 64;
    this.errorMessages = {
      length: 'Password must be between 8 and 64 characters.',
      characters: 'Password must contain only ASCII characters',
      unique: 'Please choose a more unique password',
    };
    this.successMessage = 'That is a darn good password right there';
    this.state = {
      commonPasswords: [],
      password: '',
      errors: [],
    };

    this.validatePassword = this.validatePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const { password, commonPasswords } = this.state;
    const errArray = [];
    const ascii = /^[ -~]+$/;
    if ((password.length < this.minLength) || (password.length > this.maxLength)) {
      errArray.push(this.errorMessages.length);
    }
    if (!ascii.test(password)) {
      errArray.push(this.errorMessages.characters);
    }
    if (commonPasswords.includes(password)) {
      errArray.push(this.errorMessages.unique);
    }
    if (errArray.length === 0) {
      errArray.push(this.successMessage);
    }
    this.setState({ errors: errArray });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { password, errors } = this.state;
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
          {errors.map((error, i) => <span key={i}>{error}</span>)}
        </div>
      </div>
    );
  }
}

export default PasswordValidator;
