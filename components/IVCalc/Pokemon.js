import React from 'react';
import VisibleValues from './VisibleValues'

class Pokemon extends React.Component {

  handleDelete = () => {
    this.props.deleteListener(this.props.pokemon.id);
  }

  handleAddValueSet = () => {
    this.props.addValueSetListener(this.props.pokemon.id);
  }

  render() {
    var rows = [];
    rows.push(<VisibleValues valueSet={this.props.pokemon.valueSets[0]} changeListener={this.props.changeValueSetListener} undeletable />);
    for (var i = 1; i < this.props.pokemon.valueSets.length; i++) {
      rows.push(<VisibleValues valueSet={this.props.pokemon.valueSets[i]} changeListener={this.props.changeValueSetListener} deleteListener={this.props.deleteValueSetListener} />);
    }
    return (
      <div className="list-group">
        <div className="list-group-item list-group-item-success">
          <h1 className="row">
            <div className="col-md-3">[IMAGE!]</div>
            <div className="col-md-4">{this.props.pokemon.name}</div>
            <div className="col-md-4">15 - 60%</div>
            <div className="btn btn-danger" onClick={this.handleDelete} >X</div>
          </h1>
        </div>
        <div className="list-group-item">
          <p>15 Combinations: Att: 3 - 10; Def: 5 - 8; Stamnia: 1 - 5; Level: 20 - 22;</p>
        </div>
        <div className="list-group-item">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>CP</th>
                <th>HP</th>
                <th>Stardust</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows}
              <tr>
                <td colSpan="4">
                  <div className="btn btn-success" onClick={this.handleAddValueSet} >+</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Pokemon;
