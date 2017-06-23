import React from 'react';

import LinksList from './LinksList.js';
import PrivateHeader from './PrivateHeader.js';
import AddLink from './AddLink.js';
import LinksListFilter from './LinksListFilter.js';


export default () => {
  return (
    <div>
      <PrivateHeader title='My Links List'/>
      <div className='page--content'>
        <LinksListFilter/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
}
