var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __read =
  (this && this.__read) ||
  function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
var __spread =
  (this && this.__spread) ||
  function() {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
  };
var _this = this;
import { pascal } from "case";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import uniq from "lodash/uniq";
import swagger2openapi from "swagger2openapi";
import YAML from "yamljs";
/**
 * Discriminator helper for `ReferenceObject`
 *
 * @param property
 */
export var isReference = function(property) {
  return Boolean(property.$ref);
};
/**
 * Return the typescript equivalent of open-api data type
 *
 * @param item
 * @ref https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types
 */
export var getScalar = function(item) {
  switch (item.type) {
    case "int32":
    case "int64":
    case "number":
    case "integer":
    case "long":
    case "float":
    case "double":
      return "number";
    case "boolean":
      return "boolean";
    case "array":
      return getArray(item);
    case "object":
      return getObject(item);
    case "string":
      return item.enum ? '"' + item.enum.join('" | "') + '"' : "string";
    case "byte":
    case "binary":
    case "date":
    case "dateTime":
    case "date-time":
    case "password":
      return "string";
    default:
      return getObject(item);
  }
};
/**
 * Return the output type from the $ref
 *
 * @param $ref
 */
export var getRef = function($ref) {
  if ($ref.startsWith("#/components/schemas")) {
    return pascal($ref.replace("#/components/schemas/", ""));
  } else if ($ref.startsWith("#/components/responses")) {
    return pascal($ref.replace("#/components/responses/", "")) + "Response";
  } else if ($ref.startsWith("#/components/parameters")) {
    return pascal($ref.replace("#/components/parameters/", "")) + "Parameter";
  } else if ($ref.startsWith("#/components/requestBodies")) {
    return pascal($ref.replace("#/components/requestBodies/", "")) + "RequestBody";
  } else {
    throw new Error("This library only resolve $ref that are include into `#/components/*` for now");
  }
};
/**
 * Return the output type from an array
 *
 * @param item item with type === "array"
 */
export var getArray = function(item) {
  if (item.items) {
    return resolveValue(item.items) + "[]";
  } else {
    throw new Error("All arrays must have an `items` key define");
  }
};
/**
 * Return the output type from an object
 *
 * @param item item with type === "object"
 */
export var getObject = function(item) {
  if (isReference(item)) {
    return getRef(item.$ref);
  }
  if (item.allOf) {
    return item.allOf.map(resolveValue).join(" & ");
  }
  if (item.oneOf) {
    return item.oneOf.map(resolveValue).join(" | ");
  }
  if (item.properties) {
    return (
      "{" +
      Object.entries(item.properties)
        .map(function(_a) {
          var _b = __read(_a, 2),
            key = _b[0],
            prop = _b[1];
          var isRequired = (item.required || []).includes(key);
          return "" + key + (isRequired ? "" : "?") + ": " + resolveValue(prop);
        })
        .join("; ") +
      "}"
    );
  }
  if (item.additionalProperties) {
    return "{[key: string]: " + resolveValue(item.additionalProperties) + "}";
  }
  return item.type === "object" ? "{}" : "any";
};
/**
 * Resolve the value of a schema object to a proper type definition.
 * @param schema
 */
export var resolveValue = function(schema) {
  return isReference(schema) ? getRef(schema.$ref) : getScalar(schema);
};
/**
 * Extract responses / request types from open-api specs
 *
 * @param responsesOrRequests reponses or requests object from open-api specs
 */
export var getResReqTypes = function(responsesOrRequests) {
  return uniq(
    responsesOrRequests.map(function(_a) {
      var _b = __read(_a, 2),
        _ = _b[0],
        res = _b[1];
      if (!res) {
        return "void";
      }
      if (isReference(res)) {
        return getRef(res.$ref);
      } else {
        if (res.content && res.content["application/json"]) {
          var schema = res.content["application/json"].schema;
          return resolveValue(schema);
        } else if (res.content && res.content["application/octet-stream"]) {
          var schema = res.content["application/octet-stream"].schema;
          return resolveValue(schema);
        } else {
          return "void";
        }
      }
    }),
  ).join(" | ");
};
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
export var getParamsInPath = function(path) {
  var n;
  var output = [];
  var templatePathRegex = /\{(\w+)}/g;
  // tslint:disable-next-line:no-conditional-assignment
  while ((n = templatePathRegex.exec(path)) !== null) {
    output.push(n[1]);
  }
  return output;
};
/**
 * Import and parse the openapi spec from a yaml/json
 *
 * @param data raw data of the spec
 * @param format format of the spec
 */
var importSpecs = function(data, extension) {
  var schema = extension === "yaml" ? YAML.parse(data) : JSON.parse(data);
  return new Promise(function(resolve, reject) {
    if (!schema.openapi || !schema.openapi.startsWith("3.0")) {
      swagger2openapi.convertObj(schema, {}, function(err, _a) {
        var openapi = _a.openapi;
        if (err) {
          reject(err);
        } else {
          resolve(openapi);
        }
      });
    } else {
      resolve(schema);
    }
  });
};
/**
 * Generate a restful-react component from openapi operation specs
 *
 * @param operation
 * @param verb
 * @param route
 * @param baseUrl
 * @param operationIds - List of `operationId` to check duplication
 */
export var generateRestfulComponent = function(operation, verb, route, operationIds, parameters, schemasComponents) {
  if (parameters === void 0) {
    parameters = [];
  }
  if (!operation.operationId) {
    throw new Error("Every path must have a operationId - No operationId set for " + verb + " " + route);
  }
  if (operationIds.includes(operation.operationId)) {
    throw new Error('"' + operation.operationId + '" is duplicated in your schema definition!');
  }
  operationIds.push(operation.operationId);
  route = route.replace(/\{/g, "${"); // `/pet/{id}` => `/pet/${id}`
  // Remove the last param of the route if we are in the DELETE case
  var lastParamInTheRoute;
  if (verb === "delete") {
    var lastParamInTheRouteRegExp = /\/\$\{(\w+)\}$/;
    lastParamInTheRoute = (route.match(lastParamInTheRouteRegExp) || [])[1];
    route = route.replace(lastParamInTheRouteRegExp, ""); // `/pet/${id}` => `/pet`
  }
  var componentName = pascal(operation.operationId);
  var Component = verb === "get" ? "Get" : "Mutate";
  var isOk = function(_a) {
    var _b = __read(_a, 1),
      statusCode = _b[0];
    return statusCode.toString().startsWith("2");
  };
  var isError = function(_a) {
    var _b = __read(_a, 1),
      statusCode = _b[0];
    return statusCode.toString().startsWith("4") || statusCode.toString().startsWith("5") || statusCode === "default";
  };
  var responseTypes = getResReqTypes(Object.entries(operation.responses).filter(isOk)) || "void";
  var errorTypes = getResReqTypes(Object.entries(operation.responses).filter(isError)) || "unknown";
  var requestBodyTypes = getResReqTypes([["body", operation.requestBody]]);
  var needAResponseComponent = responseTypes.includes("{");
  /**
   * We strip the ID from the URL in order to pass it as an argument to the
   * `delete` function for generated <DeleteResource /> components.
   *
   * For example:
   *
   *  A given request
   *    DELETE https://my.api/resource/123
   *
   *  Becomes
   *    <DeleteResource>
   *      {(deleteThisThing) => <Button onClick={() => deleteThisThing("123")}>DELETE IT</Button>}
   *    </DeleteResource>
   */
  var paramsInPath = getParamsInPath(route).filter(function(param) {
    return !(verb === "delete" && param === lastParamInTheRoute);
  });
  var _a = groupBy(
      __spread(parameters, operation.parameters || []).map(function(p) {
        if (isReference(p)) {
          return get(schemasComponents, p.$ref.replace("#/components/", "").replace("/", "."));
        } else {
          return p;
        }
      }),
      "in",
    ),
    _b = _a.query,
    queryParams = _b === void 0 ? [] : _b,
    _c = _a.path,
    pathParams = _c === void 0 ? [] : _c,
    _d = _a.header,
    headerParams = _d === void 0 ? [] : _d;
  var paramsTypes = paramsInPath
    .map(function(p) {
      try {
        var _a = pathParams.find(function(i) {
            return i.name === p;
          }),
          name_1 = _a.name,
          required = _a.required,
          schema = _a.schema;
        return "" + name_1 + (required ? "" : "?") + ": " + resolveValue(schema);
      } catch (err) {
        throw new Error("The path params " + p + " can't be found in parameters (" + operation.operationId + ")");
      }
    })
    .join("; ");
  var queryParamsType = queryParams
    .map(function(p) {
      return "" + p.name + (p.required ? "" : "?") + ": " + resolveValue(p.schema);
    })
    .join("; ");
  var genericsTypes =
    verb === "get"
      ? (needAResponseComponent ? componentName + "Response" : responseTypes) +
        ", " +
        errorTypes +
        ", " +
        (queryParamsType ? componentName + "QueryParams" : "void")
      : (needAResponseComponent ? componentName + "Response" : responseTypes) +
        ", " +
        errorTypes +
        ", " +
        (queryParamsType ? componentName + "QueryParams" : "void") +
        ", " +
        requestBodyTypes;
  var output =
    "" +
    (needAResponseComponent
      ? "\nexport " +
        (responseTypes.includes("|")
          ? "type " + componentName + "Response ="
          : "interface " + componentName + "Response") +
        " " +
        responseTypes +
        "\n"
      : "") +
    (queryParamsType ? "\nexport interface " + componentName + "QueryParams {" + queryParamsType + "}\n" : "") +
    "\nexport type " +
    componentName +
    "Props = Omit<" +
    Component +
    "Props<" +
    genericsTypes +
    '>, "path"' +
    (verb === "get" ? "" : ' | "verb"') +
    ">" +
    (paramsInPath.length ? " & {" + paramsTypes + "}" : "") +
    ";\n\n" +
    (operation.summary ? "// " + operation.summary : "") +
    "\nexport const " +
    componentName +
    " = (" +
    (paramsInPath.length ? "{" + paramsInPath.join(", ") + ", ...props}" : "props") +
    ": " +
    componentName +
    "Props) => (\n  <" +
    Component +
    "<" +
    genericsTypes +
    ">" +
    (verb === "get" ? "" : '\n    verb="' + verb.toUpperCase() + '"') +
    "\n    path={`" +
    route +
    "`}\n    {...props}\n  />\n);\n\n";
  if (
    headerParams
      .map(function(_a) {
        var name = _a.name;
        return name.toLocaleLowerCase();
      })
      .includes("prefer")
  ) {
    output +=
      "export type Poll" +
      componentName +
      "Props = Omit<PollProps<" +
      genericsTypes +
      '>, "path">' +
      (paramsInPath.length ? " & {" + paramsTypes + "}" : "") +
      ";\n\n" +
      (operation.summary ? "// " + (operation.summary + " (long polling)") : "") +
      "\nexport const Poll" +
      componentName +
      " = (" +
      (paramsInPath.length ? "{" + paramsInPath.join(", ") + ", ...props}" : "props") +
      ": Poll" +
      componentName +
      "Props) => (\n  <Poll<" +
      genericsTypes +
      ">\n    path={`" +
      route +
      "`}\n    {...props}\n  />\n);\n\n";
  }
  return output;
};
/**
 * Generate the interface string
 * A tslint comment is insert if the resulted object is empty
 *
 * @param name interface name
 * @param schema
 */
export var generateInterface = function(name, schema) {
  var scalar = getScalar(schema);
  var isEmptyObject = scalar === "{}";
  return isEmptyObject
    ? "// tslint:disable-next-line:no-empty-interface\nexport interface " + pascal(name) + " " + scalar
    : "export interface " + pascal(name) + " " + scalar;
};
/**
 * Extract all types from #/components/schemas
 *
 * @param schemas
 */
export var generateSchemasDefinition = function(schemas) {
  if (schemas === void 0) {
    schemas = {};
  }
  if (isEmpty(schemas)) {
    return "";
  }
  return (
    Object.entries(schemas)
      .map(function(_a) {
        var _b = __read(_a, 2),
          name = _b[0],
          schema = _b[1];
        return (!schema.type || schema.type === "object") && !schema.allOf && !schema.oneOf && !isReference(schema)
          ? generateInterface(name, schema)
          : "export type " + pascal(name) + " = " + resolveValue(schema) + ";";
      })
      .join("\n\n") + "\n"
  );
};
/**
 * Extract all types from #/components/responses
 *
 * @param responses
 */
export var generateResponsesDefinition = function(responses) {
  if (responses === void 0) {
    responses = {};
  }
  if (isEmpty(responses)) {
    return "";
  }
  return (
    "\n" +
    Object.entries(responses)
      .map(function(_a) {
        var _b = __read(_a, 2),
          name = _b[0],
          response = _b[1];
        var type = getResReqTypes([["", response]]);
        var isEmptyInterface = type === "{}";
        if (isEmptyInterface) {
          return (
            "// tslint:disable-next-line:no-empty-interface\nexport interface " + pascal(name) + "Response " + type
          );
        } else if (type.includes("{") && !type.includes("|") && !type.includes("&")) {
          return "export interface " + pascal(name) + "Response " + type;
        } else {
          return "export type " + pascal(name) + "Response = " + type + ";";
        }
      })
      .join("\n\n") +
    "\n"
  );
};
/**
 * Main entry of the generator. Generate restful-react component from openAPI.
 *
 * @param data raw data of the spec
 * @param format format of the spec
 * @param transformer custom function to transform your spec
 */
var importOpenApi = function(data, format, transformer) {
  return __awaiter(_this, void 0, void 0, function() {
    var operationIds, schema, output, haveGet, haveMutate, havePoll, imports;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          operationIds = [];
          return [4 /*yield*/, importSpecs(data, format)];
        case 1:
          schema = _a.sent();
          if (transformer) {
            schema = transformer(schema);
          }
          output = "";
          output += generateSchemasDefinition(schema.components && schema.components.schemas);
          output += generateResponsesDefinition(schema.components && schema.components.responses);
          Object.entries(schema.paths).forEach(function(_a) {
            var _b = __read(_a, 2),
              route = _b[0],
              verbs = _b[1];
            Object.entries(verbs).forEach(function(_a) {
              var _b = __read(_a, 2),
                verb = _b[0],
                operation = _b[1];
              if (["get", "post", "patch", "put", "delete"].includes(verb)) {
                output += generateRestfulComponent(
                  operation,
                  verb,
                  route,
                  operationIds,
                  verbs.parameters,
                  schema.components,
                );
              }
            });
          });
          haveGet = Boolean(output.match(/<Get</));
          haveMutate = Boolean(output.match(/<Mutate</));
          havePoll = Boolean(output.match(/<Poll</));
          imports = [];
          if (haveGet) {
            imports.push("Get", "GetProps");
          }
          if (haveMutate) {
            imports.push("Mutate", "MutateProps");
          }
          if (havePoll) {
            imports.push("Poll", "PollProps");
          }
          output =
            '/* Generated by restful-react */\n\nimport React from "react";\nimport { ' +
            imports.join(", ") +
            ' } from "restful-react";\n\nexport type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;\n\n' +
            output;
          return [2 /*return*/, output];
      }
    });
  });
};
export default importOpenApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LW9wZW4tYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvaW1wb3J0LW9wZW4tYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkF3ZkE7QUF4ZkEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QixPQUFPLEdBQUcsTUFBTSxZQUFZLENBQUM7QUFDN0IsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxJQUFJLE1BQU0sYUFBYSxDQUFDO0FBYy9CLE9BQU8sZUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBRTlDLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUUxQjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLFVBQUMsUUFBYTtJQUN2QyxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsSUFBTSxTQUFTLEdBQUcsVUFBQyxJQUFrQjtJQUMxQyxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDakIsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxTQUFTLENBQUM7UUFDZixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxRQUFRO1lBQ1gsT0FBTyxRQUFRLENBQUM7UUFFbEIsS0FBSyxTQUFTO1lBQ1osT0FBTyxTQUFTLENBQUM7UUFFbkIsS0FBSyxPQUFPO1lBQ1YsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQU8sQ0FBQyxPQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUUvRCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLFVBQVUsQ0FBQztRQUNoQixLQUFLLFdBQVcsQ0FBQztRQUNqQixLQUFLLFVBQVU7WUFDYixPQUFPLFFBQVEsQ0FBQztRQUVsQjtZQUNFLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCO0FBQ0gsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRyxVQUFDLElBQTZCO0lBQ2xELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQzNDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMxRDtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1FBQ3BELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7S0FDekU7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUNyRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO0tBQzNFO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLEVBQUU7UUFDeEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztLQUNoRjtTQUFNO1FBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFDO0tBQ2xHO0FBQ0gsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLFFBQVEsR0FBRyxVQUFDLElBQWtCO0lBQ3pDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNkLE9BQVUsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBSSxDQUFDO0tBQ3hDO1NBQU07UUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7S0FDL0Q7QUFDSCxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFHLFVBQUMsSUFBa0I7SUFDMUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakQ7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqRDtJQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNuQixPQUFPLENBQ0wsR0FBRztZQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDNUIsR0FBRyxDQUFDLFVBQUMsRUFBcUQ7b0JBQXJELGtCQUFxRCxFQUFwRCxXQUFHLEVBQUUsWUFBSTtnQkFDZCxJQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLEtBQUcsR0FBRyxJQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQUssWUFBWSxDQUFDLElBQUksQ0FBRyxDQUFDO1lBQ2pFLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2IsR0FBRyxDQUNKLENBQUM7S0FDSDtJQUVELElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1FBQzdCLE9BQU8scUJBQW1CLFlBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBRyxDQUFDO0tBQ3RFO0lBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDL0MsQ0FBQyxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sWUFBWSxHQUFHLFVBQUMsTUFBb0IsSUFBSyxPQUFBLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBL0QsQ0FBK0QsQ0FBQztBQUV0SDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFHLFVBQzVCLG1CQUEwRjtJQUUxRixPQUFBLElBQUksQ0FDRixtQkFBbUIsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFRO1lBQVIsa0JBQVEsRUFBUCxTQUFDLEVBQUUsV0FBRztRQUM5QixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjthQUFNO1lBQ0wsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDbEQsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU8sQ0FBQztnQkFDdkQsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsRUFBRTtnQkFDakUsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE1BQU8sQ0FBQztnQkFDL0QsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsT0FBTyxNQUFNLENBQUM7YUFDZjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBcEJiLENBb0JhLENBQUM7QUFFaEI7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLFVBQUMsSUFBWTtJQUMxQyxJQUFJLENBQUMsQ0FBQztJQUNOLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztJQUN0QyxxREFBcUQ7SUFDckQsT0FBTyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsSUFBTSxXQUFXLEdBQUcsVUFBQyxJQUFZLEVBQUUsU0FBMEI7SUFDM0QsSUFBTSxNQUFNLEdBQUcsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUxRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4RCxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsRUFBVztvQkFBVCxvQkFBTztnQkFDcEQsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbEI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxDQUFDLElBQU0sd0JBQXdCLEdBQUcsVUFDdEMsU0FBMEIsRUFDMUIsSUFBWSxFQUNaLEtBQWEsRUFDYixZQUFzQixFQUN0QixVQUF5RCxFQUN6RCxpQkFBb0M7SUFEcEMsMkJBQUEsRUFBQSxlQUF5RDtJQUd6RCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLGlFQUErRCxJQUFJLFNBQUksS0FBTyxDQUFDLENBQUM7S0FDakc7SUFDRCxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBSSxTQUFTLENBQUMsV0FBVyxnREFBNEMsQ0FBQyxDQUFDO0tBQ3hGO0lBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFekMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsOEJBQThCO0lBRWxFLGtFQUFrRTtJQUNsRSxJQUFJLG1CQUEyQixDQUFDO0lBQ2hDLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNyQixJQUFNLHlCQUF5QixHQUFHLGdCQUFnQixDQUFDO1FBQ25ELG1CQUFtQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMseUJBQXlCO0tBQ2hGO0lBQ0QsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFZLENBQUMsQ0FBQztJQUNyRCxJQUFNLFNBQVMsR0FBRyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUVwRCxJQUFNLElBQUksR0FBRyxVQUFDLEVBQXdEO1lBQXhELGtCQUF3RCxFQUF2RCxrQkFBVTtRQUFrRCxPQUFBLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO0lBQXJDLENBQXFDLENBQUM7SUFDakgsSUFBTSxPQUFPLEdBQUcsVUFBQyxFQUF3RDtZQUF4RCxrQkFBd0QsRUFBdkQsa0JBQVU7UUFDMUIsT0FBQSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxLQUFLLFNBQVM7SUFBMUcsQ0FBMEcsQ0FBQztJQUU3RyxJQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO0lBQ2pHLElBQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDcEcsSUFBTSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsV0FBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLElBQU0sc0JBQXNCLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUzRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBRUgsSUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxtQkFBbUIsQ0FBQyxFQUFyRCxDQUFxRCxDQUFDLENBQUM7SUFDN0csSUFBQTs7Ozs7OzthQVNMLEVBVE8sYUFBdUIsRUFBdkIscUNBQXVCLEVBQUUsWUFBcUIsRUFBckIsb0NBQXFCLEVBQUUsY0FBeUIsRUFBekIsc0NBU3ZELENBQUM7SUFFRixJQUFNLFdBQVcsR0FBRyxZQUFZO1NBQzdCLEdBQUcsQ0FBQyxVQUFBLENBQUM7UUFDSixJQUFJO1lBQ0ksSUFBQSwyREFBZ0UsRUFBOUQsZ0JBQUksRUFBRSxzQkFBUSxFQUFFLGtCQUE4QyxDQUFDO1lBQ3ZFLE9BQU8sS0FBRyxNQUFJLElBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBSyxZQUFZLENBQUMsTUFBTyxDQUFHLENBQUM7U0FDbEU7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQW1CLENBQUMsdUNBQWtDLFNBQVMsQ0FBQyxXQUFXLE1BQUcsQ0FBQyxDQUFDO1NBQ2pHO0lBQ0gsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWQsSUFBTSxlQUFlLEdBQUcsV0FBVztTQUNoQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFHLENBQUMsQ0FBQyxJQUFJLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFPLENBQUcsRUFBL0QsQ0FBK0QsQ0FBQztTQUN6RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFZCxJQUFNLGFBQWEsR0FDakIsSUFBSSxLQUFLLEtBQUs7UUFDWixDQUFDLENBQUMsQ0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxXQUFLLFVBQVUsV0FDbkYsZUFBZSxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQ3hEO1FBQ0osQ0FBQyxDQUFDLENBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsV0FBSyxVQUFVLFdBQ25GLGVBQWUsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxXQUNyRCxnQkFBa0IsQ0FBQztJQUU5QixJQUFJLE1BQU0sR0FBRyxNQUNYLHNCQUFzQjtRQUNwQixDQUFDLENBQUMsZUFFRSxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFRLGFBQWEsZUFBWSxDQUFDLENBQUMsQ0FBQyxlQUFhLGFBQWEsYUFBVSxVQUNwRyxhQUFhLE9BQ3hCO1FBQ0ssQ0FBQyxDQUFDLEVBQUUsS0FFTixlQUFlO1FBQ2IsQ0FBQyxDQUFDLHdCQUNXLGFBQWEscUJBQWdCLGVBQWUsUUFDOUQ7UUFDSyxDQUFDLENBQUMsRUFBRSx1QkFFSSxhQUFhLHFCQUFnQixTQUFTLGNBQVMsYUFBYSxvQkFDdEUsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFXLFdBQy9CLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQU8sV0FBVyxNQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsZUFFcEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsd0JBQ3JDLGFBQWEsYUFDeEIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLFdBQ3JFLGFBQWEsd0JBQ2YsU0FBUyxTQUFJLGFBQWEsVUFDM0IsSUFBSSxLQUFLLEtBQUs7UUFDWixDQUFDLENBQUMsRUFBRTtRQUNKLENBQUMsQ0FBQyxrQkFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQUcsc0JBRW5CLEtBQUsscUNBS2xCLENBQUM7SUFFQSxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFRO1lBQU4sY0FBSTtRQUFPLE9BQUEsSUFBSSxDQUFDLGlCQUFpQixFQUFFO0lBQXhCLENBQXdCLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDL0UsTUFBTSxJQUFJLHFCQUFtQixhQUFhLCtCQUEwQixhQUFhLHFCQUMvRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFPLFdBQVcsTUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLGVBR3BELFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBTSxTQUFTLENBQUMsT0FBTyxvQkFBaUIsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFFLDRCQUNyRCxhQUFhLGFBQzFCLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQUksWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxlQUNqRSxhQUFhLDZCQUNoQixhQUFhLHNCQUNULEtBQUsscUNBS2xCLENBQUM7S0FDQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHLFVBQUMsSUFBWSxFQUFFLE1BQW9CO0lBQ2xFLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxJQUFNLGFBQWEsR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFDO0lBRXRDLE9BQU8sYUFBYTtRQUNsQixDQUFDLENBQUMsc0VBQ2EsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFJLE1BQVE7UUFDdkMsQ0FBQyxDQUFDLHNCQUFvQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQUksTUFBUSxDQUFDO0FBQ25ELENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSx5QkFBeUIsR0FBRyxVQUFDLE9BQXlDO0lBQXpDLHdCQUFBLEVBQUEsWUFBeUM7SUFDakYsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDcEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELE9BQU8sQ0FDTCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNwQixHQUFHLENBQUMsVUFBQyxFQUFjO1lBQWQsa0JBQWMsRUFBYixZQUFJLEVBQUUsY0FBTTtRQUNqQixPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDbEcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7WUFDakMsQ0FBQyxDQUFDLGlCQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBTSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQUc7SUFGNUQsQ0FFNEQsQ0FDN0Q7U0FDQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUN2QixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLDJCQUEyQixHQUFHLFVBQUMsU0FBNkM7SUFBN0MsMEJBQUEsRUFBQSxjQUE2QztJQUN2RixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN0QixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsT0FBTyxDQUNMLElBQUk7UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUN0QixHQUFHLENBQUMsVUFBQyxFQUFnQjtnQkFBaEIsa0JBQWdCLEVBQWYsWUFBSSxFQUFFLGdCQUFRO1lBQ25CLElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFNLGdCQUFnQixHQUFHLElBQUksS0FBSyxJQUFJLENBQUM7WUFDdkMsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsT0FBTyxzRUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFZLElBQU0sQ0FBQzthQUN6QztpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0UsT0FBTyxzQkFBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBWSxJQUFNLENBQUM7YUFDM0Q7aUJBQU07Z0JBQ0wsT0FBTyxpQkFBZSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFjLElBQUksTUFBRyxDQUFDO2FBQ3pEO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNmLElBQUksQ0FDTCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUY7Ozs7OztHQU1HO0FBQ0gsSUFBTSxhQUFhLEdBQUcsVUFDcEIsSUFBWSxFQUNaLE1BQXVCLEVBQ3ZCLFdBQXNEOzs7OztnQkFFaEQsWUFBWSxHQUFhLEVBQUUsQ0FBQztnQkFDckIscUJBQU0sV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBQTs7Z0JBQXhDLE1BQU0sR0FBRyxTQUErQjtnQkFDNUMsSUFBSSxXQUFXLEVBQUU7b0JBQ2YsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDOUI7Z0JBRUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFFaEIsTUFBTSxJQUFJLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEYsTUFBTSxJQUFJLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDeEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBd0M7d0JBQXhDLGtCQUF3QyxFQUF2QyxhQUFLLEVBQUUsYUFBSztvQkFDakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUE0Qzs0QkFBNUMsa0JBQTRDLEVBQTNDLFlBQUksRUFBRSxpQkFBUzt3QkFDN0MsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQzVELE1BQU0sSUFBSSx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQy9HO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVHLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBRTNDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ25CLElBQUksT0FBTyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNqQztnQkFDRCxJQUFJLFVBQVUsRUFBRTtvQkFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztpQkFDdkM7Z0JBQ0QsSUFBSSxRQUFRLEVBQUU7b0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQ25DO2dCQUNELE1BQU07b0JBQ0osZ0ZBR08sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsNkdBSTVCLEdBQUcsTUFBTSxDQUFDO2dCQUNULHNCQUFPLE1BQU0sRUFBQzs7O0tBQ2YsQ0FBQztBQUVGLGVBQWUsYUFBYSxDQUFDIn0=
