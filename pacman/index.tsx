import { MaterialId } from '@hiber3d/hdk-core';
import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom, GLB, SpotLight } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound, Orbiting, Spinning, Portal, Checkpoint, PointSound, For, ImagePanel, AnimateAlongPath, Mesh } from '@hiber3d/hdk-react-components';
import React from 'react';










const Floor: HDKComponent = props => (
  <HNode x={0} y={0} z={0.0}
    {...props}>

    <Prefab
      id="cube_01"
      material="chrome" //t_black_marble_01
      x={0} y={0} z={0}
      scaleX={50}
      scaleZ={50}
      scaleY={0.2}
    />
  </HNode>
)

const Floor2: HDKComponent = props => (
  <HNode x={0} y={0} z={0.0}
    {...props}>

    <Prefab
      id="cube_01"
      material="m_emissive_pink"
      x={0} y={0} z={0}
      scaleX={50}
      scaleZ={50}
      scaleY={0.2}
    />
  </HNode>
)

const Enemy = ({ colour, points, duration }) => {
  const random = useRandom();
  const startAt = (random.range(1, 100)) / 100;
  // const duration = random.range(35, 40);
  console.log(startAt)
  console.log(duration)

  return (
    <AnimateAlongPath
      close={false}
      easing="LINEAR"
      showKeyframes={false}
      showPoints={false}
      tension={1}
      duration={duration}
      loop="RESTART"
      numberOfItems={100}
      // startAt={startAt * duration}
      points={points}
    >
      {/* <Prefab id="sphere_01" material={colour} scale={2.5} /> */}
      <MonsterGLB material={colour} y={3} rotY={0} scale={0.9} />
    </AnimateAlongPath>
  );
};





const BlockRectangle: HDKComponent = props => (
  <Prefab id="rounded_cube_02" material='t_black_marble_01' scaleX={5} scaleY={6} scaleZ={5} {...props} />
)

const BlockRectangleTransparent: HDKComponent = props => (
  <Prefab id="rounded_cube_02" material='t_glass_01' scaleX={5} scaleY={6} scaleZ={5} {...props} />
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
        grabbingRadius: 2,
      }
    }}
  >
    <Prefab id="cube_01" material='m_emissive_green' y={30} rotY={0} scaleY={1} scaleX={1} scaleZ={1} />
    <Prefab id="collectible_mandatory_key_01" material='m_emissive_green' y={0} rotY={0} scaleY={3} scaleX={3} scaleZ={3} />
    {/* <Mesh id="collectible_mandatory_key_01" material='m_emissive_green'  y={0}  rotY={0} scaleY={1} scaleX={1} scaleZ={1}/> */}
  </HNode>
)

const CandyKey: HDKComponent = ({ ...props }) => (
  <Spinning {...props}>
    <HNode scale={5}
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
          grabbingRadius: 0,
        },
      }}
    >
      <HNode y={10}
        engineProps={{
          rendering: {
            meshID: 'box',
            materialID: 't_striped_candy_01',
          },

        }}
      />
      {/* <Prefab id="cube_01" material='m_emissive_green' y={30} rotY={0} scaleY={1} scaleX={1} scaleZ={1} /> */}
    </HNode>
  </Spinning>
);

const CollectibleGLB: HDKComponent = ({ ...props }) => (
  <Spinning {...props} axis='x' duration={10}>
    <GLB material='m_emissive_green' z={-2}

      engineProps={{
        collider: undefined,


        collectible: {
          type: 'MANDATORY',
          pointValue: 1,
          collectFxId: 'fx_collect_collectible_gem_01',
          resetFxId: 'fx_reset_collectible_gem_01',
          grabbingOffset: [0, -10, 0],
          grabbingRadius: 4,
        },
      }}
      // src="https://uploadthing.com/f/e4c613ff-87eb-4ae8-a5bb-a2378c0e0229_Pacman%20Collectible.glb"
      src="https://uploadthing.com/f/21c4331e-3928-4c05-91f8-f1a115d14325_collectible3.glb"

    />
  </Spinning>


);
const MonsterGLB: HDKComponent = ({ ...props }) => (

  <HNode>
    <SpotLight openingAngleDegs={30} radius={30} strength={100} color={[255, 0, 0]} y={2} rotX={-75} scaleY={0.5} x={0} z={2.5}>
      <Mesh id="en_p_light_cone_02" material={'t_light_cone_01' as Material} y={2.2} rotX={180} physical={false} />
    </SpotLight>
    <Prefab id="fx_particlesystem_magic_01" z={10} y={0} rotY={0} scaleY={2} scaleX={2} scaleZ={2} />
    <GLB  {...props}
      scale={20}
      src="https://uploadthing.com/f/a750d0d0-51af-4ca9-bc63-dff250611813_monster_no_texture.glb"
    />
    <Damaging amount={100} knockbackStrength={50} >
      <HNode engineProps={{
        collider: { collider: { meshId: "box", size: [3, 3, 3] } },
      }}>
      </HNode>
    </Damaging>
    {/* <PointSound y={0} x={0} src={{ id: 'a_am_bubbly_fire_01' }} radius={20} volume={2} /> */}
    <PointSound y={0} x={0} src={{ url: 'https://uploadthing.com/f/a88121b6-4ada-47d9-8180-f8419bee40ea_sounds.wav' }} radius={15} volume={2} />
    {/* <PointSound y={0} x={0} src={{ url: 'https://cdn.hibervr.com/sound/music/cheesy_disco.mp3' }} radius={20} volume={2} /> */}
  </HNode>


);



const MAZE_LAYOUT = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const renderMaze = (mazeLayout) => {
  return mazeLayout.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      const x = colIndex * 10;
      const y = 0;
      const z = rowIndex * 10;

      if (cell === 1) {
        return <HNode>
          <Animation animation={{
            x: [0, 0, 0, 0],
            y: [0, 0, 0, 0],
            rotY: [0, 0, 0, 0],
            // scale: [1, 1, 1, 1],
            scaleX: [1, 1, 0.001, 0.001],
            steps: [0, 15, 15.1, 20],
            // duration: 3,
            loop: 'RESTART',
            easing: 'LINEAR',
          }}>
            <BlockRectangle x={x} y={y} z={z} rotY={0} key={`${rowIndex}-${colIndex}`} />
          </Animation>
          <BlockRectangleTransparent x={x} y={y} z={z} rotY={0} key={`${rowIndex}-${colIndex}`} />
        </HNode>
      } else if (cell === 0) {
        return <>
          <CollectibleGLB x={x} y={2} z={z} rotZ={90} />
        </>
      } else if (cell === 2) {
        return <>
          <Prefab id="gpl_powerup_spawner_speed_boost_01" x={x} y={2} z={z} rotY={0} scale={3} key={`${rowIndex}-${colIndex}`} />
          <Prefab id="checkpoint_01" x={x} y={0} z={z} rotY={0} scale={3} key={`${rowIndex}-${colIndex}`} />
        </>
      } else if (cell === 3) {
        return <>
          <Prefab id="gpl_fan_01" material='m_emissive_yellow' x={x} y={1} z={z} rotY={0} scale={1} key={`${rowIndex}-${colIndex}`} />
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
    {/* <Animation animation={{
        x: [0, 0, 0, 0],
        y: [0, 0, 0, 0],
        rotY: [0, 0, 0, 0],
        // scale: [1, 1, 1, 1],
        scaleX: [1, 1, 0.01, 0.01],
        steps: [0, 25, 25.1, 30],
        // duration: 3,
        loop: 'RESTART',
        easing: 'LINEAR',
      }}> */}

    <Floor x={135.1} y={0} z={125.8} scaleX={20} scaleZ={20} />
    {/* </Animation>
    <Floor2 x={135.1} y={-0.1} z={125.8} scaleX={20} scaleZ={20} /> */}

  </HNode>
)


const PortalPlatform: HDKComponent = props => (
  <HNode {...props}>
    <HNode x={-2} z={1}>
      <Portal worldId="4xNjH4g28" z={6} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="56TwUAE20" z={3} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="4xZNcwC3L" z={0} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="4wQdjSa21" z={-3} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="4x4LudA2J" z={-6} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="58JruIK2I" z={-9} x={0} y={1} rotY={90} scale={0.75} />
    </HNode>
    <Prefab
      id="cube_01"
      material="t_neon_red_01"
      x={0} y={0} z={0}
      scaleX={5}
      scaleZ={10}
      scaleY={0.2}
    />
  </HNode>
)






const World = () => (
  <HNode>



    <Enemy colour="t_gore_01"
      duration={80}
      points={
        [[45, 0, 45], [45, 0, 45],
        [63, 0, 45], [63, 0, 45],
        [65, 0, 59], [65, 0, 59],
        [45, 0, 60], [45, 0, 60],
        [45, 0, 80], [45, 0, 80],
        [100, 0, 81], [100, 0, 81],
        [100, 0, 95], [100, 0, 95],
        [79, 0, 95], [79, 0, 95],
        [79, 0, 110], [79, 0, 110],
        [100, 0, 109], [100, 0, 109],
        [100, 0, 125], [100, 0, 125],
        [100, 0, 109], [100, 0, 109],
        [79, 0, 110], [79, 0, 110],
        [79, 0, 95], [79, 0, 95],
        [100, 0, 95], [100, 0, 95],
        [100, 0, 81], [100, 0, 81],
        [45, 0, 80], [45, 0, 80],
        [45, 0, 60], [45, 0, 60],
        [65, 0, 59], [65, 0, 59],
        [63, 0, 45], [63, 0, 45],
        [45, 0, 45], [45, 0, 45]
        ]} />

    <Enemy colour="t_lava_01"
      duration={120}
      points={
        [[5, 0, 5], [5, 0, 5],
        [5, 0, 30], [5, 0, 30],
        [29, 0, 30], [29, 0, 30],
        [45, 0, 30], [45, 0, 30],
        [45, 0, 45], [45, 0, 45],
        [64, 0, 45], [64, 0, 45],
        [63, 0, 60], [63, 0, 60],
        [72, 0, 60], [72, 0, 60],
        [72, 0, 70], [72, 0, 70],
        [90, 0, 70], [90, 0, 70],
        [55, 0, 70], [55, 0, 70],
        [73, 0, 70], [73, 0, 70],
        [73, 0, 60], [73, 0, 60],
        [100, 0, 60], [100, 0, 60],
        [100, 0, 80], [100, 0, 80],
        [46, 0, 80], [46, 0, 80],
        [100, 0, 80], [100, 0, 80],
        [100, 0, 60], [100, 0, 60],
        [73, 0, 60], [73, 0, 60],
        [73, 0, 70], [73, 0, 70],
        [55, 0, 70], [55, 0, 70],
        [90, 0, 70], [90, 0, 70],
        [72, 0, 70], [72, 0, 70],
        [72, 0, 60], [72, 0, 60],
        [63, 0, 60], [63, 0, 60],
        [64, 0, 45], [64, 0, 45],
        [45, 0, 45], [45, 0, 45],
        [45, 0, 30], [45, 0, 30],
        [29, 0, 30], [29, 0, 30],
        [5, 0, 30], [5, 0, 30],
        [5, 0, 5], [5, 0, 5]
  ]} />

    <Enemy colour="chrome"
      duration={120}
      points={
        [[140, 0, 5], [140, 0, 5],
        [140, 0, 30], [140, 0, 30],
        [115, 0, 30], [115, 0, 30],
        [115, 0, 95], [115, 0, 95],
        [115, 0, 125], [115, 0, 125],
        [140, 0, 125], [140, 0, 125],
        [140, 0, 140], [140, 0, 140],
        [81, 0, 140], [81, 0, 140],
        [80, 0, 126], [80, 0, 126],
        [100, 0, 125], [100, 0, 125],
        [45, 0, 110], [45, 0, 110],
        [45, 0, 126], [45, 0, 126],
        [65, 0, 126], [65, 0, 126],
        [65, 0, 140], [65, 0, 140],
        [6, 0, 140], [6, 0, 140],
        [65, 0, 140], [65, 0, 140],
        [65, 0, 126], [65, 0, 126],
        [45, 0, 126], [45, 0, 126],
        [45, 0, 110], [45, 0, 110],
        [100, 0, 125], [100, 0, 125],
        [80, 0, 126], [80, 0, 126],
        [81, 0, 140], [81, 0, 140],
        [140, 0, 140], [140, 0, 140],
        [140, 0, 125], [140, 0, 125],
        [115, 0, 125], [115, 0, 125],
        [115, 0, 95], [115, 0, 95],
        [115, 0, 30], [115, 0, 30],
        [140, 0, 30], [140, 0, 30],
        [140, 0, 5], [140, 0, 5]
  ]} />

    <Enemy colour="t_swamp_ground"
      duration={60}
      points={
        [[45, 0, 45], [45, 0, 45],
        [63, 0, 45], [63, 0, 45],
        [65, 0, 59], [65, 0, 59],
        [45, 0, 60], [45, 0, 60],
        [45, 0, 80], [45, 0, 80],
        [100, 0, 81], [100, 0, 81],
        [100, 0, 95], [100, 0, 95],
        [79, 0, 95], [79, 0, 95],
        [79, 0, 110], [79, 0, 110],
        [100, 0, 109], [100, 0, 109],
        [100, 0, 125], [100, 0, 125],
        [100, 0, 109], [100, 0, 109],
        [79, 0, 110], [79, 0, 110],
        [79, 0, 95], [79, 0, 95],
        [100, 0, 95], [100, 0, 95],
        [100, 0, 81], [100, 0, 81],
        [45, 0, 80], [45, 0, 80],
        [45, 0, 60], [45, 0, 60],
        [65, 0, 59], [65, 0, 59],
        [63, 0, 45], [63, 0, 45],
        [45, 0, 45], [45, 0, 45]
  ]} />




    <Environment />
    <PortalPlatform x={4.7} y={6.0} z={71.2}/>

    {/* <HNode x={5.2} y={0.2} z={30.0} rotY={35}>
      <Enemy colour="chrome"
        duration={40}
        points={[[0, 0, 0], [1, 0, 1],
        ]} />
    </HNode> */}


    <Spawnpoint x={5.0} y={0.2} z={5.1} />


    {/* <Prefab id = "gpl_fan_01" x={4.4} y={0.2} z={44.4} rotY={0} scale={0.2}/>
    <Prefab id = "gpl_powerup_spawner_speed_boost_01" x={5.2} y={0.2} z={5.3} rotY={0} scale={0.2}/> */}






    {/* <OmnipresentSound id="a_mu_border_of_neo_tokyo_01" volume={1} /> */}
    {/* <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5} /> */}



  </HNode >
);

render(<World />, { environment: 'dark_night_01' }); // cold_mountain_01, dark_night_01, midday_clear_01

// To do
// Colour schemes
// Monster animation -- done
// Ladders -- done
// Transparent wall flash -- done
// Enemy paths -- done
// Enemy sounds -- done
// wall animations -- done
// more boosters -- not done
// thumbnails -- done