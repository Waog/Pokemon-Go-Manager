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
        <div className="col-md-3">{this.fetchedIVs.intersected.length} Combinations; Level: {this.fetchedIVs.levelMin} - {this.fetchedIVs.levelMax};</div>
        <div className="col-md-3">Att: {this.fetchedIVs.attMin} - {this.fetchedIVs.attMax} {this.getAttrProgressBar(this.fetchedIVs.attMin, this.fetchedIVs.attMax)}</div>
        <div className="col-md-3">Def: {this.fetchedIVs.defMin} - {this.fetchedIVs.defMax} {this.getAttrProgressBar(this.fetchedIVs.defMin, this.fetchedIVs.defMax)}</div>
        <div className="col-md-3">Stamnia: {this.fetchedIVs.stamMin} - {this.fetchedIVs.stamMax} {this.getAttrProgressBar(this.fetchedIVs.stamMin, this.fetchedIVs.stamMax)}</div>
      </div>
    }
  }

  getPercentPerfection = () => {
    if (this.fetchedIVs.perfectionMin > this.fetchedIVs.perfectionMax) {
      return <span>No Combinations</span>
    } else {
      return <span>{this.getPerfectionMinPercent()} - {this.getPerfectionMaxPercent()}%</span>
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
      <div className="list-group">
        <div className="list-group-item list-group-item-success">
          <h1 className="row">
            <div className="col-md-3"><img src={this.getImage()} alt={this.props.pokemon.name} /></div>
            <div className="col-md-4"><input type="text" className="form-control input-lg" ref="name" placeholder="Pidgey" value={this.props.pokemon.name} onChange={this.handleNameChange} /></div>
            <div className="col-md-4">
              {progressBar}
              {percentPerfection}
            </div>
            <div className="btn btn-danger" onClick={this.handleDelete} >X</div>
          </h1>
        </div>
        <div className="list-group-item">
          {detailedStats}
        </div>
        <div className="list-group-item">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>CP</th>
                <th>HP</th>
                <th>Stardust</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows}
              <tr>
                <td colSpan="4">
                  <div className="btn btn-success" onClick={this.handleAddValueSet} >+</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Pokemon;
