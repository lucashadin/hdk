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


  return (
    <HNode>
      <Checkpoint y={2}/>
    <Prefab id="cube_01" material='t_sci_fi_tile_07' x={0} rotX={0} rotY={0} rotZ={0} scaleX={2} scaleY={1} scaleZ={3} />
    <Animation animation={{
      x: [0, 0],
      y: [1, 1],
      z: [1, 30],
      rotY: [0, 0],
      rotX: [0, 20],
      scaleX: [1, 1],
      scaleY: [1, 1],
      scaleZ: [1, 1],
      steps: [1, 2],
      // duration: 3,
      loop: 'REVERSE',
      easing: 'EASE_IN_CUBIC',
    }}>
    <HNode>
      {/* <PointSound y={30} x={0} src={{ id: "a_mu_district_h_01" }} radius={30} volume={1} /> */}


      <Prefab id="cube_01" material='t_sci_fi_tile_07' x={5} rotX={-20} rotY={random.range(-30, 30)}  rotZ={0} scaleX={2} scaleY={1} scaleZ={3}></Prefab>
         
      



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
 itemAreaSizeMin={30}
 outerBoundRadius = {500}
 showGapArea = {false}
 renderItem={item => {
   const random = useRandom();
 
   return (
    <Platform />    
    );
 }}
/>
)



const GroundArea: HDKComponent = props => (
  <HNode x={0} y={-20} z={0.0}>

<Ground hilly={2} material="t_asphalt_01" />
    
  </HNode>
)


const World = () => (
  <HNode>


    
      <DistributePlatforms />

    {/* <DanceFloor /> */}
    <GroundArea />


    <Spawnpoint x={-7.4} y={2.0} z={10.1}/>








    {/* <OmnipresentSound id="a_mu_border_of_neo_tokyo_01" volume={1} /> */}
    {/* <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5} /> */}



  </HNode >
);

render(<World />, { environment: 'midday_clear_01' }); // cold_mountain_01

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?