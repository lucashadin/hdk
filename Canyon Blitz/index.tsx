import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Distribute, Ground, Hovering, InCircle, Path, RandomPosition,RandomTilt, Spawnpoint } from '@hiber3d/hdk-react-components';



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
    <Prefab id="cliff_02_02" />
  </Animation>
);

const GroundGroup = () => (
  <HNode>
    {/* <Ground hilly={0.5} y=s{-0.5} material="t_sand_01" water="True" repeatX={1} repeatZ={1} /> */}
    <Ground hilly={0} material="t_sand_01" scaleX={0.2} scaleZ={0.075} repeatX={1} repeatZ={1} />
    <Ground hilly={10} y={40} rotZ={180} scaleX={5} scaleZ={5} material="t_bark_02" repeatX={1} repeatZ={1} />
  </HNode>
)

const ValleyWalls = () => {
  const random = useRandom();
  return (
  <Path
    showPoints={false}
    numberOfItems={50}
    tension={0.8}
    points={[
      [10, 0, 10],
      [90, 0, 40],
      [40, 0, 130],
      [180, 0, 180],
      [290, 0, 130]


      // [400, 0, 300],
    ]}
    // close={true}

    // x={35.9} y={12.1} z={110.6}

    renderItem={step => {
      // console.log(step.rotation[1])
      // if(step.position[0] >33 && step.position[0] < 38){
      //   return null
      // }
      return (
        <HNode >

          <Prefab
            id="cliff_01_wall"
            material="t_rock_02"
            scaleY={3}
            rotY={90}
            x={-15}
          // scale={0.5 + Math.sin(step.progress * Math.PI) * 1}
          // rotY={step.rotation[1]}
          />
          <Prefab
            id="cliff_01_wall"
            material="t_rock_02"
            scaleY={3}
            rotY={90}
            x={15}
          // scale={0.5 + Math.sin(step.progress * Math.PI) * 1}
          // rotY={step.rotation[1]}
          />

          <GroundGroup />
          <PlantsDecoration />
          <RocksDecoration />



          {step.index % 3 === 0 && (
            <>
              <Prefab
                id="gpl_booster_plate_02"
                // material="palette_01_green"
                x={random.range(-5, 5)}
                y={0.2}
                rotY={-180}
                rotX={20}
                scale={1.5}
              />
            </>

          )}

          {step.index % 3 === 1 && (
            <>
              <Prefab
                id="h_rolling_candy_ball_01"
                material="t_bark_01"
                x={-10}
                y={0}
                rotY={0}
                scale={1}
              />
            </>



          )}
          {/* {step.index % 5 === 1 && (
            <>
              <Prefab
                id="checkpoint_01"
                // material="t_lava_01"
                x={random.range(-5, 5)}
                y={0.0}
                rotY={0}
                rotZ={0}
                scale={1.5}
              />
            </>


          )} */}

          {step.index % 10 === 1 && (

            <TippingRocks x={-10} rotY={90} scaleY={1} />

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
    material="t_planks_02"
    scaleY={3}
    x={286.6} y={0.0} z={128.4}
  />
  <Prefab
    id="rock_cube_01_t2"
    material="t_planks_02"
    scaleY={1}
    x={291.4} y={-2.0} z={125.8}
    scaleX={5}
    scaleZ={5}
  />
  </>
)

const Treehouse = () => (
  <Prefab
    id="tree_house_03"
    material="t_wood_tile_02"
    scaleY={1}
    x={5}
    y={0}
    z={8}
    scale={4}
    rotY={-90}
  />
)

const MossyMound = () => (
  <Path
    showPoints={false}
    numberOfItems={20}
    points={[
      [297, 0, 135],
      [297, 0, 119],
      [287, 0, 119]
      // [400, 0, 300],
    ]}
    // close={true}
    renderItem={step => {
      // console.log(step.rotation[1])
      return (
        <HNode rotY={step.rotation[1]}>


          {step.index % 2 === 0 && (
            <Prefab
              id="cliff_01_wall"
              // material="t_rock_02"
              scaleY={1}
            // z={-10}
            // scale={0.5 + Math.sin(step.progress * Math.PI) * 1}
            // rotY={step.rotation[1]}
            />
          )}

          <Prefab
            id="h_vines_01"
            // material="t_rock_02"
            scaleY={2}
            y={5}
          // z={1}

          // scale={0.5 + Math.sin(step.progress * Math.PI) * 1}
          // rotY={step.rotation[1]}
          />


        </HNode>
      )
    }}></Path>
)


const WelcomeSign: HDKComponent = props => (
  <InfoPanel

    header="Welcome to The Canyon!"
    body="Jump or slide to keep your speed. Watch out for falling rocks!"
    // url="https://developer.hiber3d.com/docs"
    openUrlInNewTab={true}>
    <Prefab
      {...props}
      id="sign_wooden_01_skull" />
  </InfoPanel>
)

const World = () => (
  <HNode>
    <Spawnpoint y={0} x={-5} z={8.7} rotY={-90} />
    <ValleyWalls/>
    <Goal />
    <Treehouse />
    <MossyMound />
    <WelcomeSign x={-0.5} y={0.4} z={6} rotY={-90} />


  </HNode >
);

render(<World />, { environment: 'hiberpunk_smog_01' });

// questions
// two prefabs in one step
// where is my info panel?