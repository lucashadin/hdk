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
    <>
      <Prefab id="rock_pile_01_t1" rotY={210} x={4} y={0} scale={1} />
      <Distribute
        {...props}
        gladeRadius={20}

        outerBoundRadius={100}
        renderItem={item => {
          const random = useRandom();

          return (
            <RandomTilt scale={random.range(1, 3)}>
              <Prefab id={random.fromArray(['rock_pile_01_t1', 'bush_01', 'tree_02'])} />
            </RandomTilt>
          );
        }}
      />
    </>
  );
};

const OrbitingAsteroids: HDKComponent = props => {
  return (
    <HNode {...props}>
      <Prefab id="rock_01_t1" rotY={210} x={4} y={0.1} scale={2} />
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
                <Prefab id={random.fromArray(['rock_01_t1'])} />
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
        <Avatar animation="an_default_emote_applaud" scale={0.75} y={0.7} z={0.12} rotY={20}
          src={{
            url: 'https://models.readyplayer.me/631cdcd13a656b9c32f6ef7e.glb',
            skeletonGroupID: 'skg_rpm_male',
          }} />
      </Prefab>
      <Prefab id="floor_lamp_01" rotY={210} x={4} y={0.1} scale={2} />
      <VideoPanel src={'https://cdn.hibervr.com/video/Hiber3D.mp4'} y={7} z={-8.5} scale={5} rotY={180}></VideoPanel>
    </Room>
  );
};




const World = () => (
  <HNode>
    {/* <Foliage y={-1.5} /> */}
    {/* <OrbitingAsteroids y={20} /> */}
    {/* <Building y={2} z={20} /> */}
    <Spawnpoint />
    <Ground hilly={0} material="t_grass_01" />
    {/* <Ground hilly={-1} material="t_swamp_ground" water={true} y={-0.5} /> */}
    {/* <Ground hilly={30} y={45} rotZ={180} material="t_cobble_stone_01" /> */}
  </HNode>
);

render(<World />, { environment: 'midday_clear_01' });