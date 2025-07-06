import { modules, ignores, typescript, extend, common, node, stylistic } from "@hazmi35/eslint-config";

export default [
    ...extend(typescript, [
        {
            rule: "typescript/naming-convention",
            option: ["off"]
        }
    ]),
    ...common,
    ...modules,
    ...node,
    ...stylistic,
    ...ignores
];
