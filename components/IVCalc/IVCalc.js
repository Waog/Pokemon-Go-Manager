import React from 'react';
import Pokemon from './Pokemon'
var restClient = require('./RestClient');
var _ = require('lodash');

class IVCalc extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemonSet: [
        {id: 1, name: 'Charmander', valueSets:[
          {id: 1.1, cp: 518, hp: 54, stardust: 2500},
          {id: 1.2, cp: 531, hp: 55, stardust: 2500}
        ]
      }
      ]
    };
  }

  componentDidMount() {
    executeWhenLoginRdy(this.onLogin);
  }

  componentWillUnmount() {
    dontExecuteWhenLoginRdyAnymore(this.onLogin);
  }

  onLogin = () => {
    restClient.getTrainer(googleUser.getBasicProfile().getId(), this.onTrainerLoaded);
  }

  onTrainerLoaded = (trainer) => {
    if (! trainer) {
      restClient.createTrainer({
        googleID: googleUser.getBasicProfile().getId(),
        name: googleUser.getBasicProfile().getName(),
        pokemonSet: this.state.pokemonSet
      }, this.onTrainerLoaded);
      return;
    }

    this.state._id = trainer._id;
    this.state.pokemonSet = trainer.pokemonSet;
    this.setState(this.state);
  }

  componentDidUpdate() {
    if (this.state._id) {
      restClient.updateTrainer({
          _id: this.state._id,
          pokemonSet: this.state.pokemonSet
      });
    }
  }

  idChanger = (value, key) => {
    if (key == 'id') {
      return Math.random();
    }
  }

  addNewPokemon = () => {

    var newPokemon;
    if (this.state.pokemonSet.length > 0) {
      newPokemon = _.cloneDeepWith(this.state.pokemonSet[this.state.pokemonSet.length - 1], this.idChanger);
    } else {
      newPokemon = {id: Math.random(), name: 'Pidgey', valueSets:[
          {id: Math.random(), cp: 76, hp: 26, stardust: 600}
        ]
      }
    }
    this.state.pokemonSet.push(newPokemon);
    this.setState(this.state);
  }

  deleteValueSet = (id) => {
    // TODO: query and manipulate json more elegant
    for (var pokeIndex = this.state.pokemonSet.length - 1; pokeIndex >= 0; pokeIndex--) {
      var curPokemon = this.state.pokemonSet[pokeIndex];
      for (var valIndex = curPokemon.valueSets.length - 1; valIndex >= 0; valIndex--) {
        if (curPokemon.valueSets[valIndex].id == id) {
          curPokemon.valueSets.splice(valIndex, 1);
        }
      }
      if (curPokemon.valueSets.length == 0) {
        this.state.pokemonSet.splice(pokeIndex, 1);
      }
    }
    this.setState(this.state);
  }

  changeValueSet = (newValueSet) => {
    // TODO: query and manipulate json more elegant
    for (var pokeIndex = this.state.pokemonSet.length - 1; pokeIndex >= 0; pokeIndex--) {
      var curPokemon = this.state.pokemonSet[pokeIndex];
      for (var valIndex = curPokemon.valueSets.length - 1; valIndex >= 0; valIndex--) {
        if (curPokemon.valueSets[valIndex].id == newValueSet.id) {
          var changingValueSet = curPokemon.valueSets[valIndex];
          changingValueSet.cp = newValueSet.cp;
          changingValueSet.hp = newValueSet.hp;
          changingValueSet.stardust = newValueSet.stardust;
        }
      }
    }
    this.setState(this.state);
  }

  deletePokemon = (id) => {
    // TODO: query and manipulate json more elegant
    for (var pokeIndex = this.state.pokemonSet.length - 1; pokeIndex >= 0; pokeIndex--) {
      var curPokemon = this.state.pokemonSet[pokeIndex];
      if (curPokemon.id == id) {
        this.state.pokemonSet.splice(pokeIndex, 1);
      }
    }
    this.setState(this.state);
  }

  changePokemonName = (id, newName) => {
    for (var pokeIndex = this.state.pokemonSet.length - 1; pokeIndex >= 0; pokeIndex--) {
      var curPokemon = this.state.pokemonSet[pokeIndex];
      if (curPokemon.id == id) {
        curPokemon.name = newName;
      }
    }
    this.setState(this.state);
  }

  addNewValueSet = (pokemonId) => {
    for (var pokeIndex = this.state.pokemonSet.length - 1; pokeIndex >= 0; pokeIndex--) {
      var curPokemon = this.state.pokemonSet[pokeIndex];
      if (curPokemon.id == pokemonId) {
        var lastValueSet = curPokemon.valueSets[curPokemon.valueSets.length - 1];
        curPokemon.valueSets.push({id: Math.random(), cp: lastValueSet.cp, hp: lastValueSet.hp, stardust: lastValueSet.stardust});
      }
    }
    this.setState(this.state);
  }

  getLoginReminder = () => {
    if (this.state._id) {
      return null
    } else {
      return (
        <div className="login-reminder-static">
          <span className="glyphicon glyphicon-cloud"></span>
          <p>Login to synchronize your Pokemon with the cloud</p></div>
      )
    }
  }

  render() {
    var pokemonElements = [];
    this.state.pokemonSet.forEach((pokemon) => {
      pokemonElements.push(<Pokemon pokemon={pokemon} key={pokemon.id} nameChangeListener={this.changePokemonName} deleteListener={this.deletePokemon} changeValueSetListener={this.changeValueSet} deleteValueSetListener={this.deleteValueSet} addValueSetListener={this.addNewValueSet} /> );
    });
    var loginReminder = this.getLoginReminder();
    return (
      <div className="iv-calc" role="main">

        <div className="container page-header">
          <img className="img-responsive" src="./logo-horizontal.svg" alt="pikachu" />
          <img className="img-responsive center-block subheading" style={{height: 4.5 + 'em'}} src="./iv-calc-subheading.svg" alt="IV Calculator" />
        </div>
        <div className="container">
          {loginReminder}
          {pokemonElements}
        </div>
        <div className="container text-center">
          <div className="btn btn-success tooltip-trigger glyphicon glyphicon-plus" onClick={this.addNewPokemon} >
            <span style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>&nbsp;Add Another Pokemon</span>
            <span className="tooltiptext">
              <p>Add another value set.
              Use this to reduce the possible combinations of your pokemons IV values.</p>

              <p>After entering CP, HP and Stardust for your Pokemon level it up once and enter the new values.
              If you do this often enough you'll get the precise IV values of your pokemon.</p>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default IVCalc;
