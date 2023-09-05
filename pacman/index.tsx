import { MaterialId } from '@hiber3d/hdk-core';
import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound, Orbiting, Spinning, Portal, Checkpoint, PointSound, For, ImagePanel, AnimateAlongPath, Mesh } from '@hiber3d/hdk-react-components';
import React from 'react';










const Floor: HDKComponent = props => (
  <HNode x={0} y={0} z={0.0}
    {...props}>

    <Prefab
      id="cube_01"
      material="palette_01_black"
      x={0} y={0} z={0}
      scaleX={50}
      scaleZ={50}
      scaleY={0.2}
    />
  </HNode>
)


const Enemy = ({ colour, points }) => {
  const random = useRandom();
  const startAt = (random.range(0, 100))/100;
  const duration = random.range(25, 40);

  return (
    <AnimateAlongPath
      close={false}
      easing="LINEAR"
      showKeyframes={true}
      showPoints={true}
      tension={1}
      duration={duration}
      loop="REVERSE"
      numberOfItems={100}
      startAt={startAt*duration}
      points={points}
    >
      <Prefab id="sphere_01" material={colour} scale={2.5} />
    </AnimateAlongPath>
  );
};





const BlockRectangle: HDKComponent = props => (
  <Prefab id="rounded_cube_02" material='t_neon_grid_01' scaleX={5} scaleY={6} scaleZ={5} {...props} />
)


const Key: HDKComponent = props => (
  <HNode
  {...props}
  engineProps={{
    rendering: {
      materialID: "rock_cube_01_t2",
      meshID: "en_p_trampled_path_01",
    },
    collectible: {
      type: "MANDATORY",
      grabbingRadius: 5,
    }
  }}
  >
    <Prefab id="cube_01" material='m_emissive_green'  y={30}  rotY={0} scaleY={1} scaleX={1} scaleZ={1}/>
    <Prefab id="collectible_mandatory_key_01" material='m_emissive_green'  y={0}  rotY={0} scaleY={3} scaleX={3} scaleZ={3}/>
    {/* <Mesh id="collectible_mandatory_key_01" material='m_emissive_green'  y={0}  rotY={0} scaleY={1} scaleX={1} scaleZ={1}/> */}
  </HNode>
)

const CandyKey: HDKComponent = ({ ...props }) => (
  <Spinning {...props}>
    <HNode
      engineProps={{
        rendering: {
          meshID: 'en_p_sugar_candy_01',
          materialID: 't_striped_candy_01',
        },
        collectible: {
          type: 'MANDATORY',
          pointValue: 1,
          collectFxId: 'fx_collect_collectible_gem_01',
          resetFxId: 'fx_reset_collectible_gem_01',
          grabbingOffset: [0, 0, 0],
          grabbingRadius: 5,
        },
      }}
    > 
        <Prefab id="cube_01" material='m_emissive_green'  y={30}  rotY={0} scaleY={1} scaleX={1} scaleZ={1}/>
    </HNode>
  </Spinning>
);






const MAZE_LAYOUT = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const renderMaze = (mazeLayout) => {
  return mazeLayout.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      const x = colIndex * 10;
      const y = 0;
      const z = rowIndex * 10;

      if (cell === 1) {
        return <BlockRectangle x={x} y={y} z={z} rotY={0} key={`${rowIndex}-${colIndex}`} />;
      } else if (cell === 0) {
        return   <>
        
         {/* <Prefab id="collectible_mandatory_key_01" x={x} y={1} z={z} rotY={0} scale={2} key={`${rowIndex}-${colIndex}`} /> */}
        
         {/* <Prefab id="cube_01" material='m_emissive_green' x={x} y={30} z={z} rotY={0} scaleY={1} scaleX={1} scaleZ={1} key={`${rowIndex}-${colIndex}`} />  */}
        <Key x={x} y={y} z={z}/>
        {/* <CandyKey x={x} y={y} z={z}/> */}
        
        </>
      } else {
        return null;
      }
    });
  });
};


const Environment: HDKComponent = props => (
  <HNode scale={0.5}>

    {renderMaze(MAZE_LAYOUT)}
    <Floor x={135.1} y={0} z={125.8} scaleX={20} scaleZ={20} />
  </HNode>
)









const World = () => (
  <HNode>



<Enemy colour="palette_01_green" points={[[45, 0, 45], [45, 0, 45],
  [63, 0, 45], [63, 0, 45],
  [65, 0, 59], [65, 0, 59],
  [45, 0, 60], [45, 0, 60],
  [45, 0, 80], [45, 0, 80],
  [100, 0, 81], [100, 0, 81],
  [100, 0, 95], [100, 0, 95],
  [79, 0, 95], [79, 0, 95],
  [79, 0, 110], [79, 0, 110],
  [100, 0, 109], [100, 0, 109],
  [100, 0, 125], [100, 0, 125]
]} />

<Enemy colour="m_emissive_green" points={[[45, 0, 45], [45, 0, 45],
  [63, 0, 45], [63, 0, 45],
  [65, 0, 59], [65, 0, 59],
  [45, 0, 60], [45, 0, 60],
  [45, 0, 80], [45, 0, 80],
  [100, 0, 81], [100, 0, 81],
  [100, 0, 95], [100, 0, 95],
  [79, 0, 95], [79, 0, 95],
  [79, 0, 110], [79, 0, 110],
  [100, 0, 109], [100, 0, 109],
  [100, 0, 125], [100, 0, 125]
]} />

<Enemy colour="t_lava_01" points={[[45, 0, 45], [45, 0, 45],
  [63, 0, 45], [63, 0, 45],
  [65, 0, 59], [65, 0, 59],
  [45, 0, 60], [45, 0, 60],
  [45, 0, 80], [45, 0, 80],
  [100, 0, 81], [100, 0, 81],
  [100, 0, 95], [100, 0, 95],
  [79, 0, 95], [79, 0, 95],
  [79, 0, 110], [79, 0, 110],
  [100, 0, 109], [100, 0, 109],
  [100, 0, 125], [100, 0, 125]
]} />

<Enemy colour="t_pinball_floor_01_t8" points={[[45, 0, 45], [45, 0, 45],
  [63, 0, 45], [63, 0, 45],
  [65, 0, 59], [65, 0, 59],
  [45, 0, 60], [45, 0, 60],
  [45, 0, 80], [45, 0, 80],
  [100, 0, 81], [100, 0, 81],
  [100, 0, 95], [100, 0, 95],
  [79, 0, 95], [79, 0, 95],
  [79, 0, 110], [79, 0, 110],
  [100, 0, 109], [100, 0, 109],
  [100, 0, 125], [100, 0, 125]
]} />


 
    <Environment />




    <Spawnpoint x={5.0} y={16.0} z={5.1} rotY={230}/>
    <Spawnpoint x={5.2} y={0.2} z={5.3} rotY={230}/>








    {/* <OmnipresentSound id="a_mu_border_of_neo_tokyo_01" volume={1} /> */}
    {/* <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5} /> */}



  </HNode >
);

render(<World />, { environment: 'city_night_01' }); // cold_mountain_01

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?