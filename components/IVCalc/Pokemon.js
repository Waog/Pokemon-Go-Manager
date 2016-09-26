import React from 'react';
import VisibleValues from './VisibleValues'

const ivCalculator = require('pokemon-go-iv-calculator');

class Pokemon extends React.Component {

  handleDelete = () => {
    this.props.deleteListener(this.props.pokemon.id);
  }

  handleAddValueSet = () => {
    this.props.addValueSetListener(this.props.pokemon.id);
  }

  getImage = () => {
    try {
      return require('../../node_modules/slack-pokemon-emoji/images/' + this.getImageName());
    } catch(err) {
      return require('./unknown.png');
    }
  }

  getImageName = () => {
    if (this.isNidoranFemale()) {
      return 'nidoran♀.png';
    } else if (this.isNidoranMale()) {
      return 'nidoran♂.png';
    } else {
      return this.props.pokemon.name.toLowerCase() + '.png';
    }
  }

  isNidoranFemale = () => {
    var regex = /nidoran.*(♀|f)/i;
    if (this.props.pokemon.name.match(regex)) {
      return true;
    }
    return false;
  }

  isNidoranMale = () => {
    var regex = /nidoran.*(♂|m)/i;
    if (!this.isNidoranFemale() && this.props.pokemon.name.match(regex)) {
      return true;
    }
    return false;
  }

  handleNameChange = () => {
    this.props.nameChangeListener(this.props.pokemon.id,
      this.refs.name.value);
  }

  fetchIVs = () => {

    this.fetchedIVs = {};

    this.fetchedIVs.attMin = 1000;
    this.fetchedIVs.attMax = -1;

    this.fetchedIVs.defMin = 1000;
    this.fetchedIVs.defMax = -1;

    this.fetchedIVs.stamMin = 1000;
    this.fetchedIVs.stamMax = -1;

    this.fetchedIVs.levelMin = 1000;
    this.fetchedIVs.levelMax = -1;

    this.fetchedIVs.perfectionMin = 1000;
    this.fetchedIVs.perfectionMax = -1;

    this.fetchedIVs.error = undefined;

    this.fetchedIVs.raw = [];
    for (var valueSetIndex = 0; valueSetIndex < this.props.pokemon.valueSets.length; valueSetIndex++) {
      try {
        this.fetchedIVs.raw[valueSetIndex] = ivCalculator.evaluate(this.getEvalName(), this.props.pokemon.valueSets[valueSetIndex].cp, this.props.pokemon.valueSets[valueSetIndex].hp, this.props.pokemon.valueSets[valueSetIndex].stardust);
      } catch (err) {
        this.fetchedIVs.error = 'unable to evaluate values';
        console.log('fetchIVs: ', this.fetchedIVs);
        return;
      }
      if (this.fetchedIVs.raw[valueSetIndex].error) {
        this.fetchedIVs.error = this.fetchedIVs.raw[valueSetIndex].error;
        return;
      }
    }

    this.fetchedIVs.intersected = this.getIntersection(this.fetchedIVs.raw);

    for (var ivIndex = 0; ivIndex < this.fetchedIVs.intersected.length; ivIndex++) {
      var curIVs = this.fetchedIVs.intersected[ivIndex];
      this.fetchedIVs.attMin = this.fetchedIVs.attMin > curIVs.attackIV ? curIVs.attackIV : this.fetchedIVs.attMin;
      this.fetchedIVs.attMax = this.fetchedIVs.attMax < curIVs.attackIV ? curIVs.attackIV : this.fetchedIVs.attMax;

      this.fetchedIVs.defMin = this.fetchedIVs.defMin > curIVs.defenseIV ? curIVs.defenseIV : this.fetchedIVs.defMin;
      this.fetchedIVs.defMax = this.fetchedIVs.defMax < curIVs.defenseIV ? curIVs.defenseIV : this.fetchedIVs.defMax;

      this.fetchedIVs.stamMin = this.fetchedIVs.stamMin > curIVs.staminaIV ? curIVs.staminaIV : this.fetchedIVs.stamMin;
      this.fetchedIVs.stamMax = this.fetchedIVs.stamMax < curIVs.staminaIV ? curIVs.staminaIV : this.fetchedIVs.stamMax;

      this.fetchedIVs.levelMin = this.fetchedIVs.levelMin > curIVs.level ? curIVs.level : this.fetchedIVs.levelMin;
      this.fetchedIVs.levelMax = this.fetchedIVs.levelMax < curIVs.level ? curIVs.level : this.fetchedIVs.levelMax;

      this.fetchedIVs.perfectionMin = this.fetchedIVs.perfectionMin > curIVs.perfection ? curIVs.perfection : this.fetchedIVs.perfectionMin;
      this.fetchedIVs.perfectionMax = this.fetchedIVs.perfectionMax < curIVs.perfection ? curIVs.perfection : this.fetchedIVs.perfectionMax;
    }
  }

  getEvalName() {
    if(this.isNidoranFemale()) {
      return 'nidoran_female';
    } else if (this.isNidoranMale()) {
      return 'nidoran_male';
    } else {
      return this.props.pokemon.name;
    }
  }

  getPerfectionMinPercent = () => {
    return Math.floor(this.fetchedIVs.perfectionMin * 100);
  }

  getPerfectionMaxPercent = () => {
    return Math.floor(this.fetchedIVs.perfectionMax * 100);
  }

  getIntersection = (rawSets) => {

    let ivsToRawMap = new Map();

    for (let rawIVSet of rawSets) {
      for (let rawIVs of rawIVSet.ivs) {
        if(! ivsToRawMap.has(this.getKey(rawIVs))) {
          ivsToRawMap.set(this.getKey(rawIVs), []);
        }
        ivsToRawMap.get(this.getKey(rawIVs)).push(rawIVs);
      }
    }

    let ivsToRawMapOnlyInAllSets = new Map([...ivsToRawMap].filter(x => {return x[1].length == rawSets.length}));
    let ivsToRawMapOnlyInAllSetsHighestLevel = [...ivsToRawMapOnlyInAllSets].map(function(keyValPair){
              var ivsWithMaxLevel = {};
              ivsWithMaxLevel.level = -1;
              for (let ivs of keyValPair[1]) {
                ivsWithMaxLevel = ivs.level > ivsWithMaxLevel.level ? ivs : ivsWithMaxLevel;
              }
              return ivsWithMaxLevel;
            });

    return ivsToRawMapOnlyInAllSetsHighestLevel;
  }

  getKey = (rawIVs) => {
    return 'a' + rawIVs.attackIV + '_d' + rawIVs.defenseIV + '_s' + rawIVs.staminaIV;
  }

  getDetailedStats = () => {

    if (this.fetchedIVs.error) {
      return <p>{this.fetchedIVs.error}</p>
    } else if (this.fetchedIVs.intersected.length == 0) {
      return <p> No Combinations for these inputs</p>
    } else {
      return <div className="row">
        <div className="col-md-4">
          {this.getAttrProgressBar(this.fetchedIVs.attMin, this.fetchedIVs.attMax)}
          Att: {this.fetchedIVs.attMin} - {this.fetchedIVs.attMax}
          &nbsp;<span className="tooltip-trigger glyphicon glyphicon-info-sign">
            <div className="tooltiptext">
              <p>Your {this.props.pokemon.name} has an <em>IV attack bonus</em> of at least {this.fetchedIVs.attMin} and at most {this.fetchedIVs.attMax}.</p>
              <p>
                Pokemons can have an <em>IV attack bonus</em> between 0 and 15. The higher the attack, the more damage the Pokemon deals in battles.
                The <em>IV attack bonus</em> just makes up a small part of the <em>total attack value</em>, which is the sum of a pokemons <em>base attack value</em> and it's <em>IV attack bonus</em>.
              </p>
              <p>
                E.g. Mewtwo has a <em>base attack value</em> of 284. Together with his <em>IV attack bonus</em> (0 to 15), Mewtwos <em>total attack value</em> is between 284 and 299.
              </p>
            </div>
          </span>
        </div>
        <div className="col-md-4">
          {this.getAttrProgressBar(this.fetchedIVs.defMin, this.fetchedIVs.defMax)}
          Def: {this.fetchedIVs.defMin} - {this.fetchedIVs.defMax}
          &nbsp;<span className="tooltip-trigger glyphicon glyphicon-info-sign">
            <div className="tooltiptext">
              <p>Your {this.props.pokemon.name} has an <em>IV defense bonus</em> of at least {this.fetchedIVs.defMin} and at most {this.fetchedIVs.defMax}.</p>
              <p>
                Pokemons can have an <em>IV defense bonus</em> between 0 and 15. The higher the defense, the less damage the Pokemon takes in battles.
                The <em>IV defense bonus</em> just makes up a small part of the <em>total defense value</em>, which is the sum of a pokemons <em>base defense value</em> and it's <em>IV defense bonus</em>.
              </p>
              <p>
                E.g. Mewtwo has a <em>base defense value</em> of 202. Together with his <em>IV defense bonus</em> (0 to 15), Mewtwos <em>total defense value</em> is between 202 and 217.
              </p>
            </div>
          </span>
        </div>
        <div className="col-md-4">
          {this.getAttrProgressBar(this.fetchedIVs.stamMin, this.fetchedIVs.stamMax)}
          Stamnia: {this.fetchedIVs.stamMin} - {this.fetchedIVs.stamMax}
          &nbsp;<span className="tooltip-trigger glyphicon glyphicon-info-sign">
            <div className="tooltiptext">
              <p>Your {this.props.pokemon.name} has an <em>IV stamnia bonus</em> of at least {this.fetchedIVs.stamMin} and at most {this.fetchedIVs.stamMax}.</p>
              <p>
                Pokemons can have an <em>IV stamnia bonus</em> between 0 and 15. The higher the stamnia, the more hit points the pokemon has.
                The <em>IV stamnia bonus</em> just makes up a small part of the <em>total stamnia value</em>, which is the sum of a pokemons <em>base stamnia value</em> and it's <em>IV stamnia bonus</em>.
              </p>
              <p>
                E.g. Mewtwo has a <em>base stamnia value</em> of 212. Together with his <em>IV stamnia bonus</em> (0 to 15), Mewtwos <em>total stamnia value</em> is between 212 and 227.
              </p>
            </div>
          </span>
        </div>
      </div>
    }
  }

  getPercentPerfection = () => {
    if (this.fetchedIVs.perfectionMin > this.fetchedIVs.perfectionMax) {
      return (
        <span>
          No Combinations
          &nbsp;<span className="tooltip-trigger glyphicon glyphicon-info-sign">
            <div className="tooltiptext">
              No {this.props.pokemon.name} with these values exists. <br/>
              Please check if your entered values are correct.
            </div>
          </span>
        </span>
      )
    } else {
      return (
        <span>
          {this.getPerfectionMinPercent()} - {this.getPerfectionMaxPercent()}%
          &nbsp;<h4 className="tooltip-trigger glyphicon glyphicon-info-sign">
            <div className="tooltiptext">
              This shows how <em>perfect</em> your Pokemon is. <br/>
              It is at least {this.getPerfectionMinPercent()}% and at most {this.getPerfectionMaxPercent()}% perfect.
            </div>
          </h4>
        </span>
      )
    }
  }

  getProgressBar = (minPercent, maxPercent) => {
    if (minPercent > maxPercent) {
      return <div className="progress">
          <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{width: 100 + '%'}}>
            <span className="sr-only">100% Complete (danger)</span>
          </div>
        </div>
    } else {
      return <div className="progress">
          <div className="progress-bar progress-bar-success" style={{width: minPercent + '%'}}>
            <span className="sr-only">{minPercent}% Complete (success)</span>
          </div>
          <div className="progress-bar progress-bar-warning progress-bar-striped active" style={{width: (maxPercent - minPercent) + '%'}}>
            <span className="sr-only">{maxPercent / minPercent}% Complete (warning)</span>
          </div>
        </div>
    }
  }

  getAttrProgressBar = (attrMin, attrMax) => {
    return this.getProgressBar(attrMin / 15.0 * 100.0, attrMax / 15.0 * 100.0)
  }

  render() {
    this.fetchIVs();
    var rows = [];
    rows.push(<VisibleValues valueSet={this.props.pokemon.valueSets[0]} key={this.props.pokemon.valueSets[0].id} changeListener={this.props.changeValueSetListener} undeletable />);
    for (var i = 1; i < this.props.pokemon.valueSets.length; i++) {
      rows.push(<VisibleValues valueSet={this.props.pokemon.valueSets[i]} key={this.props.pokemon.valueSets[i].id} changeListener={this.props.changeValueSetListener} deleteListener={this.props.deleteValueSetListener} />);
    }
    var detailedStats = this.getDetailedStats();
    var percentPerfection = this.getPercentPerfection();
    var progressBar = this.getProgressBar(this.getPerfectionMinPercent(), this.getPerfectionMaxPercent());
    return (
      <div className="row text-center pokecard">
        <div className="col-md-12">
          <div className="pokeball-wrapper"><img src="./pokemongo_bootstrap/images/pokeball.png" /></div>
          <div className="enhanced">
            <h1 className="row vertical-align">
              <div className="col-md-3"><img className="img-responsive center-block pokeimage" src={this.getImage()} alt={this.props.pokemon.name} /></div>
              <div className="col-md-8">
                <div className="form-group input-group input-group-lg">
                  <input type="text" className="form-control" ref="name" placeholder="Pidgey" value={this.props.pokemon.name} onChange={this.handleNameChange} />
                  <span className="input-group-addon tooltip-trigger glyphicon glyphicon-info-sign">
                    <span className="tooltiptext-left">Enter the <em>name</em> of the Pokemon to analyze here, e.g. 'Rattata' or 'Pidgey'</span>
                  </span>
                </div>
                {progressBar}
                {percentPerfection}
                <p>{this.fetchedIVs.intersected.length} Combinations; Level: {this.fetchedIVs.levelMin} - {this.fetchedIVs.levelMax};</p>
              </div>
              <div className="btn btn-danger tooltip-trigger glyphicon glyphicon-trash" onClick={this.handleDelete} >
                <span className="tooltiptext-left" style={{width: 12 + 'em'}}>Delete this Pokemon</span>
              </div>
            </h1>
            {detailedStats}

            <table className="table">
              <thead>
                <tr>
                  <th>
                    CP
                    &nbsp;<span className="tooltip-trigger glyphicon glyphicon-info-sign">
                      <div className="tooltiptext-right">
                        <p>Enter the current CP value of your Pokemon here.</p>
                        <p>
                          You can find the CP in the top of the Pokemons details screen:
                          <img className="img-responsive center-block img-rounded" src={require('./cp.png')} />
                        </p>
                      </div>
                    </span>
                  </th>
                  <th>
                    HP
                    &nbsp;<span className="tooltip-trigger glyphicon glyphicon-info-sign">
                      <div className="tooltiptext">
                        <p>Enter the current max HP value of your Pokemon here.</p>
                        <p>
                          You can find the max HP below the Pokemons name in the details screen:
                          <img className="img-responsive center-block img-rounded" src={require('./hp.png')} />
                        </p>
                      </div>
                    </span>
                  </th>
                  <th>
                    Stardust
                    &nbsp;<span className="tooltip-trigger glyphicon glyphicon-info-sign">
                      <div className="tooltiptext-left">
                        <p>Enter the Stardust cost for the next <em>Power Up</em> of your Pokemon here.</p>
                        <p>
                          You can find the Stardust costs on the Power Up Button in the Pokemons details screen:
                          <img className="img-responsive center-block img-rounded" src={require('./stardust-costs.png')} />
                        </p>
                      </div>
                    </span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows}
                <tr>
                  <td colSpan="4">
                    <div className="btn btn-success tooltip-trigger glyphicon glyphicon-plus" onClick={this.handleAddValueSet} >
                      <span className="tooltiptext">
                        <p>Add another value set.
                        Use this to reduce the possible combinations of your pokemons IV values.</p>

                        <p>After entering CP, HP and Stardust for your Pokemon level it up once and enter the new values.
                        If you do this often enough you'll get the precise IV values of your pokemon.</p>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Pokemon;
