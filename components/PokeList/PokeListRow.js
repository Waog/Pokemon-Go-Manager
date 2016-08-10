import React from 'react';

class PokeListRow extends React.Component {

  render() {
    return (
      <tr className="pokeListRow">
        <td>{this.props.name}</td>
        <td>{this.props.cp}</td>
      </tr>
    )
  }
}

export default PokeListRow;
