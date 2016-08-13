import React from 'react';

class IVCalcEntry extends React.Component {

  render() {
    return (
      <tr className="ivcalcentry">
        <td>{this.props.name}</td>
        <td>{this.props.values.cp}</td>
        <td>{this.props.values.hp}</td>
        <td>{this.props.values.stardust}</td>
        <td>??</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>20-80%</td>
        <td><button>+</button></td>
        <td><button>-</button></td>
      </tr>
    )
  }
}

export default IVCalcEntry;
