import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllCreatures } from '../services/creatureApi';
import CreatureRandomizer from "../components/creature_randomizer/creatureRandomizer";

const CreatureSelect = () => {
  const NUM_OF_CREATURES = 3;
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [existingCreatures, setExistingCreatures] = useState([]);

  useEffect(() => {
    const fetchCreatures = async () => {
      try 
      {
        const cre = await getAllCreatures();
        setExistingCreatures(cre);
      } 
      catch (error) 
      {
        console.error('Error fetching creatures:', error);
      }
    };
    fetchCreatures();
  }, []);

  useEffect(() => {
    const checkRedirect = () => {
      if (existingCreatures.some(creature => creature.UserId === currentUser.id)) {
        navigate("/home");
        return null
      }
    };
    checkRedirect();
  }, [currentUser, existingCreatures, navigate]);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const creatures = Array.from({ length: NUM_OF_CREATURES }, (_, index) => (
    <div key={index} className="col-12 col-sm-4 col-md-4">
      <CreatureRandomizer key={index + refreshKey} />
    </div>
  ));

  return (
    <Layout>
      <h2 className="display-4 mb-4 text-center">Select Your Fugglet!</h2>

      <div>
        <div className="d-flex flex-wrap justify-content-between mb-3">
          {creatures}
        </div>

        <div className="d-flex justify-content-center">
          <div className="refresh-button-container">
            <button className="btn btn-primary" onClick={handleRefresh}>Refresh</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreatureSelect;