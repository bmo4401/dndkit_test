import type Active from '@dnd-kit/core';
declare module '@dnd-kit/core' {
  interface Active {
    id: Active & string;
  }
}
