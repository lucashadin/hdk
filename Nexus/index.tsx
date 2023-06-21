import { CoreHNode, generateId, MaterialId } from '@hiber3d/hdk-core';
import { ButtonSensor, HDKComponent, HNode, InfoPanel, OrGate, Prefab, render, SpawnPrefabOnSignal, useRandom, VisibleOnSignal } from '@hiber3d/hdk-react';
import {
  For,
  Ground,
  Spawnpoint,
} from '@hiber3d/hdk-react-components';

export const prefabToCoreHNode = (prefabDefinition: CoreHNode) => {
  const prefab = JSON.parse(JSON.stringify(prefabDefinition)) as CoreHNode;

  const hnode: CoreHNode = {
    id: generateId(),
    props: { ...prefab.props },
    children: [],
  };

  if (prefab) {
    for (const child of prefab.children) {
      child.id = generateId();
    }
    for (const child of prefab.children) {
      if (child.props.snapTo) {
        const parent = prefab.children[Number(child.props.snapTo.parentObjectId?.prefabIndex)];
        child.props.snapTo.parentObjectId = {
          type: 'OBJECT_ID',
          objectID: parent.id,
          prefabIndex: -1,
        };
      }

      if (child.props.keyframe) {
        const target = prefab.children[Number(child.props.keyframe.targetObjectId?.prefabIndex)];
        child.props.keyframe.targetObjectId = {
          type: 'OBJECT_ID',
          objectID: target.id,
          prefabIndex: -1,
        };
      }

      if (child.props.signalListener?.triggerObjectReference?.type === 'PREFAB_INDEX') {
        const target = prefab.children[Number(child.props.signalListener.triggerObjectReference.prefabIndex)];
        child.props.signalListener.triggerObjectReference = {
          type: 'OBJECT_ID',
          objectID: target?.id ?? (0 as unknown as number),
          prefabIndex: -1,
        };
      }

      if (child.props.logicGate?.input1?.type == 'PREFAB_INDEX') {
        const target = prefab.children[Number(child.props.logicGate.input1.prefabIndex)];
        child.props.logicGate.input1 = {
          type: 'OBJECT_ID',
          objectID: target?.id ?? (0 as unknown as number),
          prefabIndex: -1,
        };
      }

      if (child.props.logicGate?.input2?.type == 'PREFAB_INDEX') {
        const target = prefab.children[Number(child.props.logicGate.input2.prefabIndex)];
        child.props.logicGate.input2 = {
          type: 'OBJECT_ID',
          objectID: target?.id ?? (0 as unknown as number),
          prefabIndex: -1,
        };
      }

      hnode.children.push(child);
    }
  }

  return hnode;
};

const fromCapitalSnakeCase = (str = ''): string => {
  if (!str) return '';

  if (str === 'KEYFRAME_ANIMATED_SNAP_TO') {
    return 'snapTo';
  } else if (str === 'SIGNAL_TRIGGER') {
    return 'signalSource';
  } else if (str == 'PARTICLESYSTEM_PARTICLE_MATERIAL') {
    return 'particleSystemParticleMaterial';
  } else if (str == 'PARTICLESYSTEM_VELOCITY_MODIFIERS') {
    return 'particleSystemVelocityModifiers';
  } else if (str == 'PARTICLESYSTEM_EMITTER') {
    return 'particleSystemEmitter';
  } else if (str == 'PARTICLESYSTEM_PARTICLE') {
    return 'particleSystemParticle';
  }

  const words = str.split('_');
  const firstWord = words[0].toLowerCase();
  const restWords = words.slice(1).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase());
  return firstWord + restWords.join('');
};

const convertProps = (props: { type: string; data: unknown }[], items) => {
  const niceProps = Object.fromEntries(props.map(({ type, data }) => [fromCapitalSnakeCase(type), data]));

  if (niceProps.keyframe && niceProps.transform) {
    const objectReference = niceProps.keyframe.targetObjectId;

    let prefabIndex = -1;
    if (typeof objectReference === 'object' && objectReference.type === 'PREFAB_INDEX' && objectReference.prefabIndex) {
      prefabIndex = Number(objectReference.prefabIndex);
    } else {
      prefabIndex = Number(objectReference);
    }

    if (prefabIndex >= 0 && prefabIndex < items.length) {
      const targetProps = Object.fromEntries(
        items[prefabIndex].props.map(({ type, data }) => [fromCapitalSnakeCase(type), data])
      );

      if (targetProps.keyframeAnimated && targetProps.snapTo && targetProps.transform) {
        niceProps.noTransformOverride = true;
      }
    }
  }

  return niceProps;
};

const worldJson = await (await fetch('https://api.dev.hiberdev.net/project/1358077321109633.world')).json();

const WorldFromJson = () => {
  const level = worldJson.levels[0];
  const prefabs = level.placedPrefabs.map(placed => ({
    id: generateId(),
    children: worldJson.prefabs
      .find(prefab => prefab.id === placed.prefab)
      .prefab.items.map(({ id, name, props }, _, items) => ({
        id,
        name,
        props: convertProps(props, items),
      })),
  }));

  return (
    <HNode>
      {prefabs.map(prefab => (
        <HNode>
          {prefabToCoreHNode(prefab).children.map((child, index) => (
            <HNode engineId={child.id} key={`prefab-${index}`} engineProps={child.props} />
          ))}
        </HNode>
      ))}
    </HNode>
  );
};



// Read in Dive Data
import gameStatsData from './results.json';

// Since pos_xyz and rot_xyz are strings in your JSON, we need to parse them into arrays
gameStatsData.forEach(stats => {
  stats.pos_xyz = JSON.parse(stats.pos_xyz);
  stats.rot_xyz = JSON.parse(stats.rot_xyz);
});

// console.log(gameStatsData);


const EventOverlay: HDKComponent<{ name: string; prefab_id: id; prefab_scale: number; beam_colour: MaterialId }> = ({ name, prefab_id, prefab_scale, beam_colour, ...props }) => {
  // why doesn't id autopopulate from the definition?
  // why can't I send props into it? 
  return (

    <HNode
      {...props}>

      {gameStatsData
        .filter(stats => stats.name === name)
        .map((stats, index) => (
          <InfoPanel
            isOpenInOverlayEnabled
            header={name}
            body={name}
            maxShowDistance={30}>
            <Prefab
              key={index}
              id={prefab_id}
              x={stats.pos_xyz[0]}
              y={stats.pos_xyz[1]}
              z={stats.pos_xyz[2]}
              rotX={stats.rot_xyz[0]}
              rotY={stats.rot_xyz[1]}
              rotZ={stats.rot_xyz[2]}
              scale={prefab_scale}
            />
            <Prefab
              key={index}
              id='rounded_cylinder_01'
              material={beam_colour}
              scaleY={50}
              scaleZ={0.5}
              scaleX={0.5}
              x={stats.pos_xyz[0]}
              y={stats.pos_xyz[1] + 5}
              z={stats.pos_xyz[2]}
              rotX={stats.rot_xyz[0]}
              rotY={stats.rot_xyz[1]}
              rotZ={stats.rot_xyz[2]}
            />
          </InfoPanel>
        ))}
    </HNode>
  );
};



const World = () => (
  <HNode>
    <WorldFromJson />

    <Spawnpoint x={-72.1} y={0} z={-135.5} />



    {/* <ButtonSensor output="globalButton" x={-71.7} y={-1.0} z={-143.7} scale={3} />
    <ButtonSensor output="gameStatsButton" x={-73.7} y={-1.0} z={-143.7} scale={3} />
    <OrGate inputs={["gameStatsButton", "globalButton"]} output="gameStatsOn" /> */}
{/* 
    <VisibleOnSignal input="gameStatsOn"> */}
    <EventOverlay name='gameStats' prefab_id='en_p_torch_standing_01' prefab_scale={2} beam_colour='palette_01_green' y={0} />
    {/* </VisibleOnSignal> */}

    {/* <EventOverlay name='gameEmote' prefab_id='hologram_01_hibert' prefab_scale={2} beam_colour='palette_01_red' y={0} />
    <EventOverlay name='gameInteract' prefab_id='sign_wooden_01_exclamtion' prefab_scale={2} beam_colour='palette_01_blue' y={0} />
    <EventOverlay name='gameContentShown' prefab_id='sign_wooden_01_question' prefab_scale={2} beam_colour='palette_01_yellow' y={0} />
    <EventOverlay name='gameSignalSent' prefab_id='animated_light_01' prefab_scale={4} beam_colour='palette_02_green' y={0} />
    <EventOverlay name='gameWorldLeft' prefab_id='sign_wooden_01_skull' prefab_scale={2} beam_colour='palette_01_black' y={0} />
    <EventOverlay name='gameRestarted' prefab_id='sign_wooden_01_arrow_left' prefab_scale={2} beam_colour='palette_01_pink' y={0} />
    <EventOverlay name='gameFinished' prefab_id='sign_wooden_01_goal' prefab_scale={2} beam_colour='t_rainbow_02' y={0} />
    <EventOverlay name='gameSignalSent' prefab_id='animated_light_01' prefab_scale={4} beam_colour='palette_02_green' y={0} /> */}


  </HNode >
);

render(<World />, {
  environment: 'sunrise_01',
  saveToFile: false,
});

// questions
// Hot reload doesn't work

