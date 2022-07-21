import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApps';
import { fetchLogin } from '../../store/userSlice';

function SignIn(): JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email cannot be empty!');
  const [passwordlError, setPasswordError] = useState('Password cannot be empty!');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordlError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordlError]);

  const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    switch(e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  const EmailHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {

    setEmail(e.target.value);

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('not correct email');
      if(!e.target.value) {
        setEmailError('Email cannot be empty!');
      }
    } else {
      setEmailError('');
    }
  };

  const PasswordHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {

    setPassword(e.target.value);

    const re = /(?=.*[0-9])(?=.*[a-z])/g;

    if(!re.test(String(e.target.value).toLowerCase())) {
      setPasswordError('must have at least one letter and one number');
      if(!e.target.value) {
        setPasswordError('Password cannot be empty!');
      }
    } else {
      setPasswordError('');
    }
  };

  const user = {email, password};
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.error);
  const loading = useAppSelector((state) => state.user.loadingUser);
  const navigate = useNavigate();
  const goMain = () => navigate('/');

  function sendLogin(e: { preventDefault: () => void; })  {
    e.preventDefault();
    dispatch(fetchLogin(user));
    if(!error && loading) {
      goMain();
    }
  }

  return (
    <div>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to='/' className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form onSubmit={sendLogin} action="#" className="sign-in__form">
            <div className="sign-in__fields">
              <div className="sign-in__field">
                {(emailDirty && emailError) && <p style={{color: 'red'}}>{emailError}</p>}
                <input
                  onBlur={(e) => blurHandler(e)}
                  onChange={(e) => EmailHandler(e)}
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-email"
                >
                  Email address
                </label>
              </div>
              <div className="sign-in__field">
                {(passwordDirty && passwordlError) && <p style={{color: 'red'}}>{passwordlError}</p>}
                <input
                  onBlur={(e) => blurHandler(e)}
                  onChange={(e) => PasswordHandler(e)}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-password"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button
                disabled = {!formValid}
                className="sign-in__btn"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <Link to='/' className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SignIn;
