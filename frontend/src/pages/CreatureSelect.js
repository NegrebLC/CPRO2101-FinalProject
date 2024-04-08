import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllCreatures } from '../services/creatureApi';
import CreatureRandomizer from "../components/creature_randomizer/creatureRandomizer";

const CreatureSelect = () => {
  const { currentUser, isLoggedIn } = useAuth(); // Use isLoggedIn from useAuth
  const numberOfCreatures = 3;
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [existingCreatures, setExistingCreatures] = useState([]);

  const authCheck = () => {
    if (!isLoggedIn()) {
      console.log("isLoggedIn:", isLoggedIn);
      navigate("/home");
    }
  };

  const creatureCheck = () => {
    existingCreatures.forEach(creature => {
      if (creature.UserId === currentUser.id) {
        navigate("/home");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cre = await getAllCreatures();
        setExistingCreatures(cre);
      } catch (error) {
        console.error('Error fetching creatures:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    authCheck();
    creatureCheck();
  }, [currentUser, isLoggedIn, existingCreatures]);

  const creatures = Array.from({ length: numberOfCreatures }, (_, index) => (
    <div key={index} className="col-12 col-sm-4 col-md-4">
      <CreatureRandomizer key={index + refreshKey} />
    </div>
  ));

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
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

export default CreatureSelect;