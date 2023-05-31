import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound, Orbiting, Spinning } from '@hiber3d/hdk-react-components';





type TippingRocksProps = {
  rx?: number;
  zc?: number;
};

const TippingRocks: HDKComponent<TippingRocksProps> = ({ rx = 0, ...props }) => (
  <Animation
    {...props}
    animation={{
      x: [0, 0],
      y: [0, 0],
      z: [0, 5],
      rotX: [0, 90],
      duration: 5,
      loop: 'REVERSE',
      easing: 'EASE_IN_CUBIC',
    }}
  >
    <Prefab id="neon_sign_03" />
  </Animation>
);

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
            {/* <PlantsDecoration /> */}
            {/* <RocksDecoration /> */}



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




            {step.index % 10 === 1 && step.index > 20 && (

              <TippingRocks x={-10} y={5} rotY={90} scale={2} />

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

            {step.index % 15 === 1 && (

              <TippingRocks x={10} y={5} rotY={-90} scale={2} />

            )}

          </HNode>
        )
      }}></Path>
  )
}

const Goal: HDKComponent = props => {
  return (
    <>
  <Animation animation={{
    x: [0, 0, 0, 0],
    y: [-30, -30, 0, 0],
    rotY: [0, 0, 0, 0],
    scale: [1, 1, 1, 1],
    steps: [0, 5, 6, 7],
    // duration: 3,
    loop: 'RESTART',
    easing: 'EASE_IN_OUT_CUBIC',
  }}>
  <HNode>
    <Prefab
      id="goal_01"
      material="t_rainbow_02"
      scale={5}
      x={120.5} y={0} z={151.1}
      />
    <Prefab
      id="fx_particlesystem_fireworks_01"
      material="t_rainbow_02"
      scale={1}
      x={120.5} y={0} z={151.1}
/> 

</HNode>
</Animation>
</>
  )
}




const WelcomeSign: HDKComponent = props => (
  <InfoPanel

    header="Welcome Cyber Battle Royale!"
    body="Wait a minute and the game will restart"
    // url="https://developer.hiber3d.com/docs"
    openUrlInNewTab={true}>
    <Prefab
      {...props}
      id="sign_wooden_01_wait" 
      rotY={90}
      x={-5}/>
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



const FlyingTrash: HDKComponent = props => {

  return (
    
    <Orbiting
      
      duration={8}
      radius ={1}>      
      <Prefab
      {...props}
        id="gpl_simple_rotating_cylinder_01"
        material="t_neon_grid_01"
        rotY={0}
        rotX={0}
        scaleX={3}
        scaleZ={3}
        scaleY={3}
      />
    </Orbiting>
    
  )

}

const HotAirBalloon: HDKComponent = ({
  ...props
}) => {
  const random = useRandom();
  const duration = random.range(2, 4);
  const direction = random.fromArray([-1, 1]);
  const startAt = random.range(0, 1);

  return (
    <HNode {...props}>
      <Spinning
        axis="y"
        duration={duration}
        direction={direction}
        startAt={startAt}
      >
        
          <Prefab y={0} z={60} id="h_blade_01" material='t_neon_grid_01' scale={3} rotY={90} />
        
      </Spinning>
    </HNode>
  );
};



const SpectatorPlatform: HDKComponent = props => {

  return (
    <>
    <Animation animation={{
      x: [0, 0, -60, 0],
      y: [0, 0, -25, 0],
      rotY: [0, 0, 0, 0],
      scale: [1, 1, 1, 1],
      steps: [0, 50, 60, 70],
      // duration: 3,
      loop: 'RESTART',
      easing: 'EASE_IN_OUT_CUBIC',
    }}>
    
    <HNode x={114.2} y={26.3} z={91.3}>
    <WelcomeSign/>
    <Spawnpoint rotY={90}/>
    <Prefab
    id="cube_01"
    material="t_sci_fi_tile_03"
    x={0} y={-2.5} z={0}
    rotY={-180}
    // rotX={20}
    scaleX={5}
    scaleZ={5}
    scaleY={1} 
  />
  <HNode>
  <Animation animation={{
      x: [0, 0, 0, 0],
      y: [0, 0, -6, 0],
      scale: [1,  1, 1, 1],
      steps: [0, 50, 60, 70],
      // duration: 3,
      loop: 'RESTART',
      easing: 'EASE_IN_OUT_CUBIC',
    }}>  
  <Prefab
    id="cube_01"
    material="glass"
    x={5} y={0} z={0}
    rotZ={90}
    // rotX={20}
    scaleX={5}
    scaleZ={5}
    scaleY={0.2} 
  />
  <Prefab
    id="cube_01"
    material="glass"
    x={-5} y={0} z={0}
    rotZ={90}
    // rotX={20}
    scaleX={5}
    scaleZ={5}
    scaleY={0.2} 
  />
  <Prefab
    id="cube_01"
    material="glass"
    x={0} y={0} z={5}
    rotZ={90}
    rotX={90}
    scaleX={5}
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
    scaleX={5}
    scaleZ={5}
    scaleY={0.2} 
  />
  </Animation>
  </HNode>
  </HNode>
  </Animation>

</> 
  )

}



const World = () => (
  <HNode>
    
    <ValleyWalls />
    <Goal />

    <FirePit />

    <SpectatorPlatform />
    <HotAirBalloon x={99.8} y={0} z={90.7}/>
    <HotAirBalloon x={99.8} y={0} z={90.7}/>
    <HotAirBalloon x={99.8} y={0} z={90.7}/>
    <HotAirBalloon x={99.8} y={0} z={90.7}/>
    <HotAirBalloon x={99.8} y={0} z={90.7}/>
    <HotAirBalloon x={99.8} y={15} z={90.7}/>
    <HotAirBalloon x={99.8} y={15} z={90.7}/>



    <OmnipresentSound id="a_mu_creepy_hallow_01" volume={1}/>
    <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5}/> *



  </HNode >
);

render(<World />, { environment: 'midday_01' });

// questions
// two prefabs in one step
// where is my info panel?