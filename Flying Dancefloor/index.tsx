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







const Tube: HDKComponent = ({ ...props }) => {
  const random = useRandom();


  return (
    <HNode>
    <PointSound y={30} x={0} src = {{ id: "a_mu_district_h_01" }} radius={110} volume={1}/>
    <InCircle
      items={20}
      faceCenter={true}
      radius={20}


      renderItem={step => {

        // if (step.index % 4 === 0) {
        //   return null
        //  }

        return (


          <HNode >

     
                <Floor id="cube_01" material='t_sci_fi_tile_07' x={5} rotX={0} rotY={90} rotZ={0} scaleX={3.3} scaleY={100} scaleZ={11.5} />
                
          

          </HNode>
        )
      }}></InCircle>
        </HNode>
  )

}



const DanceFloor: HDKComponent = props => (
  <HNode x={0} y={0} z={0.0}>
   
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

  
  


const World = () => (
  <HNode>


<Animation animation={{
      x: [0, 0],
      y: [-50, 50],
      rotY: [0, 180],
      scaleX: [1, 1],
      scaleY: [1, 1],
      scaleZ: [1, 1],
      steps: [1,10],
      // duration: 3,
      loop: 'REVERSE',
      easing: 'LINEAR',
    }}>
    <Tube />
    </Animation>
    <DanceFloor />


    <Spawnpoint rotY={90} x={0.4} y={0} z={0}/>








    {/* <OmnipresentSound id="a_mu_border_of_neo_tokyo_01" volume={1} /> */}
    {/* <OmnipresentSound id="a_mu_ancient_rite_01" volume={0.5} /> */}



  </HNode >
);
 
render(<World />, { environment: 'midday_clear_01' }); // cold_mountain_01

// Questions
// Should the levels above/below be blocked off? Or is it cool to see down?
// What gameplay can we add to each level?