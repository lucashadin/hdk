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


const EventOverlay: HDKComponent = ({ name, ...props}) => {
  return (
    
    <HNode>
      {gameStatsData
        .filter(stats => stats.name === name)
        .map((stats, index) => (
          <Prefab 
          {...props}
            key={index}
            id="cube_01"
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

    <Spawnpoint />
    <Ground hilly={0} material="t_grass_01" />
    <EventOverlay name='gameStats' y={100}/>


  </HNode>
);

render(<World />, { environment: 'midday_clear_01' });

// questions
// Hot reload doesn't work