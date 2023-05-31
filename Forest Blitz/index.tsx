import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition, RandomTilt, Spawnpoint, Damaging, OmnipresentSound } from '@hiber3d/hdk-react-components';



// type Props = {
//   objectID: number;
//   maxDistance: number;
//   minDistance: number;
//   debug: boolean;
// };
// export const ProximitySensor: HDKComponent<Props> = ({
//   objectID,
//   maxDistance,
//   minDistance,
//   debug,
//   ...props
// }) => {
//   return (
//     <>
//       <HNode
//         {...props}
//         engineId={objectID}
//         engineProps={{
//           signalSource: {},
//           playerProximitySensor: {
//             maxDistance,
//             minDistance,
//           },
//         }}
//       />
//       {debug && (
//         <HNode
//           scale={maxDistance}
//           engineProps={{
//             rendering: debug
//               ? { materialID: "glass" as MaterialId, meshID: "sphere" }
//               : undefined,
//           }}
//         />
//       )}
//     </>
//   );
// };


const RocksDecoration: HDKComponent = props => {
  return (
    <Distribute
      {...props}
      gladeRadius={10}
      outerBoundRadius={30}
      gapSizeMin={0.5}
      itemAreaSizeMin={15}
      itemAreaSizeMax={20}
      gapFrequency={0.5}
      renderItem={() => {
        const random = useRandom();

        return (
          <RandomTilt scale={random.range(1, 2)}>
            <Prefab id={random.fromArray(['rock_01_t2', 'en_p_jungle_root_01', 'rock_pile_01_t2'])} />
          </RandomTilt>
        );
      }}
    />
  );
};


const PlantsDecoration: HDKComponent = props => {
  return (
    <Distribute
      {...props}
      gladeRadius={10}
      outerBoundRadius={20}
      gapSizeMin={1}
      gapFrequency={0.6}
      renderItem={() => {
        const random = useRandom();

        return (
          <RandomTilt scale={random.range(1, 2)}>
            <Prefab id={random.fromArray(['bush_01', 'bush_02', 'en_p_tumbleweed_01', 'en_p_jungle_grass_01'])} />
          </RandomTilt>
        );
      }}
    />
  );
};

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
      z: [0, 0],
      rotX: [0, 90],
      duration: 5,
      loop: 'REVERSE',
      easing: 'EASE_IN_CUBIC',
    }}
  >
    <Prefab id="dead_tree_02" />
    <Prefab id="tree_02" scale={1} />
  </Animation>
);

const GroundGroup = () => (
  <HNode>
    {/* <Ground hilly={0.5} y=s{-0.5} material="t_sand_01" water="True" repeatX={1} repeatZ={1} /> */}
    <Ground hilly={0.0} material="t_bark_01" scaleY = {3} scaleX={0.2} scaleZ={0.1} repeatX={1} repeatZ={1} />
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
      id="tree_02"
    // material="t_rock_02"

    />


  )
}



const ValleyWalls = () => {
  const random = useRandom();
  return (
    <Path
      showPoints={false}
      numberOfItems={250}
      tension={0.8}
      points={[
        [78, 0, 60], [132, 0, 132], [192, 0, 201], [282, 10, 225], [378, 20, 177], [378, 30, 72], [294, 40, 51], [216, 40, 78], [129, 40, 129], [69, 20, 189], [60, 0, 288], [69, 0, 381], [120, -20, 459], [195, -30, 507], [291, -30, 519], [375, -20, 492], [447, -10, 426], [468, 0, 303], [354, 5, 276], [285, 10, 309], [252, 15, 384], [291, 20, 450], [366, 25, 486], [465, 30, 573], [540, 35, 630], [636, 20, 624], [714, 5, 579], [735, 0, 489], [726, 0, 372], [690, 0, 267], [624, 0, 180]






        // [400, 0, 300],
      ]}
      // close={true}

      // x={35.9} y={12.1} z={110.6}

      renderItem={step => {
        // console.log(step.rotation[1])
        if ((step.index % 10 == 0) && step.index > 10) {

          return <Prefab
            id="campfire_01"
            // material="t_grid_01"
            x={0}
            y={-5}
            rotY={-180}
            // rotX={20}
            scaleX={20}
            scaleZ={20}
            scaleY={1}
          />
        }




        // if (step.position[0] > 375 && step.position[0] < 385) {
        //   return null
        // }
        return (
          <HNode >


            <Sides rotY={90} x={-15} scaleX={3} scaleY={random.range(2, 4)} />



            <Sides rotY={90} x={15} scaleX={3} scaleY={random.range(2, 4)} />





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

              <TippingRocks x={-10} rotY={90} scaleY={1} />

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
                    id="rotten_fence_01"
                    // material='t_rainbow_02'
                    y={0}
                    // rotY={90} 
                    x={-8}
                    scale={4}

                  />
                </Animation>

                <Animation animation={{ y: [10, 0], x: [0, 0], rotY: [0, 0], duration: 2 }}>
                  <Prefab
                    id="rotten_fence_01"
                    // material='t_rainbow_02'
                    y={0}
                    // rotY={90} 
                    x={8}
                    scale={4}
                  />
                </Animation>
              </>

            )}



            {step.index % 50 === 1 && step.index > 20 && (

              <InvisibleCollectible />

            )}

            {step.index % 15 === 1 && (

              <TippingRocks x={10} rotY={-90} scaleY={1} />

            )}

          </HNode>
        )
      }}></Path>
  )
}

const Goal = () => (
  <>
    <Prefab
      id="goal_01"
      material="t_rainbow_02"
      scale={3}
      x={632.9} y={0} z={191.4}
    />

  </>
)

const GoalDecoration = () => (
  <Prefab
    id="tree_house_04"
    material="t_wood_tile_02"
    scaleY={1}
    x={611.3} y={0.0} z={174.1}
    scale={1}
    rotY={120}
  />
)



const WelcomeSign: HDKComponent = props => (
  <InfoPanel

    header="Welcome to The Forest!"
    body="Jump or slide to keep your speed. Watch out for falling trees!"
    // url="https://developer.hiber3d.com/docs"
    openUrlInNewTab={true}>
    <Prefab
      {...props}
      id="sign_wooden_01_skull" />
  </InfoPanel>
)



const World = () => (
  <HNode>
    <Spawnpoint x={72.2} y={0.0} z={56.5} rotY={-120} />
    <ValleyWalls />
    <Goal />
    {/* <Treehouse /> */}
    <GoalDecoration />
    <WelcomeSign x={74.4} y={0.0} z={57.5} rotY={-90} />
    <OmnipresentSound id="a_am_raven_forest_01" volume={1}/>
    <OmnipresentSound id="a_mu_creepy_hallow_01" volume={1}/>
    <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5}/>



  </HNode >
);

render(<World />, { environment: 'hiberpunk_smog_01' });

// questions
// two prefabs in one step
// where is my info panel?