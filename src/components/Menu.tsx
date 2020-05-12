import React from "react";
import { observer } from "mobx-react";
import Game from "../classes/Game";

const Menu = observer((props: { game: Game }) => {
  return (
    <thead>
      <tr style={{ height: 40 }}>
        <td colSpan={2}>Points:</td>
        <td colSpan={3}>{props.game.lineCount}</td>
        <td colSpan={5} />
        <td colSpan={2}>
          <button>Load</button>
        </td>
        <td colSpan={2}>
          <button>Save</button>
        </td>
        <td colSpan={5} style={{ textAlign: "right" }}>
          <button>New game</button>
        </td>
      </tr>
      {/* <tr style={{ height: 10 }}>
        <td colSpan={99} />
      </tr> */}
    </thead>
  );
});

export default Menu;
