import React from 'react';

const PasswordInput = (props) => {
  const { password, checkPassword, onChange } = props;
  return (
    <form>
      Password:
      <input
        type="text"
        autoComplete="off"
        name="password"
        onChange={onChange}
        value={password}
        required
      />
      <input type="submit" value="Check" onClick={checkPassword} />
    </form>
  );
};

export default PasswordInput;
