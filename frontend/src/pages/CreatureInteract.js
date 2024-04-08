import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllCreatures, updateCreature } from "../services/creatureApi";
import StatusBar from "../components/creature-interact/StatusBar";
import "../components/creature-interact/creatureInteract.css";

const draggableItems = [
  { type: "food", emoji: "🍎", effect: 2 },
  { type: "food", emoji: "🍔", effect: 3 },
  { type: "food", emoji: "🥕", effect: 1 },
  { type: "play", emoji: "⚽", effect: 2 },
  { type: "play", emoji: "🎮", effect: 8 },
  { type: "play", emoji: "🧩", effect: 4 },
];

const CreatureInteract = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [creature, setCreature] = useState(null);
  const [hunger, setHunger] = useState(24);
  const [happiness, setHappiness] = useState(50);
  const images = importAll(
    require.context("../components/creature_randomizer/images", false, /\.png$/)
  );

  function importAll(r) {
    let images = {};
    r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
    return images;
  }

  // Dear dumbass Bergen,
  //
  // Remember to setup User Detection
  // Sincerely,
  // Bergen
  //
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creatures = await getAllCreatures();
        const userCreature = creatures.find((c) => c.UserId === 1);
        if (!userCreature) {
          navigate("/home");
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
      console.log("Creature updated successfully");
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
      setHunger((hunger) => Math.min(24, hunger + item.effect));
      updateCreatureValues(creature._id, {
        Hunger: Math.min(24, hunger + item.effect),
      });
    } else if (item.type === "play") {
      setHappiness((happiness) => Math.min(50, happiness + item.effect));
      updateCreatureValues(creature._id, {
        Happiness: Math.min(50, happiness + item.effect),
      });
    }
  };

  if (!creature) return <Layout>No Creature Found!</Layout>;

  return (
    <Layout>
      <div className="creature-interact-page container mt-5">
        <h1 className="text-center mb-4">{creature.Name}</h1>
        <div className="row justify-content-center align-items-start">
          <div className="col d-flex flex-column align-items-center">
            {draggableItems
              .filter((item) => item.type === "food")
              .map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="emoji mb-3"
                >
                  <span style={{ fontSize: "2em" }}>{item.emoji}</span>
                </div>
              ))}
            <StatusBar label="Hunger" value={(hunger / 24) * 100} color="red" />
            <div
              className="drop-target"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              Drop Food Here
            </div>
          </div>

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
            </div>
          </div>

          <div className="col d-flex flex-column align-items-center">
            {draggableItems
              .filter((item) => item.type === "play")
              .map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="emoji mb-3"
                >
                  <span style={{ fontSize: "2em" }}>{item.emoji}</span>
                </div>
              ))}
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
              Drop Play Items Here
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatureInteract;
