import React from 'react';
import IVCalcEntry from './IVCalcEntry'
import IVCalcAddForm from './IVCalcAddForm'

class IVCalc extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemon: [
        {id: 1, name: 'Pidgey', values:[
          {id: 2, cp: 123, hp: 22, stardust: 600}
        ]},
        {id: 3, name: 'Rattata', values:[
          {id: 4, cp: 456, hp: 25, stardust: 600},
          {id: 5, cp: 789, hp: 40, stardust: 800}
        ]},
      ]
    };
  }

  addNewPokemon = (newPokemon) => {
      this.state.pokemon.push(newPokemon);
      this.setState(this.state);
  }

  deleteValues = (id) => {
    // TODO: query and manipulate json more elegant
    for (var pokeIndex = this.state.pokemon.length - 1; pokeIndex >= 0; pokeIndex--) {
      var curPokemon = this.state.pokemon[pokeIndex];
      for (var valIndex = curPokemon.values.length - 1; valIndex >= 0; valIndex--) {
        if (curPokemon.values[valIndex].id == id) {
          curPokemon.values.splice(valIndex, 1);
        }
      }
      if (curPokemon.values.length == 0) {
        this.state.pokemon.splice(pokeIndex, 1);
      }
    }
    this.setState(this.state);
  }

  render() {
    var rows = [];
    this.state.pokemon.forEach((pokemon) => {
      rows.push(<IVCalcEntry name={pokemon.name} values={pokemon.values[0]} valCount={pokemon.values.length} onDelete={this.deleteValues} /> );
      for (var i = 1; i < pokemon.values.length; i++) {
        rows.push(<IVCalcEntry values={pokemon.values[i]} onDelete={this.deleteValues} />);
      }
    });
    return (
      <div className="iv-calc" role="main">

        <div className="page-header">
          <h1>IV Calculator</h1>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Pokemon</th>
              <th>CP</th>
              <th>HP</th>
              <th>Stardust</th>
              <th>Level</th>
              <th>Att</th>
              <th>Def</th>
              <th>Stam</th>
              <th>% Perfect</th>
              <th>buttons</th>
            </tr>
          </thead>
          <tbody>
            <IVCalcAddForm onAddPokemon={this.addNewPokemon} />
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default IVCalc;
