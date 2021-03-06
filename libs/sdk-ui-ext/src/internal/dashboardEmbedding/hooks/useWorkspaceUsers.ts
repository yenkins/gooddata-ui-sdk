// (C) 2020 GoodData Corporation
import { IAnalyticalBackend, IWorkspaceUser } from "@gooddata/sdk-backend-spi";
import {
    GoodDataSdkError,
    useBackend,
    useCancelablePromise,
    UseCancelablePromiseCallbacks,
    UseCancelablePromiseState,
    useWorkspace,
} from "@gooddata/sdk-ui";
import invariant from "ts-invariant";

/**
 * @beta
 */
export interface IUseWorkspaceUsersConfig
    extends UseCancelablePromiseCallbacks<IWorkspaceUser[], GoodDataSdkError> {
    /**
     *  Option to filter users by the provided string.
     */
    search?: string;

    /**
     * Backend to work with.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the hook MUST be called within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;

    /**
     * Workspace to work with.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the hook MUST be called within an existing WorkspaceContext.
     */
    workspace?: string;
}

/**
 * Hook allowing to download workspace users
 * @param config - configuration of the hook
 * @beta
 */
export function useWorkspaceUsers({
    search,
    backend,
    workspace,
    onCancel,
    onError,
    onLoading,
    onPending,
    onSuccess,
}: IUseWorkspaceUsersConfig): UseCancelablePromiseState<IWorkspaceUser[], any> {
    const effectiveBackend = useBackend(backend);
    const effectiveWorkspace = useWorkspace(workspace);

    invariant(
        effectiveBackend,
        "The backend in useDashboard must be defined. Either pass it as a config prop or make sure there is a BackendProvider up the component tree.",
    );

    invariant(
        effectiveWorkspace,
        "The workspace in useDashboard must be defined. Either pass it as a config prop or make sure there is a WorkspaceProvider up the component tree.",
    );

    const promise = () => {
        let loader = effectiveBackend.workspace(effectiveWorkspace).users();
        if (search) {
            loader = loader.withOptions({ search: `%${search}` });
        }
        return loader.queryAll();
    };

    return useCancelablePromise({ promise, onCancel, onError, onLoading, onPending, onSuccess }, [
        effectiveBackend,
        effectiveWorkspace,
        search,
    ]);
}
