import { LoadableManifest } from '@react-loadable/revised/webpack';
import fs from 'fs';
import path from 'path';

export const getManifest = (): LoadableManifest => {
  const manifestPath = path.resolve(__dirname, '../build/react-loadable.json');

  if (!fs.existsSync(manifestPath)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[server]', `react-loadable manifest not found at ${manifestPath}, continuing with empty manifest`);
    }
    // return an empty manifest with expected shape to avoid runtime errors in getBundles
    return {
      publicPath: '',
      originToChunkGroups: {},
      chunkGroupAssets: {},
      preloadAssets: {},
      prefetchAssets: {},
      runtimeAssets: {},
      entryToId: {},
    } as LoadableManifest;
  }

  const statsFromFile = fs.readFileSync(
    manifestPath,
    { encoding: 'utf-8' }
  );

  return JSON.parse(statsFromFile);
}

