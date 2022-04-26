import { ID_of } from "./ID";
import { Doc } from "./Node";
import {
  NodeDefinition,
  NodeInstanceType,
  NodeInternalDataType,
  NodeSchema,
  NodeEdgesSchema,
} from "./Schema";

export type Changeset<N extends NodeSchema, E extends NodeEdgesSchema> =
  | DeleteChangeset<N, E>
  | UpdateChangeset<N, E>
  | CreateChangeset<N, E>;

export type CreateChangeset<N extends NodeSchema, E extends NodeEdgesSchema> = {
  type: "create";
  _id: ID_of<any>;
  _parentDocId: ID_of<Doc<any>> | null;
  updates: Partial<NodeInternalDataType<N>>;
  definition: NodeDefinition<N, E>;
};

export type UpdateChangeset<N extends NodeSchema, E extends NodeEdgesSchema> = {
  type: "update";
  _id: ID_of<any>;
  _parentDocId: ID_of<Doc<any>> | null;
  updates: Partial<NodeInternalDataType<N>>;
  node: NodeInstanceType<N, E>;
};

export type DeleteChangeset<N extends NodeSchema, E extends NodeEdgesSchema> = {
  type: "delete";
  _id: ID_of<any>;
  _parentDocId: ID_of<Doc<any>> | null;
  node: NodeInstanceType<N, E> | null;
};
