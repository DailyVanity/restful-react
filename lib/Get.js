var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import * as qs from "qs";
import * as React from "react";
import RestfulReactProvider, { RestfulReactConsumer } from "./Context";
import { composePath, composeUrl } from "./util/composeUrl";
import { processResponse } from "./util/processResponse";
import { resolveData } from "./util/resolveData";
/**
 * The <Get /> component without Context. This
 * is a named class because it is useful in
 * debugging.
 */
var ContextlessGet = /** @class */ (function(_super) {
  __extends(ContextlessGet, _super);
  function ContextlessGet(props) {
    var _this = _super.call(this, props) || this;
    /**
     * Abort controller to cancel the current fetch query
     */
    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;
    _this.state = {
      data: null,
      response: null,
      loading: !_this.props.lazy,
      error: null,
    };
    _this.getRequestOptions = function(extraOptions, extraHeaders) {
      var requestOptions = _this.props.requestOptions;
      if (typeof requestOptions === "function") {
        return __assign({}, extraOptions, requestOptions(), {
          headers: new Headers(
            __assign(
              {},
              typeof extraHeaders !== "boolean" ? extraHeaders : {},
              (extraOptions || {}).headers,
              (requestOptions() || {}).headers,
            ),
          ),
        });
      }
      return __assign({}, extraOptions, requestOptions, {
        headers: new Headers(
          __assign(
            {},
            typeof extraHeaders !== "boolean" ? extraHeaders : {},
            (extraOptions || {}).headers,
            (requestOptions || {}).headers,
          ),
        ),
      });
    };
    _this.fetch = function(requestPath, thisRequestOptions) {
      return __awaiter(_this, void 0, void 0, function() {
        var _a,
          base,
          __internal_hasExplicitBase,
          parentPath,
          path,
          resolve,
          makeRequestPath,
          request,
          response,
          _b,
          data,
          responseError,
          error,
          resolved,
          e_1;
        var _this = this;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              (_a = this.props),
                (base = _a.base),
                (__internal_hasExplicitBase = _a.__internal_hasExplicitBase),
                (parentPath = _a.parentPath),
                (path = _a.path),
                (resolve = _a.resolve);
              if (this.state.error || !this.state.loading) {
                this.setState(function() {
                  return { error: null, loading: true };
                });
              }
              makeRequestPath = function() {
                var url;
                if (__internal_hasExplicitBase) {
                  url = composeUrl(base, "", path || "");
                } else {
                  url = composeUrl(base, parentPath, requestPath || path || "");
                }
                if (_this.props.queryParams) {
                  url += "?" + qs.stringify(_this.props.queryParams);
                }
                return url;
              };
              request = new Request(makeRequestPath(), this.getRequestOptions(thisRequestOptions));
              _c.label = 1;
            case 1:
              _c.trys.push([1, 5, , 6]);
              return [4 /*yield*/, fetch(request, { signal: this.signal })];
            case 2:
              response = _c.sent();
              return [4 /*yield*/, processResponse(response)];
            case 3:
              (_b = _c.sent()), (data = _b.data), (responseError = _b.responseError);
              // avoid state updates when component has been unmounted
              if (this.signal.aborted) {
                return [2 /*return*/];
              }
              if (!response.ok || responseError) {
                error = {
                  message:
                    "Failed to fetch: " +
                    response.status +
                    " " +
                    response.statusText +
                    (responseError ? " - " + data : ""),
                  data: data,
                  status: response.status,
                };
                this.setState({
                  loading: false,
                  error: error,
                });
                if (!this.props.localErrorOnly && this.props.onError) {
                  this.props.onError(
                    error,
                    function() {
                      return _this.fetch(requestPath, thisRequestOptions);
                    },
                    response,
                  );
                }
                return [2 /*return*/, null];
              }
              return [4 /*yield*/, resolveData({ data: data, resolve: resolve })];
            case 4:
              resolved = _c.sent();
              this.setState({ loading: false, data: resolved.data, error: resolved.error, response: response });
              return [2 /*return*/, data];
            case 5:
              e_1 = _c.sent();
              this.setState({
                loading: false,
                error: {
                  message: "Failed to fetch: " + e_1.message,
                  data: e_1,
                },
              });
              return [3 /*break*/, 6];
            case 6:
              return [2 /*return*/];
          }
        });
      });
    };
    if (typeof props.debounce === "object") {
      _this.fetch = debounce(_this.fetch, props.debounce.wait, props.debounce.options);
    } else if (typeof props.debounce === "number") {
      _this.fetch = debounce(_this.fetch, props.debounce);
    } else if (props.debounce) {
      _this.fetch = debounce(_this.fetch);
    }
    return _this;
  }
  ContextlessGet.prototype.componentDidMount = function() {
    if (!this.props.lazy) {
      this.fetch();
    }
  };
  ContextlessGet.prototype.componentDidUpdate = function(prevProps) {
    var base = prevProps.base,
      parentPath = prevProps.parentPath,
      path = prevProps.path,
      resolve = prevProps.resolve,
      queryParams = prevProps.queryParams;
    if (
      base !== this.props.base ||
      parentPath !== this.props.parentPath ||
      path !== this.props.path ||
      !isEqual(queryParams, this.props.queryParams) ||
      // both `resolve` props need to _exist_ first, and then be equivalent.
      (resolve && this.props.resolve && resolve.toString() !== this.props.resolve.toString())
    ) {
      if (!this.props.lazy) {
        this.fetch();
      }
    }
  };
  ContextlessGet.prototype.componentWillUnmount = function() {
    this.abortController.abort();
  };
  ContextlessGet.prototype.render = function() {
    var _a = this.props,
      children = _a.children,
      wait = _a.wait,
      path = _a.path,
      base = _a.base,
      parentPath = _a.parentPath;
    var _b = this.state,
      data = _b.data,
      error = _b.error,
      loading = _b.loading,
      response = _b.response;
    if (wait && data === null && !error) {
      return React.createElement(React.Fragment, null); // Show nothing until we have data.
    }
    return children(
      data,
      { loading: loading, error: error },
      { refetch: this.fetch },
      { response: response, absolutePath: composeUrl(base, parentPath, path) },
    );
  };
  ContextlessGet.defaultProps = {
    base: "",
    parentPath: "",
    resolve: function(unresolvedData) {
      return unresolvedData;
    },
  };
  return ContextlessGet;
})(React.Component);
/**
 * The <Get /> component _with_ context.
 * Context is used to compose path props,
 * and to maintain the base property against
 * which all requests will be made.
 *
 * We compose Consumers immediately with providers
 * in order to provide new `parentPath` props that contain
 * a segment of the path, creating composable URLs.
 */
function Get(props) {
  return React.createElement(RestfulReactConsumer, null, function(contextProps) {
    return React.createElement(
      RestfulReactProvider,
      __assign({}, contextProps, { parentPath: composePath(contextProps.parentPath, props.path) }),
      React.createElement(
        ContextlessGet,
        __assign({}, contextProps, props, { __internal_hasExplicitBase: Boolean(props.base) }),
      ),
    );
  });
}
export default Get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dldC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLG9CQUFvQixFQUFFLEVBQWlCLG9CQUFvQixFQUE2QixNQUFNLFdBQVcsQ0FBQztBQUNqSCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFrSWpEOzs7O0dBSUc7QUFDSDtJQUEwRCxrQ0FHekQ7SUFDQyx3QkFBWSxLQUE0RDtRQUF4RSxZQUNFLGtCQUFNLEtBQUssQ0FBQyxTQVNiO1FBRUQ7O1dBRUc7UUFDSyxxQkFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDeEMsWUFBTSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRTdCLFdBQUssR0FBc0M7WUFDekQsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFrQ0ssdUJBQWlCLEdBQUcsVUFDekIsWUFBbUMsRUFDbkMsWUFBa0Q7WUFFMUMsSUFBQSwyQ0FBYyxDQUFnQjtZQUV0QyxJQUFJLE9BQU8sY0FBYyxLQUFLLFVBQVUsRUFBRTtn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
