import React from 'react';

class IVCalcAddForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newPokemon: {name: 'Drowzee', values:[
        {id: Math.random(), cp: 200, hp: 32, stardust: 1200}
      ]}
    };
  }

  handleChange = () => {
    this.setState({
      newPokemon: {name: this.refs.name.value, values:[
        {id: Math.random(), cp: this.refs.cp.value, hp: this.refs.hp.value, stardust: this.refs.stardust.value}
      ]}
    });
  }

  handleAdd = () => {
    this.props.onAddPokemon(this.state.newPokemon);
    this.handleChange();
  }

  render() {
    return (
      <tr>
        <td><input type="text" className="form-control" ref="name" onChange={this.handleChange} placeholder="Pidgey" value={this.state.newPokemon.name} /></td>
        <td><input type="number" className="form-control" ref="cp" onChange={this.handleChange} placeholder="123" value={this.state.newPokemon.values[0].cp} /></td>
        <td><input type="number" className="form-control" ref="hp" onChange={this.handleChange} placeholder="23" value={this.state.newPokemon.values[0].hp} /></td>
        <td><input type="number" className="form-control" ref="stardust" onChange={this.handleChange} placeholder="600" value={this.state.newPokemon.values[0].stardust} /></td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>60%</td>
        <td>
          <div className="btn btn-success" onClick={this.handleAdd} >ADD to List</div>
        </td>
      </tr>
    )
  }
}

export default IVCalcAddForm;
