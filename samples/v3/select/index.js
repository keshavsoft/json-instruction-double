import runDoubleInstructions from "../../../src/index.js";

import base from "./base.json" with { type: "json" };
import data from "./data.json" with { type: "json" };
import columns from "./columns.json" with { type: "json" };

import instruction from "./instruction.json" with { type: "json" };

runDoubleInstructions(instruction, {
    base,
    data: {
        columns,
        data
    }
}, false, []);

console.log("body 1 : ", base.children[2].children[0]);