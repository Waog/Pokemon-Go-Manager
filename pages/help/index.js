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

        <div className="container page-header">
          <img className="img-responsive" src="./logo-horizontal.svg" alt="pikachu" />
          <img className="img-responsive center-block subheading" style={{height: 4.5 + 'em'}} src="./help-subheading.svg" alt="IV Calculator" />
        </div>

        <div className="container help-container">
          <div className="row">
            <div className="col-xs-12 help-div">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="help-question"><span className="glyphicon glyphicon-question-sign"></span> What is an IV Value?</h2>
                <p>IV is short for 'Individual Values', they are also called 'Hidden Stats'.</p>

                <p>In Pokemon Go, there are three hidden stats, or Individual Values (IV). These hidden stats affect how strong your Pokemon is in Gym Battles, beyond the Pokemon's CP rating, which the game shows you:</p>
                <ul>
                  <li>Attack</li>
                  <li>Defense</li>
                  <li>Stamina</li>
                </ul>
                <p>Stamina affects HP, which you can see, but the Attack and Defense stats are otherwise hidden. These were discovered from data mining by The Silph Road.</p>
                <p>Each Pokemon species have different base stats. For example, Chansey are known to have incredibly high Stamina, Flareon have high Attack, and Golem have high Defense.</p>
                <p>Though these base stats sometimes correlate with the values in the main Pokemon series, you can't always count on your knowledge to transfer over. For example, Gyarados in the main Pokemon series is generally utilized for its high Attack stat, however, in Pokemon Go, Gyarados' highest stat is Defense.</p>
                <p>Beyond Pokemon species base stats, each individual Pokemon has its own set of hidden values that affect its potential for Attack, Defense, and Stamina. These are called Individual Values, or IVs, and range from 0 to 15.</p>
              </div>
            </div>

            <div className="col-xs-12 help-div">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="help-question"><span className="glyphicon glyphicon-question-sign"></span> What is the IV Attack bonus?</h2>
                <p>Each of your pokemon has an <em>IV attack bonus</em> between 0 and 15.</p>
                <p>
                  The higher the attack, the more damage the Pokemon deals in battles.
                  The <em>IV attack bonus</em> just makes up a small part of the <em>total attack value</em>, which is the sum of a pokemons <em>base attack value</em> and it's <em>IV attack bonus</em>.
                </p>
                <p>
                  E.g. Mewtwo has a <em>base attack value</em> of 284. Together with his <em>IV attack bonus</em> (0 to 15), Mewtwos <em>total attack value</em> is between 284 and 299.
                </p>
              </div>
            </div>


            <div className="col-xs-12 help-div">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="help-question"><span className="glyphicon glyphicon-question-sign"></span> What is the IV Defense bonus?</h2>
                <p>Each of your pokemon has an <em>IV defense bonus</em> between 0 and 15.</p>
                <p>
                  The higher the defense, the less damage the Pokemon takes in battles.
                  The <em>IV defense bonus</em> just makes up a small part of the <em>total defense value</em>, which is the sum of a pokemons <em>base defense value</em> and it's <em>IV defense bonus</em>.
                </p>
                <p>
                  E.g. Mewtwo has a <em>base defense value</em> of 202. Together with his <em>IV defense bonus</em> (0 to 15), Mewtwos <em>total defense value</em> is between 202 and 217.
                </p>
              </div>
            </div>


            <div className="col-xs-12 help-div">
              <div className="pokeball-wrapper">
                <img src="./pokemongo_bootstrap/images/pokeball.png" />
              </div>
              <div className="enhanced">
                <h2 className="help-question"><span className="glyphicon glyphicon-question-sign"></span> What is the IV Stamnia bonus?</h2>
                <p>Each of your pokemon has an <em>IV stamnia bonus</em> between 0 and 15.</p>
                <p>
                  The higher the stamnia, the more hit points the pokemon has.
                  The <em>IV stamnia bonus</em> just makes up a small part of the <em>total stamnia value</em>, which is the sum of a pokemons <em>base stamnia value</em> and it's <em>IV stamnia bonus</em>.
                </p>
                <p>
                  E.g. Mewtwo has a <em>base stamnia value</em> of 212. Together with his <em>IV stamnia bonus</em> (0 to 15), Mewtwos <em>total stamnia value</em> is between 212 and 227.
                </p>
              </div>
            </div>
          </div> {/* end row */}
        </div> {/* end container */}

      </Layout>
    );
  }

}

export default HomePage;
