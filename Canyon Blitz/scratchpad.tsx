import { HDKComponent, HNode, Prefab, render, Animation, InfoPanel, useRandom } from '@hiber3d/hdk-react';
import { AsteroidSpinning, Hovering, InCircle, Path } from '@hiber3d/hdk-react-components';

/**
 * Create a ground to stand on
 *
 * 1. Use a prefab which a premade object with specific properties like materials and shape.
 * 2. Scale it up so that the player can stand on it
 * 3. Add some mist to it
 * 4. Add it to the world
 */

const Ground = () => (
    <Prefab id="large_sand_plane_01" material="t_rocky_sand_01" scaleX={3} scaleY={0.88} scaleZ={3}>
        <Prefab id="fx_particlesystem_mist_01" />
    </Prefab>
);

/**
 * Add a spawn point with a custom material
 */
const SpawnPoint: HDKComponent = props => <Prefab id="gpl_spawn_point_01" material="palette_01_black" {...props} />;

const TestingGrounds = () => (
    <Hovering z={1} rotX={45}>
        <Prefab id="cube_01" />
    </Hovering >
)


type ModernArtProps = {
    numberOfSegments?: number;
};

const ModernArt: HDKComponent<ModernArtProps> = ({ numberOfSegments = 4, ...props }) => {
    const pieceOfArt = [];
    const random = useRandom();

    for (let index = 0; index < numberOfSegments; index++) {
        pieceOfArt.push(
            <Prefab
                id="en_p_tumbleweed_01"
                scaleX={random.range(0.5, 2)}
                scaleY={random.range(1, 3)}
                scaleZ={random.range(0.5, 2)}
                x={random.range(-2, 2)}
                y={index * 0.5}
                z={random.range(-2, 2)}
                rotX={random.range(-20, 20)}
                rotY={random.range(0, 360)}
                rotZ={random.range(-20, 20)}
                material={random.fromArray(['t_sci_fi_tile_03', 't_sci_fi_tile_06', 't_metal_02', 't_metal_03'])}>
                {props.children}
            </Prefab>
        );
    }

    return <HNode {...props}>{pieceOfArt}</HNode>;
};


/**
 * Create a world
 */
const World = () => (
    <HNode y={-1}>
        <Ground />
        <ModernArt numberOfSegments={20} />
        <SpawnPoint rotY={-80} y={1} x={-10} z={4} />
        <TestingGrounds />

        {/* <Path
      showPoints={true}
      numberOfItems={30}
      points={[
        [0, 0, 3],
        [10, 5, 10],
        [0, 20, 20],
        [-10, 5, 10],
      ]}
      renderItem={step => (
        <>
          {step.index === 10 && (
            <Prefab id="alien_grass_01" />
          )}
          <Prefab
            id="rounded_cube_02"
            material="palette_02_gold"
            x={-5}
            scale={0.5 + Math.sin(step.progress * Math.PI) * 1}
            rotY={step.rotation[1]}
          />
          <Prefab
            id="rounded_cube_02"
            material="palette_02_gold"
            x={5}
            scale={0.5 + Math.sin(step.progress * Math.PI) * 1}
            rotY={step.rotation[1]}
          />
        </>
      )}></Path> */}

    </HNode>
);



/**
 * Render the scene
 */
render(<World />, { environment: 'cloud_mountains_01' });
