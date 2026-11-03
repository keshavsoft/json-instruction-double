import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";
import twoDimensional from "json-transformer-funcs-two-dimensions";

import writePath from "json-write-path";
import fallbackSpec from "spec-repo";

const functions = { applyTemplate, fromCollection, twoDimensional };

const runSingleInstruction = (instruction, registry, showLog, returnLog) => {
  const localShowLog = showLog;
  console.log("localShowLog : ", localShowLog);

  const localSpec = registry?.spec ?? fallbackSpec;

  const result = functions[instruction.func]({
    columns: registry.data.columns,
    data: registry.data.data,
    columnSpec: localSpec["buildBodyCell"],
    rowSpec: localSpec["buildBodyTr"]
  });

  writePath(registry, instruction.destinationPath, result);
};

const startFunc = (instructions, registry, showLog, returnLog) => {
  instructions.forEach(instruction => {
    runSingleInstruction(instruction, registry, showLog, returnLog);
  });
};

export default startFunc;