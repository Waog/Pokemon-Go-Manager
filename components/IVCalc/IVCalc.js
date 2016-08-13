import React from 'react';
import IVCalcPokemon from './IVCalcPokemon'

class IVCalc extends React.Component {

  render() {
    var rows = [];
    this.props.pokemon.forEach(function(pokemon) {
      rows.push(<IVCalcPokemon pokemon={pokemon} />);
    });
    return (
      <table className="ivcalc">
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
            <th>% Max</th>
            <th>Add</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default IVCalc;
