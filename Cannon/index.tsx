import { MaterialId } from '@hiber3d/hdk-core';
import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound, Orbiting, Spinning, Portal, Checkpoint, PointSound, For, ImagePanel } from '@hiber3d/hdk-react-components';
import React from 'react';



const Floor: HDKComponent = props => {

  return (
    <Prefab
      {...props}
    // id="en_m_hiberpunk_building_01_top"
    // material="t_rock_02"

    />


  )
}







const Cannon: HDKComponent = ({ speed = 'low', ...props }) => {
  const random = useRandom();
  var addToSteps = (random.range(1, 10) / 10);
  var stepsInput = [1, 1.8, 2.2];

  // Determine steps based on speed
  const stepsValue1 = speed === 'high' ? [0, 2] : [0, 5]; // up and down
  const stepsValue2 = speed === 'high' ? [0, 5] : [0, 9]; // left and right

  return (
    <HNode {...props}>
      

      <HNode x={5} y={5} z={35}>
        <Animation animation={{
          x: [0, 0],
          y: [0, 0],
          z: [0, 0],
          rotX: [0, 20],
          rotY: [0, 0],
          rotZ: [0, 0],
          scaleX: [1, 1],
          scaleY: [1, 1],
          scaleZ: [1, 1],
          steps: stepsValue1,  // Use stepsValue here
          loop: 'REVERSE',
          easing: 'LINEAR',
        }}>
          <Animation animation={{
            x: [0, 0],
            y: [0, 0],
            z: [0, 0],
            rotX: [0, 0],
            rotY: [-20, 20],
            rotZ: [0, 0],
            scaleX: [1, 1],
            scaleY: [1, 1],
            scaleZ: [1, 1],
            steps: stepsValue2,  // Use stepsValue here
            // duration: 3,
            loop: 'REVERSE',
            easing: 'LINEAR',
          }}>

            <Prefab id="torus_thin_01" material='t_glass_01' x={0} y={0} z={0} rotX={60} rotY={0} rotZ={0} scaleX={2} scaleY={50} scaleZ={2} />
            <Prefab id="disc_02" material='palette_01_red' x={0} y={-0.5} z={2} rotX={140} rotY={0} rotZ={0} scaleX={0.2} scaleY={0.2} scaleZ={0.2} />
            <Animation animation={{
              x: [0, 0, 0],
              y: [0, 0, 0],
              z: [0, 0, 32.5],
              rotY: [0, 0, 0],
              rotX: [0, 0, 0],
              scaleX: [1, 1, 1],
              scaleY: [1, 1, 1],
              scaleZ: [1, 1, 1],
              steps: [0, 5, 6],
              // duration: 3,
              loop: 'RESTART',
              easing: 'EASE_IN_CUBIC',
            }}>
              <HNode>
                <Prefab id="cube_01" material='t_neon_grid_01' x={0} y={0} z={-20} rotX={60} rotY={0} rotZ={0} scaleX={3} scaleY={2} scaleZ={3}></Prefab>
              </HNode>
            </Animation>

          </Animation>
        </Animation>
      </HNode>



      <Prefab id="cube_01" material='t_hexagon_pattern_01' x={4} y={0} z={30} rotX={-20} rotY={0} rotZ={0} scaleX={6} scaleY={1} scaleZ={6} />
      {/* <Prefab id="cube_01" material='t_neon_red_01' x={0} y={3} z={30} rotX={0} rotY={0} rotZ={0} scaleX={6} scaleY={1} scaleZ={6} /> */}


    </HNode>
  )




}





const GroundArea: HDKComponent = props => (
  <HNode x={0} y={0} z={0.0}>

    <Ground hilly={0} material="t_grass_01" y={0} repeatX={8} repeatZ={8} rotX={0} />

    {/* <Ground hilly={40} material="chrome" y={80} repeatX={8} repeatZ={8} rotX={-180} /> */}

  </HNode>
)

const WelcomeSign: HDKComponent = props => (
  <InfoPanel
    maxShowDistance={3}
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


const Goal: HDKComponent = props => {
  return (
    <>

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
          <PointSound y={30} x={0} src={{ id: 'a_mu_district_h_01' }} radius={100} volume={1} />
          <Prefab
            id="goal_01"
            material="t_neon_red_01"
            scale={1}
            x={0} y={-0.6} z={0}
          />
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
            id="cube_01"
            material="m_emissive_green"
            x={0} y={0} z={5}
            rotY={0}
            // rotX={20}
            scaleX={5}
            scaleZ={0.2}
            scaleY={5}
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

    </>
  )
}



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


const SpawnPlatform: HDKComponent = props => (
  <HNode
    {...props}>
    <WelcomeSign x={-5} y={1.5} z={3} rotY={180} />
    <Spawnpoint x={0} y={0} z={0} />
  </HNode>
)


const GoalBox: HDKComponent = ({ ...props }) => {

  return (

    <>
      <HNode x={0} y={30} z={0} rotX={-90}
        {...props}
      >



        <Prefab
          id="cube_01"
          material="glass"
          x={0} y={-2.5} z={0}
          rotY={-180}
          // rotX={20}
          scaleX={5}
          scaleZ={5}
          scaleY={0.1}
        />

        <Prefab
          id="goal_01"
          material="t_neon_red_01"
          scale={2}
          x={0} y={0} z={-5}
          rotX={90}
        />





        <HNode>

          <Prefab
            id="cube_01"
            material="glass"
            x={5} y={0} z={0}
            rotZ={90}
            // rotX={20}
            scaleX={3}
            scaleZ={5}
            scaleY={0.2}
          />

          <Prefab
            id="cube_01"
            material="glass"
            x={-5} y={0} z={0}
            rotZ={90}
            // rotX={20}
            scaleX={3}
            scaleZ={5}
            scaleY={0.2}
          />



          <Prefab
            id="cube_01"
            material="glass"
            x={0} y={0} z={5}
            rotZ={90}
            rotX={90}
            scaleX={3}
            scaleZ={5}
            scaleY={0.2}
          />
          <Prefab
            id="cube_01"
            material="glass"
            x={0} y={0} z={-5}
            rotZ={90}
            rotX={90}
            // rotX={20}
            scaleX={3}
            scaleZ={5}
            scaleY={0.2}
          />

        </HNode>
      </HNode>


    </>
  )

}


const Rings: HDKComponent = props => (
  <HNode
    {...props}>
    <Prefab id="en_m_primitive_wall_02" material='t_black_marble_01' x={0} y={30} z={0} rotX={0} rotY={0} rotZ={0} scaleX={0.6} scaleY={0.6} scaleZ={0.6} />
    <Prefab id="en_m_primitive_wall_02" material='t_black_marble_01' x={30} y={30} z={120} rotX={0} rotY={0} rotZ={0} scaleX={3} scaleY={3} scaleZ={3} />
    <Prefab id="en_m_primitive_wall_02" material='t_black_marble_01' x={-30} y={30} z={60} rotX={0} rotY={0} rotZ={0} scaleX={2} scaleY={2} scaleZ={2} />
  </HNode>
)





const World = () => (
  <HNode>





    <Rings x={28.7} y={0} z={240.2} />
    <Cannon speed='high' />
    <Cannon x={20} speed='low' />
    <GroundArea />
    <SpawnPlatform x={4.1} y={2.0} z={29.5} />
    <SpawnPlatform x={24.2} y={1.8} z={28.9} />
    <GoalBox x={-0.9} y={34.4} z={300} scale={0.7} />
    <GoalBox x={58.4} y={37.3} z={358.6} scale={1} />
    <GoalBox x={28.7} y={31} z={240} scale={0.25} />














  </HNode >
);

render(<World />, { environment: 'cloud_pillars_01' }); // cold_mountain_01

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?