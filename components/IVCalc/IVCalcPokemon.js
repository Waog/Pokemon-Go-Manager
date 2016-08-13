import React from 'react';
import IVCalcEntry from './IVCalcEntry'

class IVCalcPokemon extends React.Component {

  render() {
    var rows = [];
    rows.push(<IVCalcEntry name={this.props.pokemon.name} values={this.props.pokemon.values[0]} />);
    for (var i = 1; i < this.props.pokemon.values.length; i++) {
      rows.push(<IVCalcEntry name="-//-" values={this.props.pokemon.values[i]} />);
    }
    return (
      <div>
        {rows}
      </div>
    )
  }
}

export default IVCalcPokemon;
