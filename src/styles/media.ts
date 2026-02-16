import { generateMedia } from 'styled-media-query';
import { lg, md, sm, xs, xxs } from './config';

export const media = generateMedia({
  xxs: `${xxs}px`,
  xs: `${xs}px`,
  sm: `${sm}px`,
  md: `${md}px`,
  lg: `${lg}px`,
});
