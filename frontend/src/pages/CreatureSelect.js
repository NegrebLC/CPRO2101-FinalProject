import React, { useState } from 'react';
import Layout from "../components/Layout";
import CreatureRandomizer from "../components/creature_randomizer/creatureRandomizer";

export default function CreatureSelect() {
  const numberOfCreatures = 3;
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger refresh
  const creatures = Array.from({ length: numberOfCreatures }, (_, index) => (
    <div key={index} className="col-12 col-sm-4 col-md-4">
      <CreatureRandomizer key={index + refreshKey} /> {/* Add key for re-rendering */}
    </div>
  ));

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Update refresh key to trigger re-render
  };

  return (
    <Layout>
      <h2 className="display-4 mb-4 text-center">Select Your Fugglet!</h2>

      <div className="d-flex flex-wrap justify-content-between mb-3">
        { creatures }
      </div>

      <div className="d-flex justify-content-center">
        <div className="refresh-button-container">
          <button className="btn btn-primary" onClick={handleRefresh}>Refresh</button>
        </div>
      </div>
    </Layout>
  );
}
