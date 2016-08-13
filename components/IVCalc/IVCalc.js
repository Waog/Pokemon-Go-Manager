import React from 'react';
import IVCalcEntry from './IVCalcEntry'

class IVCalc extends React.Component {

  render() {
    var rows = [];
    this.props.pokemon.forEach(function(pokemon) {
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
            <tr>
              <td><input type="text" className="form-control" id="newName" placeholder="Pidgey" /></td>
              <td><input type="number" className="form-control" id="newCp" placeholder="123" /></td>
              <td><input type="number" className="form-control" id="newHp" placeholder="23" /></td>
              <td><input type="number" className="form-control" id="newStardust" placeholder="600" /></td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>60%</td>
              <td>
                <button type="button" className="btn btn-success">ADD to List</button>
              </td>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default IVCalc;
