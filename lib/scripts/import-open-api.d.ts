import {
  ComponentsObject,
  OpenAPIObject,
  OperationObject,
  ParameterObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
} from "openapi3-ts";

/**
 * Discriminator helper for `ReferenceObject`
 *
 * @param property
 */
export declare const isReference: (property: any) => property is ReferenceObject;
/**
 * Return the typescript equivalent of open-api data type
 *
 * @param item
 * @ref https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types
 */
export declare const getScalar: (item: SchemaObject) => string;
/**
 * Return the output type from the $ref
 *
 * @param $ref
 */
export declare const getRef: ($ref: string) => string;
/**
 * Return the output type from an array
 *
 * @param item item with type === "array"
 */
export declare const getArray: (item: SchemaObject) => string;
/**
 * Return the output type from an object
 *
 * @param item item with type === "object"
 */
export declare const getObject: (item: SchemaObject) => string;
/**
 * Resolve the value of a schema object to a proper type definition.
 * @param schema
 */
export declare const resolveValue: (schema: SchemaObject) => string;
/**
 * Extract responses / request types from open-api specs
 *
 * @param responsesOrRequests reponses or requests object from open-api specs
 */
export declare const getResReqTypes: (
  responsesOrRequests: Array<[string, ReferenceObject | ResponseObject | RequestBodyObject]>,
) => string;
/**
 * Return every params in a path
 *
 * @example
 * ```
 * getParamsInPath("/pet/{category}/{name}/");
 * // => ["category", "name"]
 * ```
 * @param path
 */
export declare const getParamsInPath: (path: string) => string[];
/**
 * Generate a restful-react component from openapi operation specs
 *
 * @param operation
 * @param verb
 * @param route
 * @param baseUrl
 * @param operationIds - List of `operationId` to check duplication
 */
export declare const generateRestfulComponent: (
  operation: OperationObject,
  verb: string,
  route: string,
  operationIds: string[],
  parameters?: Array<ReferenceObject | ParameterObject>,
  schemasComponents?: ComponentsObject | undefined,
) => string;
/**
 * Generate the interface string
 * A tslint comment is insert if the resulted object is empty
 *
 * @param name interface name
 * @param schema
 */
export declare const generateInterface: (name: string, schema: SchemaObject) => string;

/**
 * Extract all types from #/components/schemas
 *
 * @param schemas
 */
export declare const generateSchemasDefinition: (
  schemas?:
    | {
        [schema: string]: SchemaObject;
      }
    | undefined,
) => string;

/**
 * Extract all types from #/components/responses
 *
 * @param responses
 */
export declare const generateResponsesDefinition: (
  responses?:
    | {
        [response: string]: ResponseObject;
      }
    | undefined,
) => string;

/**
 * Main entry of the generator. Generate restful-react component from openAPI.
 *
 * @param data raw data of the spec
 * @param format format of the spec
 * @param transformer custom function to transform your spec
 */
declare const importOpenApi: (
  data: string,
  format: "yaml" | "json",
  transformer?: ((schema: OpenAPIObject) => OpenAPIObject) | undefined,
) => Promise<string>;

export default importOpenApi;
// # sourceMappingURL=import-open-api.d.ts.map
