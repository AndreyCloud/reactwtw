import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useApps';

function UserBlock(): JSX.Element  {


  const user = useAppSelector((state) => state.user.user);
  // const token = useAppSelector((state) => state.user.token);
  const token = user.token;

  // eslint-disable-next-line no-console
  console.log(token);

  const userBlock = (token !== '') ?
    (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img
              src={user.avatar_url}
              alt="User avatar"
              width="63"
              height="63"
            />
          </div>
        </li>
        <li className="user-block__item">
          <a className="user-block__link">Sign out</a>
        </li>
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {userBlock}
    </>

  );

}

export default UserBlock;
