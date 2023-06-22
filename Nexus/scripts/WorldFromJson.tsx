import { CoreHNode, generateId } from "@hiber3d/hdk-core";
import { HDKComponent, HNode } from "@hiber3d/hdk-react";

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
  
  
  export const WorldFromJson:HDKComponent<{worldJson:any}> = ({worldJson}) => {
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
  



