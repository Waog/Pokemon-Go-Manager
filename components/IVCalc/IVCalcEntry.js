import React from 'react';

class IVCalcEntry extends React.Component {

  render() {
    var firstCol = this.props.name ? <td rowSpan={this.props.valCount}>{this.props.name}</td> : undefined;
    return (
      <tr className="ivcalcentry">
        {firstCol}
        <td>{this.props.values.cp}</td>
        <td>{this.props.values.hp}</td>
        <td>{this.props.values.stardust}</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>60%</td>
        <td>
          <button type="button" className="btn btn-success">ADD</button>
          <button type="button" className="btn btn-info">EDIT</button>
          <button type="button" className="btn btn-danger">REMOVE</button>
        </td>
      </tr>
    )
  }
}

export default IVCalcEntry;
