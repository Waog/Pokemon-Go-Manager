import React from 'react';

class IVCalcAddForm extends React.Component {

  render() {
    return (
      <tr>
        <td><input type="text" className="form-control" id="newName" placeholder="Pidgey" value={this.props.pokemon.name} /></td>
        <td><input type="number" className="form-control" id="newCp" placeholder="123" value={this.props.pokemon.values[0].cp} /></td>
        <td><input type="number" className="form-control" id="newHp" placeholder="23" value={this.props.pokemon.values[0].hp} /></td>
        <td><input type="number" className="form-control" id="newStardust" placeholder="600" value={this.props.pokemon.values[0].stardust} /></td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>60%</td>
        <td>
          <div className="btn btn-success" onClick={this.props.onAddPokemon} >ADD to List</div>
        </td>
      </tr>
    )
  }
}

export default IVCalcAddForm;
