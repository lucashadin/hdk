import { MaterialId } from '@hiber3d/hdk-core';
import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound, Orbiting, Spinning, Portal, Checkpoint, PointSound, For, ImagePanel } from '@hiber3d/hdk-react-components';
import React from 'react';














const GroundArea: HDKComponent = props => (

  <Animation animation={{
    // up and down
    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rotX: [0, 0, 90, 90, 180, 180, 270, 270, 360, 360],
    rotY: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rotZ: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    scaleX: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    scaleY: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    scaleZ: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    steps: [0, 20, 25, 40, 45, 60, 65, 80, 85, 100],  // Use stepsValue here
    loop: 'REVERSE',
    easing: 'LINEAR',
  }}>
    <HNode x={0} y={0} z={0.0}>

      <HNode x={0} y={0} z={0}>
        <Ground hilly={5} material="t_asphalt_01" invisibleWalls={false} y={0} repeatX={0.5} repeatZ={0.5} rotX={0} />
        <Spawnpoint x={0} y={5} z={0} />
      </HNode>
      <Ground hilly={5} material="t_grass_01" invisibleWalls={false} x={0} y={63.6} z={64.3} repeatX={0.5} repeatZ={0.5} rotX={90} rotY={180} />
      <Ground hilly={5} material="t_carpet_01" invisibleWalls={false} x={0} y={63.6} z={-61.3} repeatX={0.5} repeatZ={0.5} rotX={90} />
      <Ground hilly={5} material="t_arrows_pattern_01" invisibleWalls={false} x={-63.6} y={63.6} z={0} repeatX={0.5} repeatZ={0.5} rotZ={90} rotX={180} />
      <Ground hilly={5} material="t_bricks_02" invisibleWalls={false} x={63.6} y={63.6} z={0} repeatX={0.5} repeatZ={0.5} rotZ={90} />
      <Ground hilly={5} material="gpl_rotating_twist_01" invisibleWalls={false} x={0} y={127} z={10} repeatX={0.5} repeatZ={0.5} rotX={180} />
      <RocksDecoration y={0} />


      {/* <Ground hilly={40} material="chrome" y={80} repeatX={8} repeatZ={8} rotX={-180} /> */}

    </HNode>
  </Animation>
)

const WelcomeSign: HDKComponent = props => (
  <InfoPanel
    maxShowDistance={2}
    header="Welcome Glass Cannon"
    body="Stand on the red circle then try to fly through the rings."
    // url="https://developer.hiber3d.com/docs"
    openUrlInNewTab={true}>
    <Prefab
      {...props}
      id="sign_wooden_01_question"
    // material='t_stone_tiles_01'

    />
  </InfoPanel>
)






const PortalPlatform: HDKComponent = props => (
  <HNode x={-11} y={10} z={1}>
    <HNode x={-2} z={0}>
      <Portal worldId="4xNjH4g28" z={6} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="56TwUAE20" z={3} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="4xZNcwC3L" z={0} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="4x4LudA2J" z={-6} x={0} y={1} rotY={90} scale={0.75} />
      <Portal worldId="4wQdjSa21" z={-3} x={0} y={1} rotY={90} scale={0.75} />
    </HNode>
    <Prefab
      id="cube_01"
      material="t_neon_red_01"
      x={0} y={0} z={0}
      scaleX={5}
      scaleZ={8}
      scaleY={0.2}
    />
  </HNode>
)









const LevelSign: HDKComponent = ({ level, ...props }) => {
  return (
    <HNode {...props}>
      <ImagePanel
        src={`https://placehold.co/100x25/000000/FFF/PNG?text=Level+${level}`}
        ratio={100 / 25}
        scale={0.5}
        backside={true}
      // frame={'modern'}
      />
    </HNode>
  );
};


const PrefabDecoration: HDKComponent = ({ prefabList, ...props }) => {
  return (
    <Distribute
      {...props}
      gladeRadius={0}
      outerBoundRadius={60}
      gapSizeMin={5}
      gapSizeMax={10}
      itemAreaSizeMin={5}
      itemAreaSizeMax={10}
      gapFrequency={0.3}
      showGapArea={false}
      showItemArea={false}
      renderItem={() => {
        const random = useRandom();

        return (


          <Prefab id={random.fromArray(prefabList)}
            scale={random.range(1, 2)}
            rotY={random.range(0, 360)}
            rotX={random.range(-10, 10)}
            rotZ={random.range(-10, 10)}
            


          />


        );
      }}
    />
  );
};


const Goal: HDKComponent = props => {
  return (
    <>
      <Spinning duration={100}>
        <Animation animation={{
          x: [0, 0, 0, 0],
          y: [0, 0, 0, 0],
          rotY: [0, 0, 0, 0],
          // scale: [1, 1, 1, 1],
          scaleX: [1, 1, 1, 1],
          steps: [0, 15, 40, 60],
          // duration: 3,
          loop: 'RESTART',
          easing: 'EASE_IN_OUT_CUBIC',
        }}>
          <HNode
            {...props}>
            <Spawnpoint x={0} y={0} z={0} />
            <PointSound y={30} x={0} src={{ id: 'a_mu_district_h_01' }} radius={5} volume={1} />
            <Animation animation={{
              x: [0, 0, 0],
              y: [0, 10, 0],
              rotY: [0, 0, 0],
              // scale: [1, 1, 1, 1],
              scaleX: [1, 1, 1],
              steps: [0, 5, 10],
              // duration: 3,
              loop: 'RESTART',
              easing: 'EASE_IN_CUBIC',
            }}>
              <Prefab
                id="cube_01"
                material="t_neon_red_01"
                x={-5} y={0} z={0}
                scaleX={1}
                scaleZ={1}
                scaleY={0.2}
              />
            </Animation>
            {/* <Prefab
            id="fx_particlesystem_fireworks_01"
            material="t_rainbow_02"
            scale={1}
            x={0} y={0} z={0}
          /> */}
            <Prefab
              id="cube_01"
              material="glass"
              x={0} y={-2.5} z={0}
              rotY={-180}
              // rotX={20}
              scaleX={5}
              scaleZ={5}
              scaleY={1}
            />

            <Prefab
              id="sofa_01_t2"
              // material="glass"
              x={0} y={-0.4} z={-4}
              // rotY={-180}
              // rotX={20}
              scaleX={1}
              scaleZ={1}
              scaleY={1}
            />
            <Prefab
              id="sofa_01_t2"
              // material="glass"
              x={-2} y={-0.4} z={-2}
              rotY={90}
              // rotX={20}
              scaleX={1}
              scaleZ={1}
              scaleY={1}
            />
            <Prefab
              id="fridge_01"
              material="t_neon_red_01"
              x={4} y={-0.4} z={4}
              rotY={210}
              // rotX={20}
              scaleX={1}
              scaleZ={1}
              scaleY={1}
            />
            <Prefab
              id="vase_cactus_01"
              // material="glass"
              x={4} y={-0.4} z={-4}
              rotY={210}
              // rotX={20}
              scaleX={2}
              scaleZ={2}
              scaleY={2}
            />


            <PortalPlatform />
          </HNode>
        </Animation>
      </Spinning>
    </>
  )
}


const InvisibleCheckpoint: HDKComponent = props => (
  <HNode
    {...props}>
    <HNode

      engineProps={{
        triggerBox: { size: [5, 5, 5], offset: [0, 0, 0] },
        checkpoint: {},
      }}
    >
      {/* <Prefab id='checkpoint_01' scale={1.5} x={0} y={0} z={0} /> */}
    </HNode>
  </HNode>
)



const IndividualLevel: HDKComponent = ({ groundMaterial, prefabList, ...props }) => {


  return (
    <HNode  {...props}>
      <Ground hilly={0} material={groundMaterial} invisibleWalls={false} repeatX={0.5} repeatZ={0.5} />
      <PrefabDecoration prefabList={prefabList} />
    </HNode>
  );
};









;

{/* <HNode x={0} y={0} z={0}>
<Ground hilly={5}  material="t_asphalt_01" invisibleWalls = {false} y={0} repeatX={0.5} repeatZ={0.5} rotX={0} />
<Spawnpoint x={0} y={5} z={0} />
</HNode>
<Ground hilly={5}  material="t_grass_01" invisibleWalls = {false} x={0} y={63.6} z={64.3} repeatX={0.5} repeatZ={0.5} rotX={90} rotY={180}/>
<Ground hilly={5}  material="t_carpet_01" invisibleWalls = {false} x={0} y={63.6} z={-61.3} repeatX={0.5} repeatZ={0.5} rotX={90} />
<Ground hilly={5}  material="t_arrows_pattern_01" invisibleWalls = {false} x={-63.6} y={63.6} z={0} repeatX={0.5} repeatZ={0.5} rotZ={90} rotX={180}/>
<Ground hilly={5}  material="t_bricks_02" invisibleWalls = {false} x={63.6} y={63.6} z={0} repeatX={0.5} repeatZ={0.5} rotZ={90} />
<Ground hilly={5}  material="gpl_rotating_twist_01" invisibleWalls = {false} x={0} y={127} z={10} repeatX={0.5} repeatZ={0.5} rotX={180} />
 */}


const World = () => (

  <HNode>

    <Animation animation={{
      // up and down
      x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rotX: [90, 90, 180, 180, 270, 270, 0, 0, 0, 0, 0, 0, 90,],
      rotY: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rotZ: [0, 0, 0, 0, 0, 0, 90, 90, 270, 270, 0, 0, 0],
      scaleX: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      scaleY: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      scaleZ: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      steps: [0, 20, 25, 40, 45, 60, 65, 80, 85, 100, 105, 120, 125],  // Use stepsValue here
      loop: 'RESTART',
      easing: 'LINEAR',
    }}>
      <HNode>

        {/* City */}
        <IndividualLevel groundMaterial='t_ice_02'
          prefabList={['collectible_mandatory_key_01', 'house_01', 'house_02', 'floor_lamp_01', 'apple_tree_01_t1', 'apple_tree_01_t2', 'en_p_trashbags_01']}
          y={-95} rotX={0} />

        {/* Desert */}
        <IndividualLevel groundMaterial='t_sand_01'
          prefabList={['collectible_mandatory_key_01', 'cliff_02_02', 'bull_skull_01', 'en_p_tumbleweed_01', 'cactus_01']}
          x={0} y={-32} z={64.3} rotX={90} rotY={180} />

        {/* Jungle */}
        <IndividualLevel groundMaterial='t_bark_02'
          prefabList={['collectible_mandatory_key_01', 'en_p_jungle_root_01', 'h_jungle_static_spear_trap_01', 'ancient_urn_01', 'en_p_jungle_bush_cluster', 'mushroom_small_t2_01']}
          x={0} y={-32} z={-61.3} rotX={90} />

        {/* Gore */}
        <IndividualLevel groundMaterial='t_gore_01'
          prefabList={['collectible_mandatory_key_01', 'gore_pile_01', 'rotten_fence_01', 'coffin_01', 'tombstone_01', 'evil_eye_01']}
          x={-63.6} y={-32} z={0} rotZ={90} rotX={180} />

        {/* Sci Fi */}
        <IndividualLevel groundMaterial='t_sci_fi_tile_01'
          prefabList={['collectible_mandatory_key_01', 'hovering_sign_01', 'hovering_sign_03', 'trashcontainer_01_t1', 'trashcontainer_01', 'billboard_01_t1', 'glowing_cube_01']}
          x={63.6} y={-32} z={0} rotZ={90} />

        {/* Candy */}
        <IndividualLevel groundMaterial='gpl_rotating_twist_01'
          prefabList={['collectible_mandatory_key_01', 'gpl_rotating_twist_01', 'candy_straps', 'candy_cane', 'sugar_candy_01']}
          x={0} y={32} z={10} rotX={180} />
      </HNode>
    </Animation>



    <Goal x={107.3} y={50} z={112.6} />
    <Goal x={1} y={1} z={0} />
    <InvisibleCheckpoint x={0} y={0} z={0} />

  </HNode>



);

render(<World />, { environment: 'cloud_pillars_01' }); // cold_mountain_01

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?