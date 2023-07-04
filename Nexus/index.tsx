import { CoreHNode, generateId, MaterialId, PrefabId } from '@hiber3d/hdk-core';
import { AndGate, ButtonSensor, HDKComponent, HNode, InfoPanel, OrGate, Prefab, render, SpawnPrefabOnSignal, useRandom, VisibleOnSignal } from '@hiber3d/hdk-react';
import {
  For,
  Ground,
  Spawnpoint,
} from '@hiber3d/hdk-react-components';


import { WorldFromJson } from './scripts/WorldFromJson';
import diveDataAggregated from './data/dive_data_aggregated.json';
import diveDataRaw from './data/dive_data_raw.json';
import diveDataHeatmap from './data/dive_data_heatmap.json';
import worldData from './data/world_data.json';


diveDataRaw.forEach(raw_data => {
  raw_data.pos_xyz = JSON.parse(raw_data.pos_xyz);
  raw_data.rot_xyz = JSON.parse(raw_data.rot_xyz);
});


diveDataAggregated.forEach(agg_data => {
  agg_data.pos_xyz = JSON.parse(agg_data.pos_xyz);
  agg_data.rot_xyz = JSON.parse(agg_data.rot_xyz);
});





const PlaceRawEvents: HDKComponent<{ name: string; prefab_id: PrefabId; prefab_material: MaterialId; prefab_scale: number; beam_colour: MaterialId, beam_height: number }> = ({ name, prefab_id, prefab_material, prefab_scale, beam_colour, beam_height, ...props }) => {
  // why doesn't id autopopulate from the definition?
  // why can't I send props into it? 
  return (

    <HNode
      {...props}>

      {diveDataRaw
        .filter(raw_data => raw_data.name === name)
        .map((raw_data, index) => (
          <InfoPanel
            isOpenInOverlayEnabled
            header={name}
            body={raw_data.count.toString()}
            maxShowDistance={30}>
            <Prefab
              // The main event icon
              key={index}
              id={prefab_id}
              material={prefab_material}
              x={raw_data.pos_xyz[0]}
              y={raw_data.pos_xyz[1]}
              z={raw_data.pos_xyz[2]}
              rotX={raw_data.rot_xyz[0]}
              rotY={raw_data.rot_xyz[1]}
              rotZ={raw_data.rot_xyz[2]}
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
              x={raw_data.pos_xyz[0]}
              y={raw_data.pos_xyz[1] + 1}
              z={raw_data.pos_xyz[2]}
              rotX={raw_data.rot_xyz[0]}
              rotY={raw_data.rot_xyz[1]}
              rotZ={raw_data.rot_xyz[2]}
            />
          </InfoPanel>
        ))}
    </HNode>
  );
};

const PlaceAggregatedEvents: HDKComponent<{ name: string; prefab_id: PrefabId; beam_colour: MaterialId, beam_height: number, xyz_rounding: number }> = ({ name, prefab_id, beam_colour, beam_height, xyz_rounding, ...props }) => {
  // why doesn't id autopopulate from the definition?
  // why can't I send props into it? 

  // define the colour thresholds

  return (
    <HNode {...props}>
      {diveDataAggregated
        .filter(agg_data => agg_data.name === name)
        .map((agg_data, index) => {
          const prefab_material =
            agg_data.count === 1
              ? 'palette_01_green'
              : agg_data.count === 2
                ? 'palette_01_yellow'
                : 'palette_01_red';

          const bodyText = `Count: ${agg_data.count.toString()}, Pos: ${agg_data.pos_xyz.toString()}`;

          return (
            <InfoPanel key={index} isOpenInOverlayEnabled header={name} body={bodyText} maxShowDistance={30}>
              <Prefab
                id={prefab_id}
                material={prefab_material}
                x={agg_data.pos_xyz[0]}
                y={agg_data.pos_xyz[1]}
                z={agg_data.pos_xyz[2]}
                rotX={agg_data.rot_xyz[0]}
                rotY={agg_data.rot_xyz[1]}
                rotZ={agg_data.rot_xyz[2]}
                scaleX={2.5}
                // scaleX={0.5*{xyz_rounding}}
                scaleY={0.1}
                scaleZ={2.5}
              // scaleZ={0.5*{xyz_rounding}}

              />
            </InfoPanel>
          );
        })}
    </HNode>
  );
};




const EventControlPanel: HDKComponent = props => (
  <HNode x={19.8} y={100} z={22.4}>

    <Prefab id='cube_01' material='palette_01_black' y={0} z={3.5} scaleY={0.1} scaleZ={3} scaleX={4} />

    <VisibleOnSignal input="gameStatsOn">
      <Prefab id='cube_01' material='palette_01_black' y={4} z={3.5} scaleY={1} scaleZ={1} scaleX={1} />
    </VisibleOnSignal>

    <HNode rotX={45}>
      <Prefab id='cube_01' material='palette_01_black' y={0.8} scaleY={0.1} scaleZ={1} scaleX={4} />
      {/* Global button */}
      <InfoPanel body='Global Button' header='This will turn off all the event overlays' >
        <ButtonSensor output="globalButton" x={-3} y={1.5} z={0} scale={2} />
      </InfoPanel>

      {/* gameStats button */}
      <InfoPanel body='gameStats Events' header='This will toggle on/off the gameStats event' >
        <ButtonSensor output="gameStatsButton" x={-2} y={1} z={0} scale={1} materialOn='palette_01_green' materialOff='palette_01_grey' />
        <AndGate inputs={["gameStatsButton", "globalButton"]} output="gameStatsOn" />
      </InfoPanel>

      {/* gameWorldLeft button */}
      <InfoPanel body='gameWorldLeft Events' header='This will toggle on/off the gameWorldLeft event' >
        <ButtonSensor output="gameWorldLeftButton" x={-1} y={1} z={0} scale={1} materialOn='palette_01_red' materialOff='palette_01_grey' />
        <AndGate inputs={["gameWorldLeftButton", "globalButton"]} output="gameWorldLeftOn" />
      </InfoPanel>

      {/* gameInteract button */}
      <InfoPanel body='gameInteract Events' header='This will toggle on/off the gameInteract event' >
        <ButtonSensor output="gameInteractButton" x={0} y={1} z={0} scale={1} materialOn='palette_01_blue' materialOff='palette_01_grey' />
        <AndGate inputs={["gameInteractButton", "globalButton"]} output="gameInteractOn" />
      </InfoPanel>

      {/* gameContentShown button */}
      <InfoPanel body='gameContentShown Events' header='This will toggle on/off the gameContentShown event' >
        <ButtonSensor output="gameContentShownButton" x={1} y={1} z={0} scale={1} materialOn='palette_01_yellow' materialOff='palette_01_grey' />
        <AndGate inputs={["gameContentShownButton", "globalButton"]} output="gameContentShownOn" />
      </InfoPanel>

      {/* gameRestarted button */}
      <InfoPanel body='gameRestarted Events' header='This will toggle on/off the gameRestarted event' >
        <ButtonSensor output="gameRestartedButton" x={1} y={1} z={0} scale={1} materialOn='palette_01_yellow' materialOff='palette_01_grey' />
        <AndGate inputs={["gameRestartedButton", "globalButton"]} output="gameRestartedOn" />
      </InfoPanel>
    </HNode>


  </HNode>

)

const OverlayRawEvents = () => (
  <HNode>

    {/* <VisibleOnSignal input="gameStatsOn">
      <PlaceRawEvents name='gameStats' prefab_id='cube_01' prefab_material='palette_01_green' prefab_scale={1} beam_colour='palette_01_green' beam_height={0} y={0} />
    </VisibleOnSignal>  */}

    <VisibleOnSignal input="gameWorldLeftOn">
      <PlaceRawEvents name='gameWorldLeft' prefab_id='hologram_01_hibert' prefab_material='palette_01_red' prefab_scale={2} beam_colour='palette_01_red' beam_height={1} y={0} />
    </VisibleOnSignal>

    {/* <VisibleOnSignal input="gameInteractOn">
      <PlaceRawEvents name='gameInteract' prefab_id='sign_wooden_01_exclamtion' prefab_material='palette_01_blue' prefab_scale={2} beam_colour='palette_01_blue' beam_height={50} y={0} />
    </VisibleOnSignal> */}

    {/* <VisibleOnSignal input="gameContentShownOn">
      <PlaceRawEvents name='gameContentShown' prefab_id='sign_wooden_01_question' prefab_material='palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' beam_height={50} y={0} />
    </VisibleOnSignal> */}

    <VisibleOnSignal input="gameRestartedOn">
      <PlaceRawEvents name='gameRestarted' prefab_id='sign_wooden_01_question' prefab_material='palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' beam_height={1} y={0} />
    </VisibleOnSignal>



    {/* <PlaceRawEvents name='gameEmote' prefab_id='hologram_01_hibert' prefab_material = 'palette_01_red' prefab_scale={2} beam_colour='palette_01_red' y={0} />
    <PlaceRawEvents name='gameInteract' prefab_id='sign_wooden_01_exclamtion' prefab_material = 'palette_01_blue' prefab_scale={2} beam_colour='palette_01_blue' y={0} />
    <PlaceRawEvents name='gameContentShown' prefab_id='sign_wooden_01_question' prefab_material = 'palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' y={0} />
    <PlaceRawEvents name='gameSignalSent' prefab_id='animated_light_01' prefab_material = 'palette_02_green' prefab_scale={4} beam_colour='palette_02_green' y={0} />
    <PlaceRawEvents name='gameWorldLeft' prefab_id='sign_wooden_01_skull' prefab_material = 'palette_01_black' prefab_scale={2} beam_colour='palette_01_black' y={0} />
    <PlaceRawEvents name='gameRestarted' prefab_id='sign_wooden_01_arrow_left' prefab_material = 'palette_01_pink' prefab_scale={2} beam_colour='palette_01_pink' y={0} />
    <PlaceRawEvents name='gameFinished' prefab_id='sign_wooden_01_goal' prefab_material = 't_rainbow_02' prefab_scale={2} beam_colour='t_rainbow_02' y={0} />
    <PlaceRawEvents name='gameSignalSent' prefab_id='animated_light_01' prefab_material = 'palette_02_green' prefab_scale={4} beam_colour='palette_02_green' y={0} /> */}


  </HNode >
);


const OverlayAggregatedEvents = (xyz_rounding) => {
  return (
    <HNode>

      <VisibleOnSignal input="gameStatsOn">
        <PlaceAggregatedEvents name='gameStats' prefab_id='cube_01' scaleX={1} scaleY={1} scaleZ={1} beam_colour='palette_01_green' beam_height={0} y={0} xyz_rounding={xyz_rounding} />
      </VisibleOnSignal>

      {/* <VisibleOnSignal input="gameEmoteOn">
      <PlaceAggregatedEvents name='gameEmote' prefab_id='hologram_01_hibert' scaleX={1} scaleY={1} scaleZ={1} prefab_scale={2} beam_colour='palette_01_red' beam_height={50} y={0} />
    </VisibleOnSignal>

    <VisibleOnSignal input="gameInteractOn">
      <PlaceAggregatedEvents name='gameInteract' prefab_id='sign_wooden_01_exclamtion' scaleX={1} scaleY={1} scaleZ={1} prefab_scale={2} beam_colour='palette_01_blue' beam_height={50} y={0} />
    </VisibleOnSignal>

    <VisibleOnSignal input="gameContentShownOn">
      <PlaceAggregatedEvents name='gameContentShown' prefab_id='sign_wooden_01_question' scaleX={1} scaleY={1} scaleZ={1} prefab_scale={2} beam_colour='palette_01_yellow' beam_height={50} y={0} />
    </VisibleOnSignal>  */}



      {/* <PlaceAggregatedEvents name='gameEmote' prefab_id='hologram_01_hibert' prefab_material = 'palette_01_red' prefab_scale={2} beam_colour='palette_01_red' y={0} />
    <PlaceAggregatedEvents name='gameInteract' prefab_id='sign_wooden_01_exclamtion' prefab_material = 'palette_01_blue' prefab_scale={2} beam_colour='palette_01_blue' y={0} />
    <PlaceAggregatedEvents name='gameContentShown' prefab_id='sign_wooden_01_question' prefab_material = 'palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' y={0} />
    <PlaceAggregatedEvents name='gameSignalSent' prefab_id='animated_light_01' prefab_material = 'palette_02_green' prefab_scale={4} beam_colour='palette_02_green' y={0} />
    <PlaceAggregatedEvents name='gameWorldLeft' prefab_id='sign_wooden_01_skull' prefab_material = 'palette_01_black' prefab_scale={2} beam_colour='palette_01_black' y={0} />
    <PlaceAggregatedEvents name='gameRestarted' prefab_id='sign_wooden_01_arrow_left' prefab_material = 'palette_01_pink' prefab_scale={2} beam_colour='palette_01_pink' y={0} />
    <PlaceAggregatedEvents name='gameFinished' prefab_id='sign_wooden_01_goal' prefab_material = 't_rainbow_02' prefab_scale={2} beam_colour='t_rainbow_02' y={0} />
    <PlaceAggregatedEvents name='gameSignalSent' prefab_id='animated_light_01' prefab_material = 'palette_02_green' prefab_scale={4} beam_colour='palette_02_green' y={0} /> */}


    </HNode>
  );
};



const World = () => (
  <HNode>
    <WorldFromJson worldJson={worldData} />

    <Spawnpoint x={19.5} y={100} z={25.3} />

    <EventControlPanel />

    {/* <OverlayAggregatedEvents xyz_rounding={1} /> */}
    <OverlayRawEvents />


  </HNode >
);

render(<World />, {
  environment: 'sunrise_01',
  saveToFile: false,
});

// questions
// Hot reload doesn't work