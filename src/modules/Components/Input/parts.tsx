import styled, { createGlobalStyle } from 'styled-components';
import ToggleBase from 'react-toggle';
import FormWrapperBase from '../../Components/FormWrapper/FormWrapper';

export const FromWrapper = styled(FormWrapperBase)`
   margin: auto;
`;

export const Toggle = styled(ToggleBase)`
   margin: 0 16px;

   .react-toggle-track {
      background-color: #4D4D4D !important;
   }
`;


export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid gray;
  border-radius: 6px;
  text-align: center;
`;
export const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid gray;
  border-radius: 6px;
  text-align: center;
`;

export const ValidationAlert = styled.div`
  height: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2px;
`;

export const Error = styled.span`
  color: red;
  text-align: center;
  font-size: 14px;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  margin-right: 84px;
`;

export const Wrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: start;
   padding: 16px 0;
`;

export const ToggleWrapper = styled.div`
   display: flex;
   align-items: center;
`;

export const Text = styled.span`
   font-size: 14px;
`;

export const TextLeft = styled(Text)`
   text-align: end;
   width: 33%;
`;

export const TextRight = styled(Text)`
   width: 33%;
`;


export const DropdownWrapper = styled.div`
   display: flex;
   justify-content: start;
   flex-direction: column;
   padding: 16px 0;
`;

export const Dropzone = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   width: 64px;
   height: 64px;
   border: 1px dashed grey;
   border-radius: 4px;

   &:hover {
      border: 1px dashed black;
   }
`;

export const Image = styled.img`
   width: 32px;
   height: 32px;;
`;


export const Global = createGlobalStyle`
.react-toggle {
  touch-action: pan-x;

  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}

.react-toggle-screenreader-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.react-toggle--disabled {
  cursor: not-allowed;
  opacity: 0.5;
  -webkit-transition: opacity 0.25s;
  transition: opacity 0.25s;
}

.react-toggle-track {
  width: 50px;
  height: 24px;
  padding: 0;
  border-radius: 30px;
  background-color: #4D4D4D;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
  background-color: #000000;
}

.react-toggle--checked .react-toggle-track {
  background-color: #19AB27;
}

.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
  background-color: #128D15;
}

.react-toggle-track-check {
  position: absolute;
  width: 14px;
  height: 10px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  left: 8px;
  opacity: 0;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

.react-toggle--checked .react-toggle-track-check {
  opacity: 1;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

.react-toggle-track-x {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  right: 10px;
  opacity: 1;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

.react-toggle--checked .react-toggle-track-x {
  opacity: 0;
}

.react-toggle-thumb {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 1px;
  left: 1px;
  width: 22px;
  height: 22px;
  border: 1px solid #4D4D4D;
  border-radius: 50%;
  background-color: #FAFAFA;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  transition: all 0.25s ease;
}

.react-toggle--checked .react-toggle-thumb {
  left: 27px;
  border-color: #19AB27;
}

.react-toggle--focus .react-toggle-thumb {
  -webkit-box-shadow: 0px 0px 3px 2px #0099E0;
  -moz-box-shadow: 0px 0px 3px 2px #0099E0;
  box-shadow: 0px 0px 2px 3px #0099E0;
}

.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
  -webkit-box-shadow: 0px 0px 5px 5px #0099E0;
  -moz-box-shadow: 0px 0px 5px 5px #0099E0;
  box-shadow: 0px 0px 5px 5px #0099E0;
}`