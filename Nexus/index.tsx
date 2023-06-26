import { CoreHNode, generateId, MaterialId, PrefabId } from '@hiber3d/hdk-core';
import { AndGate, ButtonSensor, HDKComponent, HNode, InfoPanel, OrGate, Prefab, render, SpawnPrefabOnSignal, useRandom, VisibleOnSignal } from '@hiber3d/hdk-react';
import {
  For,
  Ground,
  Spawnpoint,
} from '@hiber3d/hdk-react-components';


import { WorldFromJson } from './scripts/WorldFromJson';
import diveData from './data/dive_data.json';
import worldData from './data/world_data.json';


// Since pos_xyz and rot_xyz are strings in your JSON, we need to parse them into arrays
// function parseDiveData(diveData: any[], aggregation: boolean) {
//   diveData.forEach(stats => {
//     stats.pos_xyz = JSON.parse(stats.pos_xyz);
//     stats.rot_xyz = JSON.parse(stats.rot_xyz);
    
//     if (aggregation) {
//       stats.pos_xyz = stats.pos_xyz.map((value: number) => Math.round(value));
//     }
//   });
// }

// parseDiveData(diveData, true);

diveData.forEach(stats => {
  stats.pos_xyz = JSON.parse(stats.pos_xyz);
  // stats.rot_xyz = JSON.parse(stats.rot_xyz);
});



const HeatmapColours: DataObject[] = [
  { count: 10, color: '' },
  { count: 25, color: '' },
  { count: 50, color: '' },
  // ... other data objects
];



const PlaceEvents: HDKComponent<{ name: string; prefab_id: PrefabId; prefab_material: MaterialId; prefab_scale: number; beam_colour: MaterialId, beam_height:number }> = ({ name, prefab_id, prefab_material, prefab_scale, beam_colour,beam_height, ...props }) => {
  // why doesn't id autopopulate from the definition?
  // why can't I send props into it? 
  return (

    <HNode
      {...props}>

      {diveData
        .filter(stats => stats.name === name)
        .map((stats, index) => (
          <InfoPanel
            isOpenInOverlayEnabled
            header={name}
            body={stats.count.toString()}
            maxShowDistance={30}>
            <Prefab
              // The main event icon
              key={index}
              id={prefab_id}
              material={prefab_material}
              x={stats.pos_xyz[0]}
              y={stats.pos_xyz[1]}
              z={stats.pos_xyz[2]}
              // rotX={stats.rot_xyz[0]}
              // rotY={stats.rot_xyz[1]}
              // rotZ={stats.rot_xyz[2]}
              scale={prefab_scale}
            />
            <Prefab
              // Beam to easily find the event
              key={index}
              id='rounded_cylinder_01'
              material={beam_colour}
              scaleY={beam_height}
              scaleZ={0.2}
              scaleX={0.2}
              x={stats.pos_xyz[0]}
              y={stats.pos_xyz[1] + 1}
              z={stats.pos_xyz[2]}
              // rotX={stats.rot_xyz[0]}
              // rotY={stats.rot_xyz[1]}
              // rotZ={stats.rot_xyz[2]}
            />
          </InfoPanel>
        ))}
    </HNode>
  );
};

const EventControlPanel: HDKComponent = props => (
  <HNode x={-64} y={-0.5} z={-132} rotX={45} rotY={200} rotZ={0}>
    <Prefab id='cube_01' material='palette_01_black' y={-0.2} scaleY={0.1} scaleZ={1} scaleX={4} />

    {/* Global button */}
    <InfoPanel body='Global Button' header='This will turn off all the event overlays' >
      <ButtonSensor output="globalButton" x={-3} y={0} z={0} scale={2} />
    </InfoPanel>

    {/* gameStats button */}
    <InfoPanel body='gameStats Events' header='This will toggle on/off the gameStats event' >
      <ButtonSensor output="gameStatsButton" x={-2} y={0} z={0} scale={1} materialOn='palette_01_green' materialOff='palette_01_grey' />
      <AndGate inputs={["gameStatsButton", "globalButton"]} output="gameStatsOn" />
    </InfoPanel>

    {/* gameEmote button */}
    <InfoPanel body='gameEmote Events' header='This will toggle on/off the gameEmote event' >
      <ButtonSensor output="gameEmoteButton" x={-1} y={0} z={0} scale={1} materialOn='palette_01_red' materialOff='palette_01_grey' />
      <AndGate inputs={["gameEmoteButton", "globalButton"]} output="gameEmoteOn" />
    </InfoPanel>

    {/* gameInteract button */}
    <InfoPanel body='gameInteract Events' header='This will toggle on/off the gameInteract event' >
      <ButtonSensor output="gameInteractButton" x={0} y={0} z={0} scale={1} materialOn='palette_01_blue' materialOff='palette_01_grey' />
      <AndGate inputs={["gameInteractButton", "globalButton"]} output="gameInteractOn" />
    </InfoPanel>

    {/* gameContentShown button */}
    <InfoPanel body='gameContentShown Events' header='This will toggle on/off the gameContentShown event' >
      <ButtonSensor output="gameContentShownButton" x={1} y={0} z={0} scale={1} materialOn='palette_01_yellow' materialOff='palette_01_grey' />
      <AndGate inputs={["gameContentShownButton", "globalButton"]} output="gameContentShownOn" />
    </InfoPanel>


  </HNode>

)




const World = () => (
  <HNode>
    <WorldFromJson worldJson={worldData} />

    <Spawnpoint x={-72.1} y={5} z={-135.5} />

    <EventControlPanel />

    <VisibleOnSignal input="gameStatsOn">
      <PlaceEvents name='gameStats' prefab_id='cube_01' prefab_material='palette_01_green' prefab_scale={1} beam_colour='palette_01_green' beam_height={0} y={0} />
    </VisibleOnSignal>

    <VisibleOnSignal input="gameEmoteOn">
      <PlaceEvents name='gameEmote' prefab_id='hologram_01_hibert' prefab_material = 'palette_01_red' prefab_scale={2} beam_colour='palette_01_red' beam_height={50} y={0} />
    </VisibleOnSignal>

    <VisibleOnSignal input="gameInteractOn">
      <PlaceEvents name='gameInteract' prefab_id='sign_wooden_01_exclamtion' prefab_material = 'palette_01_blue' prefab_scale={2} beam_colour='palette_01_blue' beam_height={50} y={0} />
    </VisibleOnSignal>

    <VisibleOnSignal input="gameContentShownOn">
      <PlaceEvents name='gameContentShown' prefab_id='sign_wooden_01_question' prefab_material = 'palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' beam_height={50} y={0} />
    </VisibleOnSignal>



    {/* <PlaceEvents name='gameEmote' prefab_id='hologram_01_hibert' prefab_material = 'palette_01_red' prefab_scale={2} beam_colour='palette_01_red' y={0} />
    <PlaceEvents name='gameInteract' prefab_id='sign_wooden_01_exclamtion' prefab_material = 'palette_01_blue' prefab_scale={2} beam_colour='palette_01_blue' y={0} />
    <PlaceEvents name='gameContentShown' prefab_id='sign_wooden_01_question' prefab_material = 'palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' y={0} />
    <PlaceEvents name='gameSignalSent' prefab_id='animated_light_01' prefab_material = 'palette_02_green' prefab_scale={4} beam_colour='palette_02_green' y={0} />
    <PlaceEvents name='gameWorldLeft' prefab_id='sign_wooden_01_skull' prefab_material = 'palette_01_black' prefab_scale={2} beam_colour='palette_01_black' y={0} />
    <PlaceEvents name='gameRestarted' prefab_id='sign_wooden_01_arrow_left' prefab_material = 'palette_01_pink' prefab_scale={2} beam_colour='palette_01_pink' y={0} />
    <PlaceEvents name='gameFinished' prefab_id='sign_wooden_01_goal' prefab_material = 't_rainbow_02' prefab_scale={2} beam_colour='t_rainbow_02' y={0} />
    <PlaceEvents name='gameSignalSent' prefab_id='animated_light_01' prefab_material = 'palette_02_green' prefab_scale={4} beam_colour='palette_02_green' y={0} /> */}


  </HNode >
);

render(<World />, {
  environment: 'sunrise_01',
  saveToFile: false,
});

// questions
// Hot reload doesn't work