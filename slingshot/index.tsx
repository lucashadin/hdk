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







const Platform: HDKComponent = ({ ...props }) => {
  const random = useRandom();
  var addToSteps = (random.range(1, 10) / 10);
  var stepsInput = [1, 2]


  return (
    <HNode>
      <Checkpoint x={-3} y={2} />
      <Prefab id="cube_01" material='t_hexagon_pattern_01' x={-3} rotX={0} rotY={0} rotZ={0} scaleX={4} scaleY={1} scaleZ={4} />
      <Prefab id="cube_01" material='t_glass_03' x={-3} y={1} z={3} rotX={0} rotY={0} rotZ={0} scaleX={4} scaleY={2} scaleZ={0.1} />
      <Animation animation={{
        x: [0, 0],
        y: [1, 5],
        z: [1, 30],
        rotY: [0, 0],
        rotX: [0, -10],
        scaleX: [1, 1],
        scaleY: [1, 1],
        scaleZ: [1, 1],
        steps: stepsInput.map(num => (num + addToSteps)),
        // duration: 3,
        loop: 'REVERSE',
        easing: 'EASE_IN_CUBIC',
      }}>
        <HNode>
          {/* <PointSound y={30} x={0} src={{ id: "a_mu_district_h_01" }} radius={30} volume={1} /> */}


          <Prefab id="cube_01" material='t_grid_01' x={5} rotX={-20} rotY={random.range(-30, 30)} rotZ={0} scaleX={3} scaleY={1} scaleZ={3}></Prefab>





        </HNode>

      </Animation>
    </HNode>
  )




}

const DistributePlatforms: HDKComponent = props => (
  <Distribute
    gladeRadius={0}
    //  gapSizeMin={10}
    //  gapFrequency={0.9}
    itemAreaSizeMin={50}
    outerBoundRadius={400}
    showGapArea={false}
    renderItem={item => {
      const random = useRandom();

      return (
        <Platform />
      );
    }}
  />
)


const DistributeMusic: HDKComponent = props => {

  // Music ID array
  const musicIds = [
    'a_mu_love_now_01',
    'a_mu_moments_01',
    'a_mu_purple_days_01',
    'a_mu_strange_melody_01',
    'a_mu_silly_boy_01',
    'a_mu_spring_chicken_01',
    'a_mu_bass_meant_jazz_kevin_macleod_01',
    'a_mu_dark_signs_per_01',
    'a_mu_mnk_osmond_benedict_01',
    'a_mu_take_the_ride_01',
    'a_mu_gotta_keep_on_movin_01',
    'a_mu_happy_daisy_01',
    'a_mu_arpent_01',
    'a_mu_digital_gravity_01',
    'a_mu_nesbert_per_01',
    'a_mu_adventure_of_flying_jack_01',
    'a_mu_ancient_rite_01',
    'a_mu_heroic_journey_01',
    'a_mu_inner_peace_01',
    'a_m_iconic_bullet_01',
    'a_mu_asking_questions_01',
    'a_mu_cockroaches_01',
    'a_mu_creepy_hallow_01',
    'a_mu_hidden_truth_01',
    'a_mu_mysterious_lights_01',
    'a_mu_border_of_neo_tokyo_01',
    'a_mu_district_h_01',
    'a_mu_wahlstedt_madness_01'

  ];



  return (
    <HNode y={0}>
      <Distribute
        gladeRadius={0}
        // gapSizeMin={10}
        // gapFrequency={0.9}
        itemAreaSizeMin={200}
        outerBoundRadius={400}
        showGapArea={false}
        renderItem={item => {
          const random = useRandom();

          // Get random music ID from the array
          var randomIndex = Math.floor(Math.random() * musicIds.length);
          var randomMusicId = musicIds[randomIndex];

          // console.log(randomIndex);
          // console.log(randomMusicId);

          return (
            <HNode>
              {/* <Prefab id="balloons_01" x={0} y={0} z={0} rotX={0} rotY={0} rotZ={0} scaleX={3} scaleY={1} scaleZ={3} /> */}
              <PointSound y={30} x={0} src={{ id: randomMusicId }} radius={60} volume={1} />

            </HNode>
          );
        }}
      />
    </HNode>
  )
}


const GroundArea: HDKComponent = props => (
  <HNode x={0} y={-20} z={0.0}>

    <Ground hilly={40} material="chrome" y={-40} repeatX={8} repeatZ={8} rotX={0} />

    <Ground hilly={40} material="chrome" y={80} repeatX={8} repeatZ={8} rotX={-180} />

  </HNode>
)

const WelcomeSign: HDKComponent = props => (
  <InfoPanel
    maxShowDistance={3}
    header="Welcome Chrome Catapult!"
    body="Press jump once the platform is moving to catapult yourself!"
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

const World = () => (
  <HNode>



    <DistributePlatforms />
    <DistributeMusic />

    <Goal x={-180} y={6.5} z={453.6} />
    <Goal x={-69.8} y={6.5} z={453.6} />
    <Goal x={60} y={6.5} z={453.6} />

    <WelcomeSign x={-34} y={2} z={-371} rotY={180} />
    <GroundArea />




    <Spawnpoint x={-31.8} y={2.0} z={-374.4} />






  </HNode >
);

render(<World />, { environment: 'fantasy_land_01' }); // cold_mountain_01

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?