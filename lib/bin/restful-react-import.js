#!/usr/bin/env node
"use strict";

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var program = _interopDefault(require("commander"));
var fs = require("fs");
var inquirer = _interopDefault(require("inquirer"));
var path = require("path");
var request = _interopDefault(require("request"));
var _case = require("case");
var get = _interopDefault(require("lodash/get"));
var groupBy = _interopDefault(require("lodash/groupBy"));
var isEmpty = _interopDefault(require("lodash/isEmpty"));
var uniq = _interopDefault(require("lodash/uniq"));
var swagger2openapi = _interopDefault(require("swagger2openapi"));
var YAML = _interopDefault(require("yamljs"));

var __awaiter =
  (undefined && undefined.__awaiter) ||
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
  (undefined && undefined.__generator) ||
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
  (undefined && undefined.__read) ||
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
  (undefined && undefined.__spread) ||
  function() {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
  };
var _this = undefined;
/**
 * Discriminator helper for `ReferenceObject`
 *
 * @param property
 */
var isReference = function(property) {
  return Boolean(property.$ref);
};
/**
 * Return the typescript equivalent of open-api data type
 *
 * @param item
 * @ref https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types
 */
var getScalar = function(item) {
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
var getRef = function($ref) {
  if ($ref.startsWith("#/components/schemas")) {
    return _case.pascal($ref.replace("#/components/schemas/", ""));
  } else if ($ref.startsWith("#/components/responses")) {
    return _case.pascal($ref.replace("#/components/responses/", "")) + "Response";
  } else if ($ref.startsWith("#/components/parameters")) {
    return _case.pascal($ref.replace("#/components/parameters/", "")) + "Parameter";
  } else if ($ref.startsWith("#/components/requestBodies")) {
    return _case.pascal($ref.replace("#/components/requestBodies/", "")) + "RequestBody";
  } else {
    throw new Error("This library only resolve $ref that are include into `#/components/*` for now");
  }
};
/**
 * Return the output type from an array
 *
 * @param item item with type === "array"
 */
var getArray = function(item) {
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
var getObject = function(item) {
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
var resolveValue = function(schema) {
  return isReference(schema) ? getRef(schema.$ref) : getScalar(schema);
};
/**
 * Extract responses / request types from open-api specs
 *
 * @param responsesOrRequests reponses or requests object from open-api specs
 */
var getResReqTypes = function(responsesOrRequests) {
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
var getParamsInPath = function(path$$1) {
  var n;
  var output = [];
  var templatePathRegex = /\{(\w+)}/g;
  // tslint:disable-next-line:no-conditional-assignment
  while ((n = templatePathRegex.exec(path$$1)) !== null) {
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
var generateRestfulComponent = function(operation, verb, route, operationIds, parameters, schemasComponents) {
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
  var componentName = _case.pascal(operation.operationId);
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
var generateInterface = function(name, schema) {
  var scalar = getScalar(schema);
  var isEmptyObject = scalar === "{}";
  return isEmptyObject
    ? "// tslint:disable-next-line:no-empty-interface\nexport interface " + _case.pascal(name) + " " + scalar
    : "export interface " + _case.pascal(name) + " " + scalar;
};
/**
 * Extract all types from #/components/schemas
 *
 * @param schemas
 */
var generateSchemasDefinition = function(schemas) {
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
          : "export type " + _case.pascal(name) + " = " + resolveValue(schema) + ";";
      })
      .join("\n\n") + "\n"
  );
};
/**
 * Extract all types from #/components/responses
 *
 * @param responses
 */
var generateResponsesDefinition = function(responses) {
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
            "// tslint:disable-next-line:no-empty-interface\nexport interface " +
            _case.pascal(name) +
            "Response " +
            type
          );
        } else if (type.includes("{") && !type.includes("|") && !type.includes("&")) {
          return "export interface " + _case.pascal(name) + "Response " + type;
        } else {
          return "export type " + _case.pascal(name) + "Response = " + type + ";";
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

var __awaiter$1 =
  (undefined && undefined.__awaiter) ||
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
var __generator$1 =
  (undefined && undefined.__generator) ||
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
var __read$1 =
  (undefined && undefined.__read) ||
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
var _this$1 = undefined;
program.option("-o, --output [value]", "output file destination");
program.option("-f, --file [value]", "input file (yaml or json openapi specs)");
program.option("-g, --github [value]", "github path (format: `owner:repo:branch:path`)");
program.option("-t, --transformer [value]", "transformer function path");
program.parse(process.argv);
(function() {
  return __awaiter$1(_this$1, void 0, void 0, function() {
    var transformer,
      data,
      ext,
      format,
      accessToken,
      githubTokenPath,
      answers,
      _a,
      owner,
      repo,
      branch,
      path$$1,
      options_1;
    return __generator$1(this, function(_b) {
      switch (_b.label) {
        case 0:
          transformer = program.transformer ? require(path.join(process.cwd(), program.transformer)) : undefined;
          if (!program.file) return [3 /*break*/, 1];
          data = fs.readFileSync(path.join(process.cwd(), program.file), "utf-8");
          ext = path.parse(program.file).ext;
          format = [".yaml", ".yml"].includes(ext.toLowerCase()) ? "yaml" : "json";
          return [2 /*return*/, importOpenApi(data, format, transformer)];
        case 1:
          if (!program.github) return [3 /*break*/, 5];
          accessToken = void 0;
          githubTokenPath = path.join(__dirname, ".githubToken");
          if (!fs.existsSync(githubTokenPath)) return [3 /*break*/, 2];
          accessToken = fs.readFileSync(githubTokenPath, "utf-8");
          return [3 /*break*/, 4];
        case 2:
          return [
            4 /*yield*/,
            inquirer.prompt([
              {
                type: "input",
                name: "githubToken",
                message:
                  "Please provide a GitHub token with `repo` rules checked (https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)",
              },
              {
                type: "confirm",
                name: "saveToken",
                message: "Would you like to store your token for the next time? (stored in your node_modules)",
              },
            ]),
          ];
        case 3:
          answers = _b.sent();
          if (answers.saveToken) {
            fs.writeFileSync(githubTokenPath, answers.githubToken);
          }
          accessToken = answers.githubToken;
          _b.label = 4;
        case 4:
          (_a = __read$1(program.github.split(":"), 4)),
            (owner = _a[0]),
            (repo = _a[1]),
            (branch = _a[2]),
            (path$$1 = _a[3]);
          options_1 = {
            method: "POST",
            url: "https://api.github.com/graphql",
            headers: {
              "content-type": "application/json",
              "user-agent": "restful-react-importer",
              authorization: "bearer " + accessToken,
            },
            body: JSON.stringify({
              query:
                'query {\n          repository(name: "' +
                repo +
                '", owner: "' +
                owner +
                '") {\n            object(expression: "' +
                branch +
                ":" +
                path$$1 +
                '") {\n              ... on Blob {\n                text\n              }\n            }\n          }\n        }',
            }),
          };
          return [
            2 /*return*/,
            new Promise(function(resolve, reject) {
              request(options_1, function(error, _, body) {
                if (error) {
                  return reject(error);
                }
                var format =
                  program.github.toLowerCase().includes(".yaml") || program.github.toLowerCase().includes(".yml")
                    ? "yaml"
                    : "json";
                resolve(importOpenApi(JSON.parse(body).data.repository.object.text, format, transformer));
              });
            }),
          ];
        case 5:
          return [2 /*return*/, Promise.reject("Please provide a file (--file) or a github (--github) input")];
      }
    });
  });
})()
  .then(function(data) {
    fs.writeFileSync(path.join(process.cwd(), program.output), data);
    // tslint:disable-next-line:no-console
    console.log("\uD83C\uDF89 Your OpenAPI spec has been converted into ready to use restful-react components!");
  })
  .catch(function(err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  });
