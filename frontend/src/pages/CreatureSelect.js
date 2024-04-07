import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import Layout from "../components/Layout";
import CreatureRandomizer from "../components/creature_randomizer/creatureRandomizer";

function generateCreatures(items)
{
  for (let i = 0; i < items; i++)
  {

  }
}

export default function CreatureSelect() {
  const numberOfCreatures = 6;
  const creatures = Array.from({ length: numberOfCreatures }, (_, index) => (
    <div key={index} className="col-12 col-sm-4 col-md-4">
      <CreatureRandomizer />
    </div>
  ));
  return (
    <Layout>
      <h2 className="display-4 mb-4">Creature Select</h2>

      <div className="d-flex flex-wrap justify-content-between">
        { creatures }
      </div>
    </Layout>
  );
}