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







const Cannon: HDKComponent = ({ speed = 'low', level, ...props }) => {
  const random = useRandom();


  // Determine steps based on speed
  const stepsValue1 = speed === 'high' ? [0, 4] : [0, 5]; // up and down
  const stepsValue2 = speed === 'high' ? [0, 10] : [0, 9]; // left and right

  return (
    <Animation animation={{
      // up and down
      x: [0, 0],
      y: [0, 0],
      z: [0, 0],
      rotX: [-5, 5],
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
        // left and right
        x: [0, 0],
        y: [0, 0],
        z: [0, 0],
        rotX: [0, 0],
        rotY: [-5, 5],
        rotZ: [0, 0],
        scaleX: [1, 1],
        scaleY: [1, 1],
        scaleZ: [1, 1],
        steps: stepsValue2,  // Use stepsValue here
        // duration: 3,
        loop: 'REVERSE',
        easing: 'LINEAR',
      }}>
    <HNode {...props}>


      <HNode x={3.5} y={5} z={4}>
       
            <Platform x={0} y={0} z={0} level={level} />
            <Prefab id="torus_thin_01" material='t_glass_01' x={0} y={0} z={0} rotX={68} rotY={0} rotZ={0} scaleX={2.0} scaleY={50} scaleZ={2.0} />
            <Prefab id="disc_02" material='palette_01_red' x={0} y={-0.1} z={4.0} rotX={150} rotY={0} rotZ={0} scaleX={0.2} scaleY={0.2} scaleZ={0.2} />
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
                <Prefab id="cube_01" material='t_rainbow_02' x={0} y={0} z={-20} rotX={62} rotY={0} rotZ={0} scaleX={3} scaleY={2} scaleZ={3}></Prefab>
              </HNode>
            </Animation>


      </HNode>



      <Prefab id="cube_01" material='t_hexagon_pattern_01' x={4} y={0} z={0} rotX={-20} rotY={0} rotZ={0} scaleX={6} scaleY={1} scaleZ={6} />
      {/* <Prefab id="cube_01" material='t_neon_red_01' x={0} y={3} z={30} rotX={0} rotY={0} rotZ={0} scaleX={6} scaleY={1} scaleZ={6} /> */}


    </HNode>
    </Animation>
        </Animation>
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


const Platform: HDKComponent = ({ level, ...props }) => {

  return (
    <HNode
      {...props}>
      <WelcomeSign x={-4.5} y={-0.5} z={0.8} rotY={180} />
      <LevelSign x={5.5} y={-1.23} z={0.5} scale={0.5} level={level} />
      <LevelSign x={0} y={-3} z={2} scale={1.7} level={level} rotY={180} />
      <Checkpoint x={0} y={-4.3} z={-8} />

    </HNode>
  )
}


const GoalBox: HDKComponent = ({ level, ...props }) => {

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
          id="collectible_mandatory_key_01"
          material="t_neon_red_01"
          scale={3}
          x={0} y={1} z={-4-1*(level/10)}
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


const Target: HDKComponent = props => (
  <HNode
    {...props}>

    <Prefab id="sphere_01" material='m_emissive_yellow' x={0} y={0} z={0} rotX={90} rotY={0} rotZ={0} scaleX={3} scaleY={0.05} scaleZ={3} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={0.1} rotX={90} rotY={0} rotZ={0} scaleX={3.1} scaleY={0.05} scaleZ={3.1} />
    <Prefab id="sphere_01" material='m_emissive_yellow' x={0} y={0} z={0.2} rotX={90} rotY={0} rotZ={0} scaleX={5} scaleY={0.05} scaleZ={5} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={0.3} rotX={90} rotY={0} rotZ={0} scaleX={5.1} scaleY={0.05} scaleZ={5.1} />
    <Prefab id="sphere_01" material='m_emissive_yellow' x={0} y={0} z={0.4} rotX={90} rotY={0} rotZ={0} scaleX={7} scaleY={0.05} scaleZ={7} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={0.5} rotX={90} rotY={0} rotZ={0} scaleX={7.1} scaleY={0.05} scaleZ={7.1} />
    <Prefab id="sphere_01" material='palette_01_red' x={0} y={0} z={0.6} rotX={90} rotY={0} rotZ={0} scaleX={9} scaleY={0.05} scaleZ={9} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={0.7} rotX={90} rotY={0} rotZ={0} scaleX={9.1} scaleY={0.05} scaleZ={9.1} />
    <Prefab id="sphere_01" material='palette_01_red' x={0} y={0} z={0.8} rotX={90} rotY={0} rotZ={0} scaleX={11} scaleY={0.05} scaleZ={11} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={0.9} rotX={90} rotY={0} rotZ={0} scaleX={11.1} scaleY={0.05} scaleZ={11.1} />
    <Prefab id="sphere_01" material='palette_01_blue' x={0} y={0} z={1.0} rotX={90} rotY={0} rotZ={0} scaleX={13} scaleY={0.05} scaleZ={13} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={1.1} rotX={90} rotY={0} rotZ={0} scaleX={13.1} scaleY={0.05} scaleZ={13.1} />
    <Prefab id="sphere_01" material='palette_01_blue' x={0} y={0} z={1.2} rotX={90} rotY={0} rotZ={0} scaleX={15} scaleY={0.05} scaleZ={15} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={1.3} rotX={90} rotY={0} rotZ={0} scaleX={15.1} scaleY={0.05} scaleZ={15.1} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={1.4} rotX={90} rotY={0} rotZ={0} scaleX={17} scaleY={0.05} scaleZ={17} />
    <Prefab id="sphere_01" material='palette_01_white' x={0} y={0} z={1.5} rotX={90} rotY={0} rotZ={0} scaleX={17.1} scaleY={0.05} scaleZ={17.1} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={1.6} rotX={90} rotY={0} rotZ={0} scaleX={19} scaleY={0.05} scaleZ={19} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={1.7} rotX={90} rotY={0} rotZ={0} scaleX={19.1} scaleY={0.05} scaleZ={19.1} />
    <Prefab id="sphere_01" material='palette_01_white' x={0} y={0} z={1.8} rotX={90} rotY={0} rotZ={0} scaleX={21} scaleY={0.05} scaleZ={21} />
    <Prefab id="sphere_01" material='palette_01_black' x={0} y={0} z={1.9} rotX={90} rotY={0} rotZ={0} scaleX={21.1} scaleY={0.05} scaleZ={21.1} />
    <Prefab id="sphere_01" material='palette_01_white' x={0} y={0} z={2.0} rotX={90} rotY={0} rotZ={0} scaleX={23} scaleY={0.05} scaleZ={23} />



  </HNode>
)

const TargetGoalCombined: HDKComponent = ({ level, ...props }) => {
  const random = useRandom();


  // Determine steps based on speed
  const stepsValue1 = 10 - (8 * (level / 10)) // forward and back
  const stepsValue2 = 11 - (8 * (level / 10)) // up and down
  const stepsValue3 = 12 - (8 * (level / 10)) // left and right

  return (
    <Animation animation={{
      // forward and back
      x: [0, 0],
      y: [0, 0],
      z: [-20, 20],
      rotX: [0, 0],
      rotY: [0, 0],
      rotZ: [0, 0],
      scaleX: [1, 1],
      scaleY: [1, 1],
      scaleZ: [1, 1],
      steps: [0, stepsValue1],  // Use stepsValue here
      loop: 'REVERSE',
      easing: 'LINEAR',
    }}>
      <Animation animation={{
        // up and down
        x: [0, 0],
        y: [-15, 20],
        z: [0, 0],
        rotX: [0, 0],
        rotY: [0, 0],
        rotZ: [0, 0],
        scaleX: [1, 1],
        scaleY: [1, 1],
        scaleZ: [1, 1],
        steps: [0, stepsValue2],  // Use stepsValue here
        loop: 'REVERSE',
        easing: 'LINEAR',
      }}>
        <Animation animation={{
          // left and right
          x: [-20, 20],
          y: [0, 0],
          z: [0, 0],
          rotX: [0, 0],
          rotY: [0, 0],
          rotZ: [0, 0],
          scaleX: [1, 1],
          scaleY: [1, 1],
          scaleZ: [1, 1],
          steps: [0, stepsValue3],  // Use stepsValue here
          // duration: 3,
          loop: 'REVERSE',
          easing: 'LINEAR',
        }}>
          <HNode
            {...props}>
            <Target x={0} y={0} z={0.5} scale={0.7} />
            <GoalBox x={0} y={0} z={0} scale={0.5} level={level}/>
            <LevelSign x={0} y={-21.5} z={0} scale={5} level={level} />


          </HNode>
        </Animation>
      </Animation>
    </Animation>
  )
}

const BackToCannon: HDKComponent = props => (
  <HNode
    {...props}>
    <Prefab id="gpl_booster_plate_02" material='m_emissive_green' x={0} y={0} z={0} rotX={0} rotY={8} rotZ={0} scaleX={10} scaleY={1} scaleZ={230} />

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
          <PointSound y={30} x={0} src={{ id: 'a_mu_district_h_01' }} radius={5} volume={1} />
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


const InvisibleCheckpoint: HDKComponent = props => (
  <HNode
    {...props}>
    <HNode

      engineProps={{
        triggerBox: { size: [5, 5, 5], offset: [0, 0, 0] },
        checkpoint: {},
      }}
    >
      <Prefab id='checkpoint_01' scale={1.5} x={0} y={0} z={0} />
    </HNode>
  </HNode>
)



const IndividualLevel: HDKComponent = ({ level, musicId, ...props }) => {

  // Convert the angle to radians
  const angleInRadians = (360 * ((level - 1) / 10) + 90) * (Math.PI / 180);

  // Calculate coordinates based on level
  const X = 40 * Math.cos(angleInRadians);
  const Y = 40 * Math.sin(angleInRadians) - 40;

  return (
    <HNode x={X} z={Y} rotY={-36 * (level - 1)} {...props}>
      <Cannon speed="low" level={level}/>
      <BackToCannon x={4} y={0} z={240.2} />
      <TargetGoalCombined x={0} y={65} z={200} level={level} scale={2 - (1.3 * (level / 10))} />
      
      <InvisibleCheckpoint x={-30} y={0} />
      <PointSound y={0} x={0} src={{ id: musicId }} radius={15} volume={1} />
    </HNode>
  );
};









;



const World = () => (
  <HNode>







    <IndividualLevel level='1' musicId='a_m_iconic_bullet_01'/>
    <IndividualLevel level='2' musicId='a_mu_district_h_01'/>
    <IndividualLevel level='3' musicId='a_mu_border_of_neo_tokyo_01'/>
    <IndividualLevel level='4' musicId='a_mu_heroic_journey_01'/>
    <IndividualLevel level='5' musicId='a_mu_gotta_keep_on_movin_01'/>
    <IndividualLevel level='6' musicId='a_mu_take_the_ride_01'/>
    <IndividualLevel level='7' musicId='a_mu_dark_signs_per_01'/>
    <IndividualLevel level='8' musicId='a_mu_bass_meant_jazz_kevin_macleod_01'/>
    <IndividualLevel level='9' musicId='a_mu_purple_days_01'/>
    <IndividualLevel level='10' musicId='a_mu_moments_01'/>
    <GroundArea />
    <Goal x={0} y={2} z={-37.5}/>
    {/* <PortalPlatform x={0} y={0} z={-37.5}/> */}
    <Spawnpoint x={4.1} y={0.0} z={-7.8}/>















  </HNode >
);

render(<World />, { environment: 'cloud_pillars_01' }); // cold_mountain_01

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?