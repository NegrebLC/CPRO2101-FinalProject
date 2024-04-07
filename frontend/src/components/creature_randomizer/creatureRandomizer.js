import React from 'react';
import "./creatureRandomizer.css";

const MAX_HEAD_ID = 3;
const MAX_BODY_ID = 3;
const MAX_ARMS_ID = 3;
const MAX_LEGS_ID = 3;
const NAMES = ["Jerk", "Buddy", "Sweetheart", "Pal", "Friend", "Baby", "Silly Billy", "pwease"]

function generateName(MAX) {
    return Math.floor(Math.random() * MAX);
}

function generateId(MAX) {
    return Math.floor(Math.random() * MAX) + 1;
}

function importAll(r) {
    let images = {};
    r.keys().map(item => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.png$/));

export default function CreatureRandomizer() {

    const HEAD_ID = generateId(MAX_HEAD_ID);
    const BODY_ID = generateId(MAX_BODY_ID);
    const ARMS_ID = generateId(MAX_ARMS_ID);
    const LEGS_ID = generateId(MAX_LEGS_ID);
    const name = NAMES[generateName(NAMES.length)];

    return (
        <div className="container mb-2">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="creature">
                    <div className="head">
                        <img src={images['Head_' + HEAD_ID + '.png']} alt="Head"></img>
                    </div>
                    <div className="body">
                        <img src={images['Body_' + BODY_ID + '.png']} alt="Body"></img>
                    </div>
                    <div className="arms">
                        <img src={images['Arms_' + ARMS_ID + '.png']} alt="Arms"></img>
                    </div>
                    <div className="legs">
                        <img src={images['Legs_' + LEGS_ID + '.png']} alt="Legs"></img>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <button className="btn btn-success">
                    Adopt me {name}!
                </button>
            </div>
        </div>
    );
}
