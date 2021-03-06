// (C) 2020 GoodData Corporation

import { IAttribute } from "@gooddata/sdk-model";
import { VisualizationObjectModel } from "@gooddata/api-client-tiger";

import { toDisplayFormQualifier } from "../ObjRefConverter";

export function convertAttribute(attribute: IAttribute, idx: number): VisualizationObjectModel.IAttribute {
    const alias = attribute.attribute.alias;
    const aliasProp = alias ? { alias } : {};
    const displayFromRef = attribute.attribute.displayForm;

    return {
        displayForm: toDisplayFormQualifier(displayFromRef),
        localIdentifier: attribute.attribute.localIdentifier || `a${idx + 1}`,
        ...aliasProp,
    };
}
