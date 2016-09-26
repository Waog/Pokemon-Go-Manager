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
        <div className="container text-justify">
          <div className="row">
            <div className="col-md-12">
              <div className="enhanced">
                <div className="row">
                  <div className="col-md-4">
                    <img className="img-responsive" src="./logo.svg" alt="pikachu" />
                  </div>
                  <div className="col-md-4">
                    <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                    <p className="text-center"><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                  </div>
                  <div className="col-md-4">
                    <img className="img-responsive" src="./pikachu.svg" alt="pikachu" />
                  </div>
                </div>
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
                <h2 className="text-center">Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p className="text-center"><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="text-center">Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p className="text-center"><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="text-center">Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p className="text-center"><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
              </div>
            </div>
          </div> {/* end row */}
          <hr />
          <footer>
            <p>&copy; 2016 Company, Inc.</p>
          </footer>
        </div> {/* end container */}

      </Layout>
    );
  }

}

export default HomePage;
