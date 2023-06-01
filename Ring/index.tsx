import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound, Orbiting, Spinning, Portal } from '@hiber3d/hdk-react-components';









const GroundGroup = () => (
  <HNode>
    {/* <Ground hilly={0.5} y=s{-0.5} material="t_sand_01" water="True" repeatX={1} repeatZ={1} /> */}
    <Ground hilly={0.0} material="t_sci_fi_tile_01" scaleY={3} scaleX={0.2} scaleZ={0.07} repeatX={1} repeatZ={1} />
    {/* <Ground hilly={10} y={40} rotZ={180} scaleX={5} scaleZ={5} material="t_bark_02" repeatX={1} repeatZ={1} /> */}
  </HNode>
)

const InvisibleCollectible: HDKComponent = props => {


  return (
    <HNode
      {...props}
      engineProps={{
        rendering: {
          materialID: "rock_cube_01_t2",
          meshID: "en_p_trampled_path_01",
        },
        collectible: {
          type: "MANDATORY",
          grabbingRadius: 40,
        }
      }}
    />

  )
}



const Sides: HDKComponent = props => {
  const random = useRandom()
  return (
    <Prefab
      {...props}
    // id="en_m_hiberpunk_building_01_top"
    // material="t_rock_02"

    />


  )
}



const ValleyWalls = () => {
  const random = useRandom();
  return (
    <Path
      showPoints={false}
      numberOfItems={50}
      tension={0.8}
      points={[
        [84, 0, 36], [54, 0, 48], [45, 0, 84], [45, 0, 114], [75, 0, 138], [111, 0, 150], [147, 0, 150], [171, 0, 132], [174, 0, 99], [168, 0, 54], [147, 0, 33], [123, 0, 33], [84, 0, 36]








        // [400, 0, 300],
      ]}
      // close={true}

      // x={35.9} y={12.1} z={110.6}

      renderItem={step => {
        // console.log(step.rotation[1])
        // if ((step.index % 10 == 0) && step.index > 10) {

        //   return <Prefab
        //     id="campfire_01"
        //     // material="t_grid_01"
        //     x={0}
        //     y={-5}
        //     rotY={-180}
        //     // rotX={20}
        //     scaleX={20}
        //     scaleZ={20}
        //     scaleY={1}
        //   />
        // }




        // if (step.position[0] > 375 && step.position[0] < 385) {
        //   return null
        // }
        return (
          <HNode >


            <Sides id="en_m_hiberpunk_building_01_top" rotY={90} x={-15} scaleX={0.3} scaleY={0.5} scaleZ={0.3} />



            <Sides id="en_m_hiberpunk_building_02_middle" y={-150} rotY={90} x={15} scaleX={0.15} scaleY={3} scaleZ={0.3} />





            <GroundGroup />




            {step.index % 3 === 0 && (
              <>
                <Prefab
                  id="gpl_booster_plate_02"
                  // material="t_grid_01"
                  x={random.range(-5, 5)}
                  y={0.2}
                  rotY={-180}
                  rotX={20}
                  scale={2}
                />
              </>

            )}




            {step.index % 1 === 0 && (
              <>
                <BoopingWalls />
                <GetToTheGoal />
              </>
            )}

            {/* {step.index % 10 === 1 && step.index > 20 && (

              <Prefab
                id="flag_01"
                material='t_dirt_01'
                y={0}
                // rotY={90}
                scale={5}
              />

            )} */}

            {step.index % 15 == 0 && step.index > 10 && (
              <>
                <Animation animation={{ y: [0, 10], x: [0, 0], rotY: [0, 0], duration: 2 }}>
                  <Prefab
                    id="h_sawblade_01"
                    // material='t_rainbow_02'
                    y={0}
                    // rotY={90} 
                    x={-8}
                    scale={5}
                    rotX={90}

                  />
                </Animation>

                <Animation animation={{ y: [10, 0], x: [0, 0], rotY: [0, 0], duration: 2 }}>
                  <Prefab
                    id="h_sawblade_01"
                    // material='t_rainbow_02'
                    y={0}
                    rotX={90}
                    x={8}
                    scale={5}
                  />
                </Animation>
              </>

            )}



            {step.index % 50 === 1 && step.index > 20 && (

              <InvisibleCollectible />

            )}

            {/* {step.index % 15 === 1 && (
              <Prefab
                    id="collectible_heart_01"
                    // material='t_rainbow_02'
                    y={0}
                    rotX={90}
                    x={8}
                    scale={5}
                  />
              

            )} */}

          </HNode>
        )
      }}></Path>
  )
}

const BoopingWalls: HDKComponent = props => {
  const random = useRandom();
  var addToSteps = random.range(1, 20);
  var stepsInput = [0, 2, 8, 11, 12];


  return (
    <Animation animation={{
      x: [0, 2, 0, 30, 35],
      y: [0, 0, 0, 0, 0],
      rotY: [0, 0, 0, 0, 0],
      // scale: [1, 1, 1, 1, 0],
      scaleX: [1, 1, 1, 1, 0.05],
      scaleY: [1, 1, 1, 1, 0.05],
      scaleZ: [1, 1, 1, 1, 0.05],
      steps: stepsInput.map(num => num + addToSteps),
      // duration: 3,
      loop: 'RESTART',
      easing: 'EASE_IN_CUBIC',
    }}>
      <Prefab
        id="plastic_wall_01"
        material='t_neon_red_01'
        y={-1}
        // rotY={90} 
        x={-10}
        scaleX={2}
        scaleZ={3}
        scaleY={3}
        rotY={90}

      />
    </Animation>

  )
}


const GetToTheGoal: HDKComponent = props => {
  return (
    <Animation animation={{
      x: [0, 5, 5, 0, 0],
      y: [0, 0, 0, 0, 0],
      rotY: [0, 0, 0, 0, 0],
      // scale: [1, 1, 1, 1, 0],
      scaleX: [1, 1, 1, 1, 1],
      scaleY: [1, 1, 1, 1, 1],
      scaleZ: [1, 1, 1, 1, 1],
      steps: [0, 12, 14, 16, 60],
      // duration: 3,
      loop: 'RESTART',
      easing: 'EASE_IN_CUBIC',
    }}>
      <Prefab
        id="hovering_sign_02"
        // material='t_neon_red_01'
        y={14}
        // rotY={90} 
        x={-10}
        scaleX={2}
        scaleZ={2}
        scaleY={2}
        rotY={90}

      />
    </Animation>

  )
}




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
        <HNode x={114.2} y={40} z={91.3}>
          <Prefab
            id="goal_01"
            material="t_neon_red_01"
            scale={1}
            x={0} y={0} z={0}
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

        </HNode>
      </Animation>
    </>
  )
}

const PortalPlatform: HDKComponent = props => (
  <HNode x={105} y={49.7} z={92.0}>
  
  <Portal worldId="4x4LudA2J"  z={-1.5} x={-1} y={1} rotY={90} scale={0.75}/>
  <Portal worldId="4wQdjSa21" z={1.5} x={-1} y={1} rotY={90} scale={0.75}/>
  <Prefab
            id="cube_01"
            material="t_neon_red_01"            
            x={0} y={0} z={0}
            scaleX={2}
            scaleZ={4}
            scaleY={0.2}
          />  
  </HNode>
)


const WelcomeSign: HDKComponent = props => (
  <InfoPanel

    header="Welcome Cyber Battle Royale!"
    body="Survive for 50 seconds and the platform in the middle will take you to the goal!"
    // url="https://developer.hiber3d.com/docs"
    openUrlInNewTab={true}>
    <Prefab
      {...props}
      id="sign_wooden_01_wait"
      rotY={180}
      x={0}
      z={5} />
  </InfoPanel>
)

const FirePit: HDKComponent = props => (
  <Prefab
    id="campfire_01"
    // material="t_wood_tile_02"
    scaleY={1}
    x={115.7} y={-151.7} z={84.2}
    scale={200}
    rotY={120}
  />
)




const FlyingDeath: HDKComponent = ({
  ...props
}) => {
  const random = useRandom();
  const duration = random.range(13, 20);
  const direction = random.fromArray([-1, -1]);
  const startAt = random.range(0, 20);
  var zRange = random.range(50, 70);

  return (
    <HNode {...props}>
      <Spinning
        axis="y"
        duration={duration}
        direction={direction}
        startAt={startAt}
      >

        <Prefab y={0} z={zRange} id="h_blade_01" material='t_neon_grid_01' scale={3} rotY={90} />

      </Spinning>
    </HNode>
  );
};



const SpectatorPlatform: HDKComponent = props => {

  return (
    <>
      <Animation animation={{
        x: [0, 0, 0, 0, 0],
        y: [0, 0, 0, 0, 0],
        rotY: [0, 0, 0, 0, 0],
        scale: [1, 1, 1, 1, 1],
        steps: [0, 10, 28, 33, 60],
        // duration: 3,
        loop: 'RESTART',
        easing: 'EASE_IN_OUT_CUBIC',
      }}>

        <HNode x={114.2} y={29.5} z={91.3}>
          <WelcomeSign />
          <Spawnpoint rotY={90} y={0} x={3} />
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
          <HNode>

            <Prefab
              id="cube_01"
              material="glass"
              x={5} y={0} z={0}
              rotZ={90}
              // rotX={20}
              scaleX={7}
              scaleZ={5}
              scaleY={0.2}
            />
            <Animation animation={{
              x: [0, 0, 0, 0, 0],
              y: [0, 0, -10, 0, 0],
              scale: [1, 1, 1, 1, 1],
              steps: [0, 20, 25, 27, 60],
              // duration: 3,
              loop: 'RESTART',
              easing: 'EASE_IN_OUT_CUBIC',
            }}>
              <Prefab
                id="cube_01"
                material="glass"
                x={-5} y={0} z={0}
                rotZ={90}
                // rotX={20}
                scaleX={7}
                scaleZ={5}
                scaleY={0.2}
              />
            </Animation>
            <Animation animation={{
              x: [0, 0, 0, 0, 0],
              y: [0, 0, 1.5, 0, 0],
              scale: [1, 1, 1, 1, 1],
              steps: [0, 22, 25, 30, 60],
              // duration: 3,
              loop: 'RESTART',
              easing: 'EASE_IN_OUT_CUBIC',
            }}>
              <Prefab
                id="gpl_booster_plate_02"
                // material="glass"
                x={0} y={-1} z={0}
                rotZ={0}
                rotX={5}
                rotY={90}
                scaleX={4}
                scaleZ={4}
                scaleY={1}
              />
            </Animation>
            <Prefab
              id="cube_01"
              material="glass"
              x={0} y={0} z={5}
              rotZ={90}
              rotX={90}
              scaleX={7}
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
              scaleX={6.3}
              scaleZ={5}
              scaleY={0.2}
            />

          </HNode>
        </HNode>
      </Animation>

    </>
  )

}

const WinnersRing: HDKComponent = props => {

  return (
    <>


      <HNode x={114.2} y={0} z={91.3}>
        <Animation animation={{
          x: [0, 0, 0, 30, 10, 10, 0],
          y: [0, 0, 0, 20, 40, 40, 0],
          rotY: [0, 0, 0, 0, 0, 0, 0],
          scaleX: [0, 45, 10, 5, 3, 0, 0],
          scaleZ: [0, 45, 10, 5, 3, 0, 0],
          scaleY: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
          steps: [0, 15, 20, 22, 30, 35, 60],
          // duration: 3,
          loop: 'RESTART',
          easing: 'EASE_IN_OUT_CUBIC',
        }}>
          <Prefab
            id="sphere_01"
            material="t_hex_disco_01"
            x={0} y={-2.5} z={0}

          />
        </Animation>
      </HNode>


    </>
  )

}

const World = () => (
  <HNode>

    <ValleyWalls />
    <Goal />
    <WinnersRing />
    <PortalPlatform />
    <FirePit />

    <SpectatorPlatform />
    <FlyingDeath x={99.8} y={0} z={90.7} />
    <FlyingDeath x={99.8} y={0} z={90.7} />
    <FlyingDeath x={99.8} y={0} z={90.7} />
    <FlyingDeath x={99.8} y={0} z={90.7} />
    <FlyingDeath x={99.8} y={0} z={90.7} />
    <FlyingDeath x={99.8} y={0} z={90.7} />
    <FlyingDeath x={99.8} y={0} z={90.7} />



    <OmnipresentSound id="a_mu_border_of_neo_tokyo_01" volume={1} />
    {/* <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5} /> */}



  </HNode >
);

render(<World />, { environment: 'above_clouds_01' });

// questions
// two prefabs in one step
// where is my info panel?