import { MaterialId } from '@hiber3d/hdk-core';
import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound, Orbiting, Spinning, Portal, Checkpoint, PointSound, For, ImagePanel, AnimateAlongPath } from '@hiber3d/hdk-react-components';
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


const Enemy: HDKComponent = props => {
  const random = useRandom();
  const startAt = random.range(0, 5);

  return (

<AnimateAlongPath
  close={false}
  easing="LINEAR"
  showKeyframes={true}
  showPoints={true}
  tension={1}
  duration={20}
  loop="REVERSE"
  numberOfItems={30}
  startAt={startAt}

  points={[
    [114, 0, 111],
    [114, 0, 111],
    [115, 0, 29],
    [115, 0, 29],
    [30, 0, 30],
    [18, 0, 30],
    [18, 0, 30],
  ]
  }>

  <Prefab id="sphere_01" material='m_emissive_yellow' scale={2.5}/>
</AnimateAlongPath>
  )
}


const Keys: HDKComponent = props => (
  <Path
    points={[
      [46, 0, 45],
      [18, 0, 45],
      [18, 0, 30],
      [8, 0, 30],
    ]}
    numberOfItems={20}
    tension={0}
    renderItem={() => (
      <>
        {/* <Prefab id="cube_01" /> */}
        <Prefab id="collectible_mandatory_key_01" y={0} rotY={-180} />
      </>
    )}
  />
)


const BlockLine: HDKComponent = props => (
  <Prefab id="rounded_cube_02" material='t_hex_disco_01' scaleX={3} scaleY={3}  {...props} />
)

const BlockRectangle: HDKComponent = props => (
  <Prefab id="rounded_cube_02" material='t_hex_disco_01' scaleX={5} scaleY={6} scaleZ={5} {...props} />
)

const BlockRectangleLong: HDKComponent = props => (
  <Prefab id="rounded_cube_02" material='t_hex_disco_01' scaleX={5} scaleY={3} scaleZ={2} {...props} />
)

const BlockLShape: HDKComponent = props => (
  <Prefab id="rounded_cube_02" material='t_hex_disco_01' scaleX={5} scaleY={3} scaleZ={2} {...props} />
)


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
        return <Prefab id="collectible_mandatory_key_01" x={x} y={1} z={z} rotY={0} scale={2} key={`${rowIndex}-${colIndex}`} />;
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



    <Enemy />
    <Enemy />
    <Enemy />
    <Enemy />

    <Environment />




    <Spawnpoint rotY={90} x={0.4} y={5} z={0} />








    {/* <OmnipresentSound id="a_mu_border_of_neo_tokyo_01" volume={1} /> */}
    {/* <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5} /> */}



  </HNode >
);

render(<World />, { environment: 'midday_clear_01' }); // cold_mountain_01

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?