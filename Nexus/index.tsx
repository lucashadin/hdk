import { CoreHNode, generateId, MaterialId, PrefabId } from '@hiber3d/hdk-core';
import { AndGate, ButtonSensor, HDKComponent, HNode, InfoPanel, InvisibleOnSignal, OrGate, Prefab, render, SpawnPrefabOnSignal, useRandom, VisibleOnSignal } from '@hiber3d/hdk-react';
import {
    For,
    Ground,
    Spawnpoint,
} from '@hiber3d/hdk-react-components';
import { EngineApi } from '@hiber3d/engine/distribute/hiber.js';



import combinedData from './data/combined.json';





type DiveDataRaw = {
    name: string;
    count: number;
    pos_xyz: number[];
    rot_xyz: number[];
}[];

type PlaceRawEventsProps = {
    diveDataRaw: DiveDataRaw;
    name: string;
    prefab_id: PrefabId;
    prefab_material: MaterialId;
    prefab_scale: number;
    beam_colour: MaterialId;
    beam_height: number;
};

const PlaceRawEvents: HDKComponent<PlaceRawEventsProps> = ({ diveDataRaw, name, prefab_id, prefab_material, prefab_scale, beam_colour, beam_height, ...props }) => {
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

type PlaceAggEventsProps = {
    diveDataAggregated: DiveDataRaw;
    name: string;
    prefab_id: PrefabId;
    beam_colour: MaterialId;
    beam_height: number;
    xyz_rounding: number;
};

const PlaceAggregatedEvents: HDKComponent<PlaceAggEventsProps> = ({ diveDataAggregated, name, prefab_id, beam_colour, beam_height, xyz_rounding, ...props }) => {
    // why doesn't id autopopulate from the definition?
    // why can't I send props into it? 

    // define the colour thresholds

    return (
        <HNode {...props}>
            {diveDataAggregated
                .filter(agg_data => agg_data.name === name)
                .map((agg_data, index) => {
                    const prefab_material =
                        agg_data.count <= 10
                            ? 'palette_01_green'
                            : agg_data.count < 20
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
                                // scaleX={2.5}
                                scaleX={0.5 * xyz_rounding}
                                scaleY={0.1}
                                // scaleZ={2.5}
                                scaleZ={0.5 * xyz_rounding}

                            />
                        </InfoPanel>
                    );
                })}
        </HNode>
    );
};


const EventControlPanel: HDKComponent = (props) => (
    <HNode {...props}>

        <Prefab id='cube_01' material='palette_01_black' y={0} z={3.5} scaleY={0.1} scaleZ={3} scaleX={4} />


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

            {/* gameLifeLost button */}
            <InfoPanel body='gameLifeLost Events' header='This will toggle on/off the gameLifeLost event' >
                <ButtonSensor output="gameLifeLostButton" x={0} y={1} z={0} scale={1} materialOn='palette_01_blue' materialOff='palette_01_grey' />
                <AndGate inputs={["gameLifeLostButton", "globalButton"]} output="gameLifeLostOn" />
            </InfoPanel>


            {/* gameRestarted button */}
            <InfoPanel body='gameRestarted Events' header='This will toggle on/off the gameRestarted event' >
                <ButtonSensor output="gameRestartedButton" x={1} y={1} z={0} scale={1} materialOn='palette_01_yellow' materialOff='palette_01_grey' />
                <AndGate inputs={["gameRestartedButton", "globalButton"]} output="gameRestartedOn" />
            </InfoPanel>

            {/* gameEmote button */}
            <InfoPanel body='gameEmote Events' header='This will toggle on/off the gameEmote event' >
                <ButtonSensor output="gameEmoteButton" x={2} y={1} z={0} scale={1} materialOn='palette_01_purple' materialOff='palette_01_grey' />
                <AndGate inputs={["gameEmoteButton", "globalButton"]} output="gameEmoteOn" />
            </InfoPanel>

            {/* gameContentShown button */}
            {/* <InfoPanel body='gameContentShown Events' header='This will toggle on/off the gameContentShown event' >
                <ButtonSensor output="gameContentShownButton" x={1} y={1} z={0} scale={1} materialOn='palette_01_purple' materialOff='palette_01_grey' />
                <AndGate inputs={["gameContentShownButton", "globalButton"]} output="gameContentShownOn" />
            </InfoPanel> */}
        </HNode>


    </HNode>

)




type OverlayRawEventsProps = {
    diveDataRaw: DiveDataRaw;
}

const OverlayRawEvents: HDKComponent<OverlayRawEventsProps> = ({ diveDataRaw }) => (
    <HNode>

        {/* <InvisibleOnSignal input="gameStatsOn">
      <PlaceRawEvents name='gameStats' prefab_id='cube_01' prefab_material='palette_01_green' prefab_scale={1} beam_colour='palette_01_green' beam_height={0} y={0} />
    </InvisibleOnSignal>  */}

        <InvisibleOnSignal input="gameWorldLeftOn">
            <PlaceRawEvents diveDataRaw={diveDataRaw} name='gameWorldLeft' prefab_id='hologram_01_hibert' prefab_material='palette_01_red' prefab_scale={2} beam_colour='palette_01_red' beam_height={20} y={0} />
        </InvisibleOnSignal>

        <InvisibleOnSignal input="gameEmoteOn">
      <PlaceRawEvents diveDataRaw={diveDataRaw} name='gameEmote' prefab_id='sign_wooden_01_exclamtion' prefab_material='palette_01_blue' prefab_scale={2} beam_colour='palette_01_blue' beam_height={50} y={0} />
    </InvisibleOnSignal>

        {/* <InvisibleOnSignal input="gameContentShownOn">
      <PlaceRawEvents name='gameContentShown' prefab_id='sign_wooden_01_question' prefab_material='palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' beam_height={50} y={0} />
    </InvisibleOnSignal> */}

        <InvisibleOnSignal input="gameRestartedOn">
            <PlaceRawEvents diveDataRaw={diveDataRaw} name='gameRestarted' prefab_id='sign_wooden_01_question' prefab_material='palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' beam_height={1} y={0} />
        </InvisibleOnSignal>

        <InvisibleOnSignal input="gameRestartedOn">
            <PlaceRawEvents diveDataRaw={diveDataRaw} name='gameRestarted' prefab_id='sign_wooden_01_question' prefab_material='palette_01_yellow' prefab_scale={2} beam_colour='palette_01_yellow' beam_height={1} y={0} />
        </InvisibleOnSignal>



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


const OverlayAggregatedEvents: HDKComponent<{ xyz_rounding: number, diveDataAggregated: DiveDataRaw }> = ({ diveDataAggregated, xyz_rounding }) => {
    return (
        <HNode>

            <InvisibleOnSignal input="gameStatsOn">
                <PlaceAggregatedEvents diveDataAggregated={diveDataAggregated} name='gameStats' prefab_id='cube_01' scaleX={1} scaleY={1} scaleZ={1} beam_colour='palette_01_green' beam_height={0} y={0} xyz_rounding={xyz_rounding} />
            </InvisibleOnSignal>

            {/* <InvisibleOnSignal input="gameEmoteOn">
      <PlaceAggregatedEvents name='gameEmote' prefab_id='hologram_01_hibert' scaleX={1} scaleY={1} scaleZ={1} prefab_scale={2} beam_colour='palette_01_red' beam_height={50} y={0} />
    </InvisibleOnSignal> */}

    {/* <InvisibleOnSignal input="gameInteractOn">
      <PlaceAggregatedEvents name='gameInteract' prefab_id='sign_wooden_01_exclamtion' scaleX={1} scaleY={1} scaleZ={1} prefab_scale={2} beam_colour='palette_01_blue' beam_height={50} y={0} />
    </InvisibleOnSignal>

    <InvisibleOnSignal input="gameContentShownOn">
      <PlaceAggregatedEvents name='gameContentShown' prefab_id='sign_wooden_01_question' scaleX={1} scaleY={1} scaleZ={1} prefab_scale={2} beam_colour='palette_01_yellow' beam_height={50} y={0} />
    </InvisibleOnSignal>  */}



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



const World = () => {
    const raw = (combinedData.raw as { pos_xyz: string, rot_xyz: string }[]).map(raw_data => ({
        ...raw_data,
        pos_xyz: JSON.parse(raw_data.pos_xyz),
        rot_xyz: JSON.parse(raw_data.rot_xyz),
    })) as DiveDataRaw;


    const aggregated = (combinedData.aggregated as { pos_xyz: string, rot_xyz: string }[]).map(agg_data => ({
        ...agg_data,
        pos_xyz: JSON.parse(agg_data.pos_xyz),
        rot_xyz: JSON.parse(agg_data.rot_xyz),
    })) as DiveDataRaw;


    return (
        <HNode>

            <Spawnpoint x={20.6} y={87.4} z={11.3} />

            <EventControlPanel x={20.6} y={87.4} z={11.3} />

            <OverlayAggregatedEvents diveDataAggregated={aggregated} xyz_rounding={2} />
            <OverlayRawEvents diveDataRaw={raw} />


        </HNode>
    );
};

const baseUrl =
    "https://dao-pr.dev.hiberdev.net/engine/wilhelm-gameapi-from-iframe/latest/production";

render(<World />, {
    environment: 'sunrise_01',
    prefabId: 'asd',
    engineUrl:
        'https://cdn.hibervr.com/hiber2/web/wilhelm-gameapi-from-iframe/v1.39.0-wilhelm-gameapi-from-iframe.0%2B9689173e2/production/hiber.js',
    wasmUrl:
        'https://cdn.hibervr.com/hiber2/web/wilhelm-gameapi-from-iframe/v1.39.0-wilhelm-gameapi-from-iframe.0%2B9689173e2/production/Hiberworld.wasm.gz',
    extraArgs: {
        'Launch.InitLevelID': '1324822085050602',
    },
});

// questions
// Hot reload doesn't work
// arcadia: 1396328036999394
// lost in the woods: 1402549011448005