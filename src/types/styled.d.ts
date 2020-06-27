import 'styled-components';
import {} from 'styled-components/cssprop';
import { Theme } from '@material-ui/core';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
