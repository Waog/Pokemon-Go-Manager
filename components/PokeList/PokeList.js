import React from 'react';
import PokeListRow from './PokeListRow'

class PokeList extends React.Component {

  render() {
    var rows = [];
    this.props.pokemon.forEach(function(pokemon) {
      rows.push(<PokeListRow name={pokemon.name} cp={pokemon.cp} />);
    });    
    return (
      <table className="pokeList">
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>CP</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default PokeList;
