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
  const [isLoading, setIsLoading] = useState(true);
  const [existingCreatures, setExistingCreatures] = useState([]);

  //function that fetches all creatures form the database
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
      finally 
      {
        setIsLoading(false);
      }
    };

    fetchCreatures();
  }, []);

  //renders the page or reroutes the user if they already have a creature
  useEffect(() => {
    if (!isLoading && existingCreatures.some(creature => creature.UserId === currentUser.id)) {
      navigate("/home");
    }
  }, [isLoading, existingCreatures, currentUser.id, navigate]);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const creatures = Array.from({ length: NUM_OF_CREATURES }, (_, index) => (
    <div key={index} className="col-12 col-sm-4 col-md-4">
      <CreatureRandomizer key={index + refreshKey} userId={currentUser.id} />
    </div>
  ));

  if (isLoading) 
  {
    return (
      <Layout>
        <div className="text-center mt-4">
          Loading...
        </div>
      </Layout>);
  }
  else
  {
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
}

export default CreatureSelect;
