import React from 'react';
import Pokemon from './Pokemon'

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

  addNewPokemon = () => {
      this.state.pokemonSet.push({id: Math.random(), name: 'Pidgey', valueSets:[
          {id: Math.random(), cp: 76, hp: 26, stardust: 600}
        ]
      });
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
    console.log('new name for id ', id, newName);
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
      pokemonElements.push(<Pokemon pokemon={pokemon} nameChangeListener={this.changePokemonName} deleteListener={this.deletePokemon} changeValueSetListener={this.changeValueSet} deleteValueSetListener={this.deleteValueSet} addValueSetListener={this.addNewValueSet} /> );
    });
    return (
      <div className="iv-calc" role="main">

        <div className="page-header">
          <h1>IV Calculator</h1>
        </div>

        {pokemonElements}

        <div className="btn btn-success" onClick={this.addNewPokemon} >+</div>
      </div>
    )
  }
}

export default IVCalc;
