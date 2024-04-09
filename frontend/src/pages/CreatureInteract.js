import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllCreatures, updateCreature } from "../services/creatureApi";
import StatusBar from "../components/creature-interact/StatusBar";
import "../components/creature-interact/creatureInteract.css";

const draggableItems = [
  { type: "food", emoji: "🍎", effect: 2 },
  { type: "food", emoji: "🍔", effect: 2 },
  { type: "food", emoji: "🥕", effect: 2 },
  { type: "play", emoji: "⚽", effect: 5 },
  { type: "play", emoji: "🎮", effect: 5 },
  { type: "play", emoji: "🧩", effect: 5 },
];

const CreatureInteract = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [creature, setCreature] = useState(null);
  const [hunger, setHunger] = useState(24);
  const [happiness, setHappiness] = useState(50);
  const [foodPreference, setFoodPreference] = useState(
    draggableItems.find((item) => item.type === "food")
  );
  const [playPreference, setPlayPreference] = useState(
    draggableItems.find((item) => item.type === "play")
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const images = importAll(
    require.context("../components/creature_randomizer/images", false, /\.png$/)
  );

  function importAll(r) {
    let images = {};
    r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
    return images;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creatures = await getAllCreatures();
        const userCreature = creatures.find((c) => c.UserId === currentUser.id);
        if (!userCreature) {
          navigate("/creature-select");
          return;
        }
        setCreature(userCreature);
        setHappiness(userCreature.Happiness);
        setHunger(userCreature.Hunger);
      } catch (error) {
        console.error("Error fetching creatures:", error);
      }
    };
    fetchData();
  }, [currentUser, navigate]);

  useEffect(() => {
    const foodIntervalId = setInterval(() => {
      const randomFoodIndex = Math.floor(
        Math.random() *
          draggableItems.filter((item) => item.type === "food").length
      );
      setFoodPreference(
        draggableItems.filter((item) => item.type === "food")[randomFoodIndex]
      );
    }, 30000);

    const playIntervalId = setInterval(() => {
      const randomPlayIndex = Math.floor(
        Math.random() *
          draggableItems.filter((item) => item.type === "play").length
      );
      setPlayPreference(
        draggableItems.filter((item) => item.type === "play")[randomPlayIndex]
      );
    }, 30000);

    return () => {
      clearInterval(foodIntervalId);
      clearInterval(playIntervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHappiness((prevHappiness) => {
        const newHappiness = Math.max(0, prevHappiness - 1);
        updateCreatureValues(creature._id, { Happiness: newHappiness });
        return newHappiness;
      });
      setHunger((prevHunger) => {
        const newHunger = Math.max(0, prevHunger - 1);
        updateCreatureValues(creature._id, { Hunger: newHunger });
        return newHunger;
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [creature]);

  const updateCreatureValues = async (id, values) => {
    try {
      await updateCreature(id, values);
    } catch (error) {
      console.error("Error updating creature:", error);
    }
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
    if (item.type === "food") {
      if (item.emoji === foodPreference.emoji) {
        setHunger((hunger) => Math.min(24, hunger + item.effect * 4));
      } else {
        setHunger((hunger) => Math.min(24, hunger + item.effect));
      }
      updateCreatureValues(creature._id, {
        Hunger: Math.min(24, hunger + item.effect),
      });
    } else if (item.type === "play") {
      if (item.emoji === playPreference.emoji) {
        setHappiness((happiness) => Math.min(50, happiness + item.effect * 4));
      } else {
        setHappiness((happiness) => Math.min(50, happiness + item.effect));
      }
      updateCreatureValues(creature._id, {
        Happiness: Math.min(50, happiness + item.effect),
      });
    }
  };

  const handleItemUse = (item) => {
    if (item.type === "food") {
      if (item.emoji === foodPreference.emoji) {
        setHunger((hunger) => Math.min(24, hunger + item.effect * 4));
      } else {
        setHunger((hunger) => Math.min(24, hunger + item.effect));
      }
      updateCreatureValues(creature._id, {
        Hunger: Math.min(24, hunger + item.effect),
      });
    } else if (item.type === "play") {
      if (item.emoji === playPreference.emoji) {
        setHappiness((happiness) => Math.min(50, happiness + item.effect * 4));
      } else {
        setHappiness((happiness) => Math.min(50, happiness + item.effect));
      }
      updateCreatureValues(creature._id, {
        Happiness: Math.min(50, happiness + item.effect),
      });
    }
  };

  const getHungerMessage = () => {
    if (hunger > 18) return "I'm full! " + foodPreference.emoji;
    if (hunger > 12) return "I could eat a little. " + foodPreference.emoji;
    if (hunger > 6) return "I'm getting hungry. " + foodPreference.emoji;
    return "I'm starving! " + foodPreference.emoji;
  };

  const getHappinessMessage = () => {
    if (happiness > 40) return "I'm so happy! " + playPreference.emoji;
    if (happiness > 30) return "I'm pretty happy. " + playPreference.emoji;
    if (happiness > 20) return "I could use some fun. " + playPreference.emoji;
    return "I'm feeling down. " + playPreference.emoji;
  };

  if (!creature) return <Layout>No Creature Found!</Layout>;

  return (
    <Layout>
      <div className="creature-interact-page container mt-5">
        <h1 className="text-center mb-4">{creature.Name}</h1>

        {/* Row for creature visualization */}
        <div className="row justify-content-center align-items-start mb-4">
          <div className="col-md-4 d-flex justify-content-center">
            <div
              className="creature"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="head">
                <img
                  src={images["Head_" + creature.HeadId + ".png"]}
                  alt="Head"
                ></img>
              </div>
              <div className="body">
                <img
                  src={images["Body_" + creature.BodyId + ".png"]}
                  alt="Body"
                ></img>
              </div>
              <div className="arms">
                <img
                  src={images["Arms_" + creature.ArmId + ".png"]}
                  alt="Arms"
                ></img>
              </div>
              <div className="legs">
                <img
                  src={images["Legs_" + creature.LegId + ".png"]}
                  alt="Legs"
                ></img>
              </div>
              <div className="speech-bubble hunger-bubble">
                {getHungerMessage()}
              </div>
              <div className="speech-bubble happiness-bubble">
                {getHappinessMessage()}
              </div>
            </div>
          </div>
        </div>

        {/* Row for columns of food and play items */}
        <div className="row justify-content-center align-items-start">
          <div className="col-md-4">
            {/* Column for food items */}
            <div className="d-flex flex-column align-items-center">
              <h3>Food Items</h3>
              <div className="emoji-container">
                {draggableItems
                  .filter((item) => item.type === "food")
                  .map((item, index) =>
                    isMobile ? (
                      <button
                        key={index}
                        onClick={() => handleItemUse(item)}
                        className="emoji mb-3 btn btn-light emoji-btn"
                      >
                        {item.emoji}
                      </button>
                    ) : (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        className="emoji mb-3"
                        style={{ fontSize: "2em" }}
                      >
                        {item.emoji}
                      </div>
                    )
                  )}
                <StatusBar
                  label="Hunger"
                  value={(hunger / 24) * 100}
                  color="red"
                />
                <div
                  className="drop-target"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {isMobile
                    ? "Tap food to feed your Fugglet!"
                    : "Drag food to your Fugglet!"}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            {/* Column for play items */}
            <div className="d-flex flex-column align-items-center">
              <h3>Play Items</h3>
              <div className="emoji-container">
                {draggableItems
                  .filter((item) => item.type === "play")
                  .map((item, index) =>
                    isMobile ? (
                      <button
                        key={index}
                        onClick={() => handleItemUse(item)}
                        className="emoji mb-3 btn btn-light emoji-btn"
                        style={{ fontSize: "2em" }}
                      >
                        {item.emoji}
                      </button>
                    ) : (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        className="emoji mb-3"
                        style={{ fontSize: "2em" }}
                      >
                        {item.emoji}
                      </div>
                    )
                  )}
                <StatusBar
                  label="Happiness"
                  value={(happiness / 50) * 100}
                  color="green"
                />
                <div
                  className="drop-target"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {isMobile
                    ? "Tap toys to play with your Fugglet!"
                    : "Drag toys to your Fugglet!"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatureInteract;
