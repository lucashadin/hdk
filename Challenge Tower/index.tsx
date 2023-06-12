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


const Sides: HDKComponent = props => {

  return (
    <Prefab
      {...props}
    // id="en_m_hiberpunk_building_01_top"
    // material="green"

    />


  )
}

const TransportRing: HDKComponent = ({ ...props }) => {

  const { colourDark } = useLevelConfig();

  return (
    <Animation animation={{
      x: [0, 0, 0, 0, 0, 0, 0, 0],
      y: [-5, -5, -5, 30, 200, 200, -5, -5],
      rotY: [0, 0, 0, 0, 0, 0, 0, 0],
      scaleX: [100, 100, 75, 35, 15, 0, 0, 0],
      scaleY: [0, 0, 3, 3, 1, 0, 0, 0],
      scaleZ: [100, 100, 75, 35, 15, 0, 0, 0],
      steps: [1, 5, 6, 8, 10, 13, 15, 60],
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

const Trap: HDKComponent = ({ ...props }) => {
  const random = useRandom();
  var addToSteps = random.range(1, 3);
  var stepsInput = [0, 0.3, 1, 4, 4.1, 8];
  const { colourLight, colourDark, trapScale } = useLevelConfig();

  return (

    <Animation animation={{
      x: [0, 0, 0, -30, 0, 0],
      y: [4, -8, -8, -8, 4, 4],
      rotY: [0, 0, 0, 0, 0, 0],
      // scale: [1, 0, 1, 1, 1, 0],
      scaleX: [1, trapScale, trapScale, 0, 1, 1],
      scaleZ: [1, trapScale, trapScale, 0, 1, 1],
      scaleY: [1, 1, 1, 1, 1, 1],
      steps: stepsInput.map(num => (num + addToSteps)),
      // duration: 3,
      loop: 'RESTART',
      easing: 'EASE_IN_OUT_CUBIC',
    }}>
      <HNode
        {...props}
        z={0}
        x={0}
        rotY={0}
        y={10}
        scaleX={3}
        scaleY={2}
        scaleZ={2}
        engineProps={{
          rendering: {
            castShadow: true,
            materialID: 'palette_01_black',
            meshID: "h_cage_trap_01",
          },
          collider: {
            collider: {
              meshId: "h_cage_trap_01_collision",
              // size: [1, 1, 1],
              offset: [0, 0, 0],
              form: "mesh",

            }
          }
        }}
      />

    </Animation>
  )
}

const RingArena: HDKComponent = ({ ...props }) => {
  const random = useRandom();
  const { levelNumber, boopMultiplier, colourLight, colourDark, lavaDamage } = useLevelConfig();


  return (
    <InCircle
      items={40}
      faceCenter={true}
      radius={50}


      renderItem={step => {

        // if (step.index % 4 === 0) {
        //   return null
        //  }

        return (


          <HNode >

            {step.index % 8 == 1 && levelNumber > 1 ? (
              <>
                {/* lava floor */}
                <Damaging amount={lavaDamage} knockbackStrength={400} >
                  <Floor id="cube_01" material={'t_lava_01'} x={5} rotX={0} rotY={90} rotZ={0} scaleX={3.3} scaleY={1} scaleZ={11.5} />
                  <Floor id="pyramid" material={'t_lava_01'} x={16} z={5} y={1} rotX={-4} rotY={0} rotZ={87.7} scaleX={1} scaleY={12} scaleZ={2} />
                </Damaging>
              </>
            ) : (
              /* else block */
              <>
                <Floor id="cube_01" material={colourDark} x={5} rotX={0} rotY={90} rotZ={0} scaleX={3.3} scaleY={1} scaleZ={11.5} />
                <Floor id="pyramid" material={colourLight} x={16} z={5} y={1} rotX={-4} rotY={0} rotZ={87.7} scaleX={1} scaleY={12} scaleZ={2} />
              </>
            )}

            {step.index % 8 == 7 && levelNumber > 2 ? (
              <>
                {/* lava floor */}
                <Trap />
              </>
            ) : (
              /* else block */
              <>

              </>
            )}

            <Floor id="cube_01" material={colourDark} x={5} y={-80} rotX={180} rotY={90} rotZ={0} scaleX={3.3} scaleY={1} scaleZ={11.5} />
            <Floor id="pyramid" material={colourLight} x={16} y={-80} z={5} rotX={-4} rotY={0} rotZ={95} scaleX={1} scaleY={12} scaleZ={2} />



            {/* Outer Side */}
            <Sides id="cliff_01_pillar" material={colourDark} rotY={90} x={18} scaleX={3} scaleY={16} scaleZ={1} />

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









          </HNode>
        )
      }}></InCircle>
  )
}



type LevelProps = {
  levelNumber: number;
  colourLight: MaterialId;
  colourDark: MaterialId;
  boopMultiplier: number;
  lavaDamage: number;
  flyingDamage: number;
  trapScale: number;
  spectatorImage: string;
};

const LevelConfigContext = React.createContext<LevelProps>({
  levelNumber: 1,
  colourLight: 'palette_01_green',
  colourDark: 'palette_02_green',
  boopMultiplier: 1,
  lavaDamage: 50,
  flyingDamage: 50,
  trapScale: 1,
  spectatorImage: 'None'
});

const LevelProvider: HDKComponent<LevelProps> = ({ colourLight, colourDark, boopMultiplier, levelNumber, lavaDamage, flyingDamage, trapScale, spectatorImage, children, ...props }) => {

  return (

    <LevelConfigContext.Provider value={{ colourLight, colourDark, boopMultiplier, levelNumber, lavaDamage, flyingDamage, trapScale, spectatorImage }}>
      {children}

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
      <HNode>
        <Prefab
          id='plastic_wall_01'
          material='t_neon_red_01'
          y={1}
          // rotY={90} 
          x={-10}
          scaleX={2}
          scaleZ={3}
          scaleY={3}
          rotY={90}

        />

      </HNode>
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
        <HNode x={0.0} y={680} z={0.0}>
          <PointSound y={30} x={0} id="a_mu_district_h_01" radius={100} volume={1} />
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
          <PortalPlatform />
          <ThumbnailAll/>
          
        </HNode>
      </Animation>
    </>
  )
}

const PortalPlatform: HDKComponent = props => (
  <HNode x={-8} y={10} z={0.0}>
    <HNode x={-1} z={-3}>
    <Portal worldId="4x4LudA2J" z={0} x={0} y={1} rotY={90} scale={0.75} />
    <Portal worldId="4wQdjSa21" z={3} x={0} y={1} rotY={90} scale={0.75} />
    <Portal worldId="4xNjH4g28" z={6} x={0} y={1} rotY={90} scale={0.75} />
    </HNode>
    <Prefab
      id="cube_01"
      material="t_neon_red_01"
      x={0} y={0} z={0}
      scaleX={2}
      scaleZ={5}
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





const ThumbnailAll: HDKComponent = props => (
<HNode x={10} z={-6}>
<ImagePanel src="https://images.unsplash.com/photo-1530667912788-f976e8ee0bd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
ratio={1400 / 750} z={0} y={6} x={0} rotY={90} scale={3} />
<ImagePanel src="https://images.unsplash.com/photo-1579202601184-34a979c427bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
ratio={1400 / 750} z={11.2} y={6} x={0} rotY={90} scale={3} />
<ImagePanel src="https://images.unsplash.com/photo-1674718744870-13c46484fc0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
ratio={1400 / 750} z={0} y={0} x={0} rotY={90} scale={3} />
<ImagePanel src="https://images.unsplash.com/photo-1517825738774-7de9363ef735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1410&q=80" 
ratio={1400 / 750} z={11.2} y={0} x={0} rotY={90} scale={3} />

</HNode>

)


const Thumbnail: HDKComponent = props => (

  <ImagePanel src="https://images.unsplash.com/photo-1517825738774-7de9363ef735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1410&q=80" 
  ratio={1400 / 750} x={-20} y={490} z={-0.1} rotY={90} rotX={90} rotZ={20} scale={3} />
  

  
  )


const SpectatorPlatform: HDKComponent = ({ ...props }) => {

  const { spectatorImage } = useLevelConfig();

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
          <ImagePanel src={spectatorImage} ratio={1000 / 750} x={5} rotY={90} scale={3} />
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
            steps: [0, 13, 15, 16, 60],
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
                // material={colourDark}
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



const FlyingDeath: HDKComponent<{ durationMin: number; durationMax: number, direction: 1 | -1 }> = ({ durationMin, durationMax, direction, ...props }) => {

  const random = useRandom();
  const duration = random.range(durationMin, durationMin);
  const startAt = random.range(0, 20);
  var zRange = random.range(60, 70);

  const { boopMultiplier, colourLight, colourDark, flyingDamage } = useLevelConfig();

  return (
    <HNode {...props}>
      <Spinning
        axis="y"
        duration={duration}
        direction={direction}
        startAt={startAt}
      >
        <Animation animation={{
          x: [0, 0, 0],
          y: [0, 5, 0],
          z: [-15, -10, -15],
          scale: [1, 1, 1],
          steps: [0, 4, 8],
          // duration: 3,
          loop: 'REVERSE',
          easing: 'EASE_IN_OUT_CUBIC',
        }}>
          <Damaging amount={flyingDamage} knockbackStrength={400} >
            <Prefab y={3} z={zRange} id="cupola" material='t_neon_red_01' scale={3} rotY={90} rotX={90} />
          </Damaging>
        </Animation>

      </Spinning>
    </HNode>
  );
};




const LevelOne: HDKComponent = props => {
  var levelNumberValue = 1
  var flyingDeathCount = 0
  var flyingDurationMin = 30
  var flyingDurationMax = 35
  var colourLightValue: MaterialId = "palette_01_green"
  var colourDarkValue: MaterialId = "palette_02_green"
  var boopMultiplierValue = 2
  var lavaDamageValue = 0
  var flyingDamageValue = 0
  var trapScaleValue = 0
  var musicId = "a_mu_breath_of_the_wind_01"
  var spectatorImageUrl = "https://images.unsplash.com/photo-1530667912788-f976e8ee0bd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"

  return (

    <HNode y={0}>
      <PointSound y={30} x={0} id={musicId} radius={110} volume={1} />

      <LevelProvider
        levelNumber={levelNumberValue}
        colourLight={colourLightValue}
        colourDark={colourDarkValue}
        boopMultiplier={boopMultiplierValue}
        lavaDamage={lavaDamageValue}
        flyingDamage={flyingDamageValue}
        trapScale={trapScaleValue}
        spectatorImage={spectatorImageUrl}
      >

        <RingArena />
        <SpectatorPlatform />
        <TransportRing />
        <For
          numberOfItems={flyingDeathCount}
          renderItem={<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />}
        />

      </LevelProvider>

    </HNode>


  )

}

const LevelTwo: HDKComponent = props => {
  var levelNumberValue = 2
  var flyingDeathCount = 5
  var flyingDurationMin = 25
  var flyingDurationMax = 30
  var colourLightValue: LevelProps['colourLight'] = "palette_01_blue"
  var colourDarkValue: LevelProps['colourDark'] = "palette_02_blue"
  var boopMultiplierValue = 1.5
  var lavaDamageValue = 100
  var flyingDamageValue = 50
  var trapScaleValue = 0
  var musicId = "a_mu_ancient_rite_01"
  var spectatorImageUrl = "https://images.unsplash.com/photo-1579202601184-34a979c427bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"

  return (

    <HNode y={160}>
      <PointSound y={30} x={0} id={musicId} radius={110} volume={1} />

      <LevelProvider
        levelNumber={levelNumberValue}
        colourLight={colourLightValue}
        colourDark={colourDarkValue}
        boopMultiplier={boopMultiplierValue}
        lavaDamage={lavaDamageValue}
        flyingDamage={flyingDamageValue}
        trapScale={trapScaleValue}
        spectatorImage={spectatorImageUrl}
      >

        <RingArena />
        <SpectatorPlatform />
        <TransportRing />
        <For
          numberOfItems={flyingDeathCount}
          renderItem={<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />}
        />

      </LevelProvider>

    </HNode>


  )

}

const LevelThree: HDKComponent = props => {
  var levelNumberValue = 3
  var flyingDeathCount = 8
  var flyingDurationMin = 15
  var flyingDurationMax = 20
  var colourLightValue: LevelProps['colourLight'] = "palette_01_red"
  var colourDarkValue: LevelProps['colourDark'] = "palette_02_red"
  var boopMultiplierValue = 1
  var lavaDamageValue = 100
  var flyingDamageValue = 50
  var trapScaleValue = 1
  var musicId = "a_mu_heroic_journey_01"
  var spectatorImageUrl = "https://images.unsplash.com/photo-1674718744870-13c46484fc0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"

  return (

    <HNode y={320}>
      <PointSound y={30} x={0} id={musicId} radius={110} volume={1} />

      <LevelProvider
        levelNumber={levelNumberValue}
        colourLight={colourLightValue}
        colourDark={colourDarkValue}
        boopMultiplier={boopMultiplierValue}
        lavaDamage={lavaDamageValue}
        flyingDamage={flyingDamageValue}
        trapScale={trapScaleValue}
        spectatorImage={spectatorImageUrl}
      >

        <RingArena />
        <SpectatorPlatform />
        <TransportRing />
        <For
          numberOfItems={flyingDeathCount}
          renderItem={<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />}
        />

      </LevelProvider>

    </HNode>

  )

}

const LevelFour: HDKComponent = props => {
  var levelNumberValue = 4
  var flyingDeathCount = 10
  var flyingDurationMin = 10
  var flyingDurationMax = 13
  var colourLightValue: LevelProps['colourLight'] = "palette_01_black"
  var colourDarkValue: LevelProps['colourDark'] = "palette_01_black"
  var boopMultiplierValue = 0.5
  var lavaDamageValue = 100
  var flyingDamageValue = 50
  var trapScaleValue = 1.5
  var musicId = "a_mu_adventure_of_flying_jack_01"
  var spectatorImageUrl = "https://images.unsplash.com/photo-1517825738774-7de9363ef735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1410&q=80"

  return (
    <HNode y={480}>
      <PointSound y={30} x={0} id={musicId} radius={110} volume={1} />

      <LevelProvider
        levelNumber={levelNumberValue}
        colourLight={colourLightValue}
        colourDark={colourDarkValue}
        boopMultiplier={boopMultiplierValue}
        lavaDamage={lavaDamageValue}
        flyingDamage={flyingDamageValue}
        trapScale={trapScaleValue}
        spectatorImage={spectatorImageUrl}
      >

        <RingArena />
        <SpectatorPlatform />
        <TransportRing />
        <For
          numberOfItems={flyingDeathCount}
          renderItem={<FlyingDeath durationMin={flyingDurationMin} durationMax={flyingDurationMax} direction={1} />}
        />

      </LevelProvider>

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


    <Spawnpoint rotY={90} y={30} x={0} />








    {/* <OmnipresentSound id="a_mu_border_of_neo_tokyo_01" volume={1} /> */}
    {/* <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5} /> */}



  </HNode >
);

render(<World />, { environment: 'above_clouds_01' });

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?