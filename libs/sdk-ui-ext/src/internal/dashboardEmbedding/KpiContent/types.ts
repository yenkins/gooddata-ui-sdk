// (C) 2007-2020 GoodData Corporation
import { IMeasureDescriptor } from "@gooddata/sdk-backend-spi";

export interface IKpiResult {
    measureFormat: string;
    measureResult: number;
    measureForComparisonResult?: number;
    measureDescriptor: IMeasureDescriptor;
}
