/**
 * @module epics
 */
import { fetchBookstoreValidationEpic } from "./bookstore";
import { commListenEpic } from "./comm";
import {
  autoSaveCurrentContentEpic,
  fetchContentEpic,
  publishToBookstore,
  saveContentEpic,
  updateContentEpic
} from "./contents";
import {
  executeAllCellsEpic,
  executeCellEpic,
  updateDisplayEpic
} from "./execute";
import {
  acquireKernelInfoEpic,
  launchKernelWhenNotebookSetEpic,
  restartKernelEpic,
  watchExecutionStateEpic
} from "./kernel-lifecycle";
import { fetchKernelspecsEpic } from "./kernelspecs";
import {
  changeWebSocketKernelEpic,
  interruptKernelEpic,
  killKernelEpic,
  launchWebSocketKernelEpic
} from "./websocket-kernel";

// Because `@nteract/core` ends up being a commonjs import, we can't currently
// rely on `import { epics } from ""@nteract/core"`
// as it would collide the array with the named exports
const allEpics = [
  executeCellEpic,
  updateDisplayEpic,
  executeAllCellsEpic,
  commListenEpic,
  launchWebSocketKernelEpic,
  changeWebSocketKernelEpic,
  interruptKernelEpic,
  killKernelEpic,
  acquireKernelInfoEpic,
  watchExecutionStateEpic,
  launchKernelWhenNotebookSetEpic,
  restartKernelEpic,
  fetchKernelspecsEpic,
  fetchContentEpic,
  updateContentEpic,
  saveContentEpic,
  autoSaveCurrentContentEpic,
  publishToBookstore,
  fetchBookstoreValidationEpic
];

export {
  allEpics,
  executeCellEpic,
  updateDisplayEpic,
  executeAllCellsEpic,
  commListenEpic,
  launchWebSocketKernelEpic,
  changeWebSocketKernelEpic,
  interruptKernelEpic,
  killKernelEpic,
  acquireKernelInfoEpic,
  watchExecutionStateEpic,
  launchKernelWhenNotebookSetEpic,
  restartKernelEpic,
  fetchKernelspecsEpic,
  fetchContentEpic,
  updateContentEpic,
  saveContentEpic,
  autoSaveCurrentContentEpic,
  publishToBookstore,
  fetchBookstoreValidationEpic
};
