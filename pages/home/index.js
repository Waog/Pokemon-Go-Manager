/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';

import Link from '../../components/Link';

class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  };

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>

        <div className="container-fluid enhanced text-justify">
          <div className="container">
            <div className="row vertical-align">
              <div className="hidden-xs hidden-sm col-md-4">
                <img className="img-responsive center-block" src="./logo.svg" alt="Pokemon Go Manager Logo" />
              </div>
              <div className="col-xs-6 hidden-md hidden-lg">
                <img className="img-responsive center-block" src="./logo.svg" alt="Pokemon Go Manager Logo" />
              </div>
              <div className="col-xs-6 hidden-md hidden-lg">
                <img className="img-responsive center-block" src="./pikachu.svg" alt="pikachu" />
              </div>
              <div className="col-md-4 col-xs-12">
                <h3 className="text-center">Get your Pokemons Potential</h3>
                <p>Figure out how strong your Pokemon can become and only spend resources on your best exemplars.</p>
                <p className="text-center"><Link className="btn btn-primary btn-lg" to="/ivcalc" role="button">GOTTA SCAN 'EM ALL &raquo;</Link></p>
              </div>
              <div className="hidden-xs hidden-sm col-md-4">
                <img className="img-responsive center-block" src="./pikachu.svg" alt="pikachu" />
              </div>
            </div>
          </div> {/* end row */}
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="text-center"><span className="glyphicon glyphicon-search"></span> Scan</h2>
                <p>Scan any Pokemon you catch for it's potential.</p>
                <p>Only train the Pokemons with the best genes. Become the best trainer by finding out your Pokemons hidden stats.</p>
                <p className="text-center"><Link className="btn btn-default" to="/ivcalc" role="button">Start Scanning &raquo;</Link></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="text-center"><span className="glyphicon glyphicon-ok"></span> Rate</h2>
                <p>See how good your Pokemon are at a glance.</p>
                <p>Pokemon Go Manager's IV Calculator rates your Pokemon for their overall potential. No need to dig into details of all your Pokemons.</p>
                <p className="text-center"><Link className="btn btn-default" to="/help" role="button">Learn more &raquo;</Link></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="text-center"><span className="glyphicon glyphicon-stats"></span> Analyse</h2>
                <p>Get detailed statistics of all your pokemon.</p>
                <p>Figure out their hidden stats like Attack, Defense and Stamnia values. Refine the results to any level before training your Pokemon.</p>
                <p className="text-center"><Link className="btn btn-default" to="/help" role="button">Learn more &raquo;</Link></p>
              </div>
            </div>
          </div> {/* end row */}
        </div> {/* end container */}
      </Layout>
    );
  }

}

export default HomePage;
