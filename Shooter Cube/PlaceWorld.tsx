import { Assets, quaternionToEuler } from '@hiber3d/hdk-core';
import { HDKComponent, HNode } from '@hiber3d/hdk-react';
import { fromB64 } from '@hiber3d/hdk-utils';
import React, { ReactNode } from 'react';

export const getWorld = async ({ worldId, dev = false }: { worldId: string; dev?: boolean }) => {
  const baseUrl = dev ? 'https://api.dev.hiberdev.net' : 'https://api.hiberworld.com';
  const scene = await fetch(`${baseUrl}/project/${fromB64(worldId)}.world`);

  if (!scene.ok) {
    return;
  }

  const json = await scene.json();

  return {
    prefabDefinitions: json.prefabs,
    placedPrefabs: json.levels.flatMap(level => level.placedPrefabs),
    environments: json.environments,
    materials: json.materials,
  };
};

export const PlaceWorld: HDKComponent<{
  assets?: {
    prefabDefinitions: Assets['PREFAB'][];
    placedPrefabs: any[];
    environments?: Assets['ENVIRONMENT'][];
    materials?: Assets['MATERIAL'][];
  };
  replacePrefabIds?: Record<string, ReactNode>;
  includeEnvironments?: boolean;
  includeMaterials?: boolean;
}> = ({ assets, replacePrefabIds = {}, includeEnvironments = false, includeMaterials = false, ...props }) => {
  return (
    <>
      <>
        {includeEnvironments &&
          assets?.environments?.map(environment => (
            <React.Fragment key={`${environment.id}`}>
              <asset assetType="ENVIRONMENT" id={environment.id ?? ''} assetData={environment} />
            </React.Fragment>
          ))}
      </>
      <>
        {includeMaterials &&
          assets?.materials?.map(material => (
            <React.Fragment key={`${material.id}`}>
              <asset assetType="MATERIAL" id={material.id ?? ''} assetData={material} />
            </React.Fragment>
          ))}
      </>
      {assets?.prefabDefinitions
        .filter(p => !Object.keys(replacePrefabIds)?.includes(p.id ?? ''))
        .map((prefab, index) => (
          <React.Fragment key={`${prefab.id}${index}`}>
            <asset
              assetType="PREFAB"
              id={prefab.id ?? ''}
              assetData={{ ...prefab, extraMetaData: { prefabCreationToolType: 'HDK' } }}
            />
          </React.Fragment>
        ))}
      <HNode {...props}>
        {assets?.placedPrefabs.map(placedPrefab => {
          const rot = quaternionToEuler(placedPrefab.transform.rot);
          const replacePrefab = replacePrefabIds[placedPrefab.prefab];
          const transformProps = {
            x: placedPrefab.transform.pos[0],
            y: placedPrefab.transform.pos[1],
            z: placedPrefab.transform.pos[2],
            scaleX: placedPrefab.transform.scale[0],
            scaleY: placedPrefab.transform.scale[1],
            scaleZ: placedPrefab.transform.scale[2],
            rotX: rot[0],
            rotY: rot[1],
            rotZ: rot[2],
          };

          if (replacePrefab) {
            return (
              <HNode key={placedPrefab.id} {...transformProps}>
                {replacePrefab}
              </HNode>
            );
          }

          if (placedPrefab.prefab)
            return (
              <React.Fragment key={placedPrefab.id}>
                <placedPrefab id={placedPrefab.prefab} overrides={placedPrefab.overrides} {...transformProps} />
              </React.Fragment>
            );
        })}
      </HNode>
    </>
  );
};