import React from "react";

import { Solution } from "./solution";

function App() {
  return (
    <React.Fragment>
      <h2>Labyrinth Challenge</h2>
      <Solution
        targetPosition={[6, 9]}
        availableCells={[
          [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
          [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
          [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
          [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
          [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
          [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
          [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
          [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
          [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
        ]}
        startingPosition={[4, 4]}
        moveLimit={25}
        cellSize={30}
      />
    </React.Fragment>
  );
}

export default App;
