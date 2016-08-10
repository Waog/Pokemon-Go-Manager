/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import PokeList from '../../components/PokeList';

class PokeListPage extends React.Component {

  render() {
    return (
      <Layout className={s.content}>
        <h1>PokeList</h1>
        <PokeList pokemon={OWNED_POKEMON}/>
      </Layout>
    );
  }

}

var OWNED_POKEMON = [
  {name: 'Pidgey', cp: '123'},
  {name: 'Rattata', cp: '456'},
  {name: 'Drowzee', cp: '789'}
];

export default PokeListPage;
