import { HDKComponent, HNode, Prefab, render, useRandom } from '@hiber3d/hdk-react';
import {
  AsteroidSpinning,
  Avatar,
  Distribute,
  Ground,
  Orbiting,
  Path,
  RandomTilt,
  Room,
  Spawnpoint,
  VideoPanel,
} from '@hiber3d/hdk-react-components';
 
const Foliage: HDKComponent = props => {
  return (
    <Distribute
      {...props}
      gladeRadius={20}
      renderItem={item => {
        const random = useRandom();
 
        return (
          <RandomTilt scale={random.range(1, 2)}>
            <Prefab id={random.fromArray(['tree_02', 'dead_tree_02', 'mushroom_01_t3'])} />
          </RandomTilt>
        );
      }}
    />
  );
};
 
const OrbitingAsteroids: HDKComponent = props => {
  return (
    <HNode {...props}>
      <Orbiting duration={64}>
        <Distribute
          gladeRadius={40}
          outerBoundRadius={100}
          itemAreaSizeMin={15}
          itemAreaSizeMax={25}
          renderItem={item => {
            const random = useRandom();
 
            return (
              <AsteroidSpinning y={random.range(-10, 10)} scale={random.range(1, 5)}>
                <Prefab id={random.fromArray(['house_01'])} />
              </AsteroidSpinning>
            );
          }}
        />
      </Orbiting>
    </HNode>
  );
};
 
const Building: HDKComponent = props => {
  return (
    <Room
      {...props}
      floorThickness={1}
      dim={7}
      roof={false}
      wallThickness={0.5}
      height={10}
      windowWidth={3}
      // wallMaterial={'t_neon_grid_01'}
      wallTypes={['WINDOW', 'WINDOW', 'DOOR', 'WINDOW']}>
      <Prefab id="sofa_01_t2" rotY={180} scale={2}>
        <Avatar animation="an_default_backflip" y={0.16} z={0.12} rotY={20} />
      </Prefab>
      <Prefab id="floor_lamp_01" rotY={210} x={4} y={0.1} scale={2} />
      <VideoPanel src={'https://cdn.hibervr.com/video/Hiber3D.mp4'} y={7} z={-8.5} scale={5} rotY={180}></VideoPanel>
    </Room>
  );
};
 

const PythonPath: HDKComponent = props => (
  <Path
  {...props}
    points={[
      [57, 0, 45], [57, 0, 96], [66, 0, 156], [120, 0, 195], [177, 0, 216], [234, 0, 189], [285, 0, 132], [261, 0, 45], [216, 0, 33], [180, 0, 54], [150, 0, 108], [129, 0, 156], [102, 0, 231], [96, 0, 282], [105, 0, 357], [120, 0, 405], [153, 0, 432], [198, 0, 453], [261, 0, 462], [312, 0, 462], [375, 0, 435], [411, 0, 342], [393, 0, 282], [339, 0, 273], [300, 0, 297], [261, 0, 360], [240, 0, 411], [225, 0, 474], [222, 0, 531], [222, 0, 579], [243, 0, 606], [270, 0, 639], [315, 0, 666], [366, 0, 684], [417, 0, 678], [474, 0, 651], [531, 0, 609], [573, 0, 537]


    ]}
    numberOfItems={100}
    tension={0.8}
    showPoints={true}
    renderItem={() => (
      <>
        <Prefab id="cube_01" scaleZ={10}/>
        {/* <Prefab id="gpl_booster_plate_01" y={3} rotY={-180} /> */}
      </>
    )}
  />
  )
  

const World = () => (
  <HNode>
    <Foliage y={-1.5} />
    <OrbitingAsteroids y={20} />
    <Building y={0} z={20} />
    <Spawnpoint />
    {/* <PythonPath y={1}/> */}
    <Ground hilly={3} material="t_grass_03" />
    <Ground hilly={3} material="t_swamp_ground" water={true} y={-1}/>
    <Ground hilly={20} y={45} rotZ={180} material="t_cobble_stone_01" />
  </HNode>
);
 
render(<World />, { environment: 'midday_clear_01' });