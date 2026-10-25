import twoDimensional from "json-transformer-funcs-two-dimensions";
import writePath from "json-write-path";
import validateInstruction from "json-instruction-guards";

const defaultFunctions = { twoDimensional };

export const runDoubleInstruction = (instruction, registry, options = {}) => {
  const { functions = defaultFunctions, showLog = false, returnLog = [] } = options;
  const check = validateInstruction(instruction);
  if (!check.valid) { if (showLog) console.warn("Invalid instruction:", check.errors); return { valid: false, errors: check.errors, registry }; }
  if (typeof functions[instruction.func] !== "function") return { valid: false, errors: [`Unknown function: ${instruction.func}`], registry };
  const result = functions[instruction.func](registry.data.columns, registry.data.data, registry.spec);
  writePath(registry, instruction.destinationPath, result);
  if (showLog) returnLog.push({ instruction: instruction.narration || instruction.func, valid: true });
  return { valid: true, result, registry };
};

export const runDoubleInstructions = (instructions = [], registry, options = {}) => instructions.map(instruction => runDoubleInstruction(instruction, registry, options));

export default runDoubleInstructions;