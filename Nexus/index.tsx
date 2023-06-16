import { HDKComponent, HNode, Prefab, render, useRandom } from '@hiber3d/hdk-react';
import {
  For,
  Ground,
  Spawnpoint,
} from '@hiber3d/hdk-react-components';

// Read in Dive Data
import gameStatsData from './results.json';

// Since pos_xyz and rot_xyz are strings in your JSON, we need to parse them into arrays
gameStatsData.forEach(stats => {
  stats.pos_xyz = JSON.parse(stats.pos_xyz);
  stats.rot_xyz = JSON.parse(stats.rot_xyz);
});

// console.log(gameStatsData);


const EventOverlay: HDKComponent<{ name: string; prefab_id: id }> = ({ name, prefab_id, ...props }) => {
  // why doesn't id autopopulate from the definition?
  // why can't I send props into it? 
  return (

    <HNode
      {...props}>

      {gameStatsData
        .filter(stats => stats.name === name)
        .map((stats, index) => (
          <Prefab

            key={index}
            id={prefab_id}
            x={stats.pos_xyz[0]}
            y={stats.pos_xyz[1]}
            z={stats.pos_xyz[2]}
            rotX={stats.rot_xyz[0]}
            rotY={stats.rot_xyz[1]}
            rotZ={stats.rot_xyz[2]}
          />
        ))}
    </HNode>
  );
};



const World = () => (
  <HNode>

    <Spawnpoint x={-72.1} y={0} z={-135.5} />
    <Ground hilly={0} material="t_grass_01" x={-72.1} y={0} z={-135.5} />
    <EventOverlay name='gameStats' prefab_id='en_p_torch_standing_01' y={0} scale={3} />
    <EventOverlay name='gameEmote' prefab_id='hologram_01_hibert' y={0} scale={5} />
    <EventOverlay name='gameInteract' prefab_id='sign_wooden_01_exclamtion' y={0} scale={3} />
    <EventOverlay name='gameContentShown' prefab_id='sign_wooden_01_question' y={0} scale={3} />
    <EventOverlay name='gameSignalSent' prefab_id='animated_light_01' y={0} scale={10} />
    <EventOverlay name='gameWorldLeft' prefab_id='sign_wooden_01_skull' y={0} scale={3} />


  </HNode>
);

render(<World />, { environment: 'midday_clear_01' });

// questions
// Hot reload doesn't work