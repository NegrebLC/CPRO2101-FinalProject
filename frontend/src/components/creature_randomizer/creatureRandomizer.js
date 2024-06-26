import React, { useState, useEffect } from 'react';
import { createCreature } from '../../services/creatureApi';
import { useNavigate } from 'react-router-dom';
import "./creatureRandomizer.css";

const MAX_HEAD_ID = 7;
const MAX_BODY_ID = 7;
const MAX_ARMS_ID = 7;
const MAX_LEGS_ID = 7;
const NAMES = ["Jerk", "Buddy", "Sweetheart", "Pal", "Friend", "Baby", "Silly Billy", "pwease"]

//function that generates a name based off the NAMES array
function generateName(MAX) {
    return Math.floor(Math.random() * MAX);
}

//functio nthat generates a partId for a given part
function generateId(MAX) {
    return Math.floor(Math.random() * MAX) + 1;
}

//function that imports the images from the component
function importAll(r) {
    let images = {};
    r.keys().map(item => { images[item.replace('./', '')] = r(item); });
    return images;
}

//importing all pngs
const images = importAll(require.context('./images', false, /\.png$/));

//export function of the randomizer
export default function CreatureRandomizer({ userId }) {

    //sets the object values to be passed to the backend based on generated and pulled ids
    const [creatureAttributes, setCreatureAttributes] = useState({
        UserId: userId,
        HeadId: generateId(MAX_HEAD_ID),
        BodyId: generateId(MAX_BODY_ID),
        ArmId: generateId(MAX_ARMS_ID),
        LegId: generateId(MAX_LEGS_ID),
        Happiness: 50,
        Hunger: 24,
    });

    //calling the name generator
    const [name, setName] = useState(NAMES[generateName(NAMES.length)]);
    const [formName, setFormName] = useState('');

    const navigate = useNavigate();

    //use effect to set the generated name values
    useEffect(() => {
        setName(NAMES[generateName(NAMES.length)]);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormName(value);
    };

    //method that handles the button submit and saves a creature to the db
    const handleSubmit = async (e) => {
        e.preventDefault();

        try
        {
            await createCreature({ ...creatureAttributes, Name: formName });
            alert(`Fugglet adopted and saved!`);
            navigate('/home');
        } 
        catch (error) 
        {
            console.error('Error submitting creature:', error);
            alert('Failed to submit creature. Please try again.');
        }
    };

    //returning the elements to construct a creature
    return (
        <div className="container mb-2">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="creature">
                    <div className="head">
                        <img src={images['Head_' + creatureAttributes.HeadId + '.png']} alt="Head"></img>
                    </div>
                    <div className="body">
                        <img src={images['Body_' + creatureAttributes.BodyId + '.png']} alt="Body"></img>
                    </div>
                    <div className="arms">
                        <img src={images['Arms_' + creatureAttributes.ArmId + '.png']} alt="Arms"></img>
                    </div>
                    <div className="legs">
                        <img src={images['Legs_' + creatureAttributes.LegId + '.png']} alt="Legs"></img>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="nameInput"
                            name="Name"
                            value={formName}
                            onChange={handleChange}
                            placeholder="Name me!"
                            required
                            title="Please give me a name!"
                            onInvalid={(e) => e.target.setCustomValidity('Please give me a name!')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>
                    <button className="btn btn-success" type="submit">
                        Adopt me {name}!
                    </button>
                </form>
            </div>
        </div>
    );
}

