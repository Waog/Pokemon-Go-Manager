import React from 'react';

class VisibleValues extends React.Component {

  handleChange = () => {
    this.props.changeListener({
      id: this.props.valueSet.id,
      cp: this.refs.cp.value,
      hp: this.refs.hp.value,
      stardust: this.refs.stardust.value
    });
  }

  handleDelete = () => {
    this.props.deleteListener(this.props.valueSet.id);
  }

  render() {
    var deleteBtn = this.props.undeletable ? undefined : <div className="btn btn-danger" onClick={this.handleDelete} >-</div>;
    return (
      <tr>
        <td><input type="number" className="form-control" ref="cp" placeholder="123" value={this.props.valueSet.cp} onChange={this.handleChange} /></td>
        <td><input type="number" className="form-control" ref="hp" placeholder="23" value={this.props.valueSet.hp} onChange={this.handleChange} /></td>
        <td><input type="number" className="form-control" ref="stardust" placeholder="600" value={this.props.valueSet.stardust} onChange={this.handleChange} /></td>
        <td>
          {deleteBtn}
        </td>
      </tr>
    )
  }
}

export default VisibleValues;
