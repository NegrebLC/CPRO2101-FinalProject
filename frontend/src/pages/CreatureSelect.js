import Layout from "../components/Layout";
import CreatureRandomizer from "../components/creature_randomizer/creatureRandomizer";

export default function CreatureSelect() {
  const numberOfCreatures = 3;
  const creatures = Array.from({ length: numberOfCreatures }, (_, index) => (
    <div key={index} className="col-12 col-sm-4 col-md-4">
      <CreatureRandomizer />
    </div>
  ));
  return (
    <Layout>
      <h2 className="display-4 mb-4 text-center">Select Your Fugglet!</h2>

      <div className="d-flex flex-wrap justify-content-between">
        { creatures }
      </div>
    </Layout>
  );
}