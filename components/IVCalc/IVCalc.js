import React from 'react';
import IVCalcEntry from './IVCalcEntry'
import IVCalcAddForm from './IVCalcAddForm'

class IVCalc extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemon: [
        {name: 'Pidgey', values:[
          {cp: 123, hp: 22, stardust: 600}
        ]},
        {name: 'Rattata', values:[
          {cp: 456, hp: 25, stardust: 600},
          {cp: 789, hp: 40, stardust: 800}
        ]},
      ],
      newPokemon: {name: 'Drowzee', values:[
        {cp: 200, hp: 32, stardust: 1200}
      ]}
    };
    console.log('constructor finished');
  }

  addNewPokemon() {
      console.log('addNewPokemon');
      this.state.pokemon.push(this.state.newPokemon);
      this.setState(this.state);
  }

  render() {
    var rows = [];
    this.state.pokemon.forEach(function(pokemon) {
      rows.push(<IVCalcEntry name={pokemon.name} values={pokemon.values[0]} valCount={pokemon.values.length} /> );
      for (var i = 1; i < pokemon.values.length; i++) {
        rows.push(<IVCalcEntry values={pokemon.values[i]} />);
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
            <IVCalcAddForm pokemon={this.state.newPokemon} onAddPokemon={this.addNewPokemon} />
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default IVCalc;
