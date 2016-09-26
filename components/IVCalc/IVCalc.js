import React from 'react';
import Pokemon from './Pokemon'
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

  render() {
    var pokemonElements = [];
    this.state.pokemonSet.forEach((pokemon) => {
      pokemonElements.push(<Pokemon pokemon={pokemon} key={pokemon.id} nameChangeListener={this.changePokemonName} deleteListener={this.deletePokemon} changeValueSetListener={this.changeValueSet} deleteValueSetListener={this.deleteValueSet} addValueSetListener={this.addNewValueSet} /> );
    });
    return (
      <div className="container iv-calc" role="main">

        <div className="page-header">
          <img className="img-responsive" src="./logo-horizontal.svg" alt="pikachu" />
          <h1 className="text-center">IV Calculator</h1>
        </div>

        {pokemonElements}

        <div className="btn btn-success" onClick={this.addNewPokemon} >+</div>
      </div>
    )
  }
}

export default IVCalc;
