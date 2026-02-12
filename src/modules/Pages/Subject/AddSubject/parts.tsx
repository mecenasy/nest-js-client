import styled from 'styled-components';
import { animated } from '@react-spring/web';
import WhiteButton from '~/src/modules/Components/Buttons/IconButton';

export const Animated = styled(animated.div)`
  height: 60px;
  display: flex;
  gap: 8px;
  padding-left: 16px;
`;

export const Button = styled(WhiteButton)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  padding: 8px;
  margin-top: 24px;
`;
