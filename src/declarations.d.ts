// Type declarations to silence missing module errors for TypeScript
declare module 'react-native-gesture-handler' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';
  export const PanGestureHandler: React.ComponentType<ViewProps & { onGestureEvent?: any; onHandlerStateChange?: any }>;
  export const State: { END: number };
}

declare module 'react-native-view-shot' {
  export function captureRef(viewRef: any, options?: { format?: string; quality?: number }): Promise<string>;
}

declare module 'react-native-fs' {
  const DocumentDirectoryPath: string;
  export function moveFile(source: string, dest: string): Promise<void>;
  export default { DocumentDirectoryPath, moveFile };
}
