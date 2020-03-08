import React from 'react';

const PasswordInput = (props) => {
  const { password, validatePassword, onChange } = props;
  return (
    <>
      <span className="passwordValidatorInput__label">Password:</span>
      <input
        type="text"
        autoComplete="off"
        name="password"
        onChange={onChange}
        value={password}
        required
        className="passwordValidatorInput__input"
      />
      <input type="submit" value="CHECK" onClick={validatePassword} className="passwordValidatorInput__button" />
    </>
  );
};

export default PasswordInput;
