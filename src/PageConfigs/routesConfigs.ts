import { PageConfig } from './constants';

const context = (require as any).context('./', true, /.*Config\.ts$/);

export const configs: PageConfig[] = context
  .keys()
  .filter((key: string) => key !== './menuConfig.ts')
  .flatMap((key: string) => {
    const mod = context(key);
    return Object.values(mod).filter(
      (exportedItem) => typeof exportedItem === 'object'
    );
  });
