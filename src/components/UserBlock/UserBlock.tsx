import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApps';
import { userDelete } from '../../store/userSlice';

function UserBlock(): JSX.Element  {


  const user = useAppSelector((state) => state.user.user);
  const token = user.token;
  const dispatch = useAppDispatch();

  const SignOut = () => {
    dispatch(userDelete());
  };

  const userBlock = (token !== undefined) ?
    (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to='/mylist'>
              <img
                src={user.avatar_url}
                alt="User avatar"
                width="63"
                height="63"
              />
            </Link>

          </div>
        </li>
        <Link to='/'>
          <li onClick={SignOut} className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </Link>
      </ul>
    )
    :
    (
      <ul className="user-block">
        <li className="user-block__item">
          <Link to='/login' className="user-block__link">Sign in</Link>
        </li>
      </ul>
    );
  return (
    userBlock
  );

}

export default UserBlock;
