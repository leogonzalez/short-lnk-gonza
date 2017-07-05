import { Accounts } from 'meteor/accounts-base';
import React from 'react';

const PrivateHeader = (props) => {
  return (
          <div className='header'>
            <div className='header__content'>
              <h1 className='header__title'>{props.title}</h1>
              <a href='https://github.com/leogonzalez/short-lnk-gonza'
                 className='button button--link-text'
              >Project on Github</a>
              <button className='button button--link-text'
                      onClick ={() => Accounts.logout()}>
                Log Out
              </button>
            </div>
          </div>
  );
}

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default PrivateHeader;
