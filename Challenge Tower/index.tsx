import { MaterialId } from '@hiber3d/hdk-core';
import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound, Orbiting, Spinning, Portal, Checkpoint, PointSound } from '@hiber3d/hdk-react-components';
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


const Sides: HDKComponent = props => {

  return (
    <Prefab
      {...props}
    // id="en_m_hiberpunk_building_01_top"
    // material="green"

    />


  )
}

const TransportRing: HDKComponent<LevelProps> = ({ colourLight, colourDark, ...props }) => {

  return (
    <Animation animation={{
      x: [0, 0, 0, 0, 0, 0, 0, 0],
      y: [-5, -5, -5, 30, 160, 160, -5, -5],
      rotY: [0, 0, 0, 0, 0, 0, 0, 0],
      scaleX: [100, 100, 75, 35, 15, 0, 0, 0],
      scaleY: [0, 0, 3, 3, 1, 0, 0, 0],
      scaleZ: [100, 100, 75, 35, 15, 0, 0, 0],
      steps: [1, 5, 6, 12, 26, 28, 30, 60],
      // duration: 3,
      loop: 'RESTART',
      easing: 'EASE_IN_QUAD',
    }}>
      <Prefab
        id="torus_thick_01"
        material={colourDark}
        y={2}
        // rotY={90} 
        x={0}
        scaleX={1}
        scaleZ={1}
        scaleY={1}
        rotY={15}

      />
    </Animation>

  )
}



const RingArena: HDKComponent = ({ ...props }) => {
  const random = useRandom();
  const { boopMultiplier, colourLight, colourDark } = useLevelConfig();


  return (
    <InCircle
      items={40}
      faceCenter={true}
      radius={50}


      renderItem={step => {

        return (
          <HNode >


            <Floor id="cube_01" material={colourDark} x={5} rotX={0} rotY={90} rotZ={0} scaleX={3.3} scaleY={1} scaleZ={11.5} />
            <Floor id="pyramid" material={colourLight} x={16} z={5} y={1} rotX={-4} rotY={0} rotZ={87.7} scaleX={1} scaleY={12} scaleZ={2} />
            <Floor id="cube_01" material={colourDark} x={5} y={-80} rotX={180} rotY={90} rotZ={0} scaleX={3.3} scaleY={1} scaleZ={11.5} />
            <Floor id="pyramid" material={colourLight} x={16} y={-80} z={5} rotX={-4} rotY={0} rotZ={95} scaleX={1} scaleY={12} scaleZ={2} />



            {/* Outer Side */}
            <Sides id="cliff_01_pillar" material={colourDark} rotY={90} x={18} scaleX={3} scaleY={10} scaleZ={1} />

            {/* Inner Side */}
            <Sides id="cliff_01_pillar" material={colourDark} y={-50} rotY={90} x={0} scaleX={3} scaleY={10} scaleZ={1} />


            {/* Random elements */}
            {step.index % 1 === 0 && (
              <>
                <BoopingWalls boopMultiplier={boopMultiplier} />

              </>
            )}

            {step.index % 4 === 0 && (
              <>
                <Prefab
                  id="gpl_booster_plate_02"
                  material={colourDark}
                  x={random.range(-5, 5)}
                  y={2.5}
                  rotY={-180}
                  rotX={20}
                  scale={2}
                />
              </>

            )}




            {/* {step.index % 1 === 0 && (
              <>
                <BoopingWalls />
       
              </>
            )} */}

            {/* {step.index % 10 === 1 && step.index > 20 && (

              <Prefab
                id="flag_01"
                material='t_dirt_01'
                y={0}
                // rotY={90}
                scale={5}
              />

            )} */}

            {/* {step.index % 15 == 0 && step.index > 10 && (
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

            )} */}



            {/* {step.index % 50 === 1 && step.index > 20 && (

              <InvisibleCollectible />

            )} */}

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
      }}></InCircle>
  )
}



type LevelProps = {
  colourLight: MaterialId;
  colourDark: MaterialId;
  boopMultiplier: number;
};

const LevelConfigContext = React.createContext<LevelProps>({
  colourLight: 'palette_01_green',
  colourDark: 'palette_02_green',
  boopMultiplier: 1,
});

const Level: HDKComponent<LevelProps> = ({ colourLight, colourDark, boopMultiplier, ...props }) => {

  return (

    <LevelConfigContext.Provider value={{ colourLight, colourDark, boopMultiplier }}>

      <HNode
        {...props}>
        <RingArena colourLight={colourLight} colourDark={colourDark} />
        <SpectatorPlatform colourLight={colourLight} colourDark={colourDark} />
        <TransportRing colourLight={colourLight} colourDark={colourDark} />
      </HNode>
    </LevelConfigContext.Provider>
  )
}




const useLevelConfig = () => React.useContext(LevelConfigContext);


const BoopingWalls: HDKComponent = ({ ...props }) => {
  const random = useRandom();
  var addToSteps = random.range(1, 20);
  var stepsInput = [0, 2, 8, 11, 12];
  const { boopMultiplier, colourLight, colourDark } = useLevelConfig();

  return (
    <Animation animation={{
      x: [4, 8, 0, -18, -22],
      y: [0, 0, 0, 0, 0],
      rotY: [180, 180, 180, 180, 180],
      // scale: [1, 1, 1, 1, 0],
      scaleX: [1, 1, 1, 1, 0.05],
      scaleY: [1, 1, 1, 1, 0.05],
      scaleZ: [1, 1, 1, 1, 0.05],
      steps: stepsInput.map(num => (num + addToSteps) * boopMultiplier),
      // duration: 3,
      loop: 'RESTART',
      easing: 'EASE_IN_CUBIC',
    }}>
      <Prefab
        id="plastic_wall_01"
        material='t_neon_grid_01'
        y={1}
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
        <HNode x={0.0} y={500} z={0.0}>
        <PointSound y={30} x={0} id="a_mu_district_h_01" radius={100} volume={5}/>
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
  <HNode x={-7.9} y={511} z={0.9}>

    <Portal worldId="4x4LudA2J" z={-1.5} x={-1} y={1} rotY={90} scale={0.75} />
    <Portal worldId="4wQdjSa21" z={1.5} x={-1} y={1} rotY={90} scale={0.75} />
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

const Hole: HDKComponent = props => (
  <HNode>
    <Prefab
      id="gpl_portal_01"
      // material="t_wood_tile_02"
      scaleY={1}
      x={0} y={-100} z={0}
      scale={250}
      rotY={120}
    />
    <Prefab
      id="h_drill_01"
      // material="t_wood_tile_02"
      scaleY={1}
      x={0} y={-110} z={0}
      scale={200}
      rotY={120}
    />
  </HNode>
)








const SpectatorPlatform: HDKComponent<LevelProps> = ({ colourLight, colourDark, ...props }) => {

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

        <HNode x={0} y={30} z={0}>

          <WelcomeSign />
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

          <Animation animation={{
            x: [100, 0, 0, 100, 100],
            y: [100, 0, 0, 100, 100],
            scale: [1, 1, 1, 1, 1],
            steps: [0, 28, 29, 30, 60],
            // duration: 3,
            loop: 'RESTART',
            easing: 'EASE_IN_OUT_CUBIC',
          }}>
            <HNode
              y={2}
              engineProps={{
                triggerBox: { size: [20, 1, 20], offset: [0, 0, 0] },
                checkpoint: {},
              }}
            >
              {/* <Prefab  id='cube_01' material='t_neon_red_01' scale={1} x={0} y={0} z={0} /> */}
            </HNode>
          </Animation>


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
              steps: [0, 10, 15, 17, 60],
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
              steps: [0, 12, 15, 20, 60],
              // duration: 3,
              loop: 'RESTART',
              easing: 'EASE_IN_OUT_CUBIC',
            }}>
              <Prefab
                id="gpl_booster_plate_02"
                material={colourDark}
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



const FlyingDeath: HDKComponent = ({ durationMin, durationMax, direction, ...props }) => {

  const random = useRandom();
  const duration = random.range(durationMin, durationMin);
  const startAt = random.range(0, 20);
  var zRange = random.range(50, 70);

  const { boopMultiplier, colourLight, colourDark } = useLevelConfig();

  return (
    <HNode {...props}>
      <Spinning
        axis="y"
        duration={duration}
        direction={direction}
        startAt={startAt}
      >

        <Prefab y={0} z={zRange} id="h_blade_01" material='t_neon_red_01' scale={3} rotY={90} />

      </Spinning>
    </HNode>
  );
};




const LevelOne: HDKComponent = props => {
  var flyingDurationMin = 30
  var flyingDurationMax = 35

  return (
    <HNode y={0}>
      <PointSound y={30} x={0} id="a_mu_breath_of_the_wind_01" radius={90} volume={3}/>
      
      <Level
        colourLight="palette_01_green"
        colourDark="palette_02_green"        
        boopMultiplier={2}
      />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
    
      </HNode>


  )

}

const LevelTwo: HDKComponent = props => {
  var flyingDurationMin = 20
  var flyingDurationMax = 25
  return (
    <HNode y={120}>
       <PointSound y={30} x={0} id="a_mu_ancient_rite_01" radius={90} volume={3}/>
      <Level
        colourLight="palette_01_blue"
        colourDark="palette_02_blue"
        boopMultiplier={1} />

<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />

    </HNode>
  )

}

const LevelThree: HDKComponent = props => {
  var flyingDurationMin = 10
  var flyingDurationMax = 15
  return (

    <HNode y={240}>
       <PointSound y={30} x={0} id="a_mu_adventure_of_flying_jack_01" radius={90} volume={3}/>
      <Level
        colourLight="palette_01_red"
        colourDark="palette_02_red"
        boopMultiplier={0.5} />

<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={-1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={-1} />



    </HNode>

  )

}

const LevelFour: HDKComponent = props => {
  var flyingDurationMin = 2
  var flyingDurationMax = 3
  return (
    <HNode y={360}>
      <PointSound y={30} x={0} id="a_mu_heroic_journey_01" radius={90} volume={3}/>
      <Level
      
        colourLight="palette_01_black"
        colourDark="palette_01_black"
        
        boopMultiplier={0.3} />

<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />
<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={-1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={-1} />
<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={-1} />
      <FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={-1} />

    </HNode>
  )

}


const World = () => (
  <HNode>
    <LevelOne />
    <LevelTwo />
    <LevelThree />
    <LevelFour />


    <Hole />
    <Goal />
    <PortalPlatform />
    <Spawnpoint rotY={90} y={30} x={0} />

    






    {/* <OmnipresentSound id="a_mu_border_of_neo_tokyo_01" volume={1} /> */}
    {/* <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5} /> */}



  </HNode >
);

render(<World />, { environment: 'above_clouds_01' });

