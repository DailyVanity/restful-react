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
import * as qs from "qs";
import * as React from "react";
import equal from "react-fast-compare";
import { RestfulReactConsumer } from "./Context";
import { composeUrl } from "./util/composeUrl";
import { processResponse } from "./util/processResponse";
/**
 * The <Poll /> component without context.
 */
var ContextlessPoll = /** @class */ (function(_super) {
  __extends(ContextlessPoll, _super);
  function ContextlessPoll() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      data: null,
      previousData: null,
      loading: !_this.props.lazy,
      lastResponse: null,
      polling: !_this.props.lazy,
      finished: false,
      error: null,
    };
    _this.keepPolling = !_this.props.lazy;
    /**
     * Abort controller to cancel the current fetch query
     */
    _this.abortController = new AbortController();
    _this.signal = _this.abortController.signal;
    _this.isModified = function(response, nextData) {
      if (response.status === 304) {
        return false;
      }
      if (equal(_this.state.data, nextData)) {
        return false;
      }
      return true;
    };
    _this.getRequestOptions = function() {
      return typeof _this.props.requestOptions === "function"
        ? _this.props.requestOptions()
        : _this.props.requestOptions || {};
    };
    // 304 is not a OK status code but is green in Chrome 🤦🏾‍♂️
    _this.isResponseOk = function(response) {
      return response.ok || response.status === 304;
    };
    /**
     * This thing does the actual poll.
     */
    _this.cycle = function() {
      return __awaiter(_this, void 0, void 0, function() {
        var _a,
          base,
          path,
          interval,
          wait,
          lastPollIndex,
          requestOptions,
          url,
          request,
          response_1,
          _b,
          data_1,
          responseError,
          error,
          e_1;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              // Have we stopped?
              if (!this.keepPolling) {
                return [2 /*return*/]; // stop.
              }
              if (!(this.props.until && this.props.until(this.state.data, this.state.lastResponse)))
                return [3 /*break*/, 2];
              return [4 /*yield*/, this.stop()];
            case 1:
              _c.sent(); // stop.
              return [2 /*return*/];
            case 2:
              (_a = this.props), (base = _a.base), (path = _a.path), (interval = _a.interval), (wait = _a.wait);
              lastPollIndex = this.state.lastPollIndex;
              requestOptions = this.getRequestOptions();
              url = composeUrl(base, "", path);
              if (this.props.queryParams) {
                url += "?" + qs.stringify(this.props.queryParams);
              }
              request = new Request(
                url,
                __assign({}, requestOptions, {
                  headers: __assign(
                    { Prefer: "wait=" + wait + "s;" + (lastPollIndex ? "index=" + lastPollIndex : "") },
                    requestOptions.headers,
                  ),
                }),
              );
              _c.label = 3;
            case 3:
              _c.trys.push([3, 7, , 8]);
              return [4 /*yield*/, fetch(request, { signal: this.signal })];
            case 4:
              response_1 = _c.sent();
              return [4 /*yield*/, processResponse(response_1)];
            case 5:
              (_b = _c.sent()), (data_1 = _b.data), (responseError = _b.responseError);
              if (!this.keepPolling || this.signal.aborted) {
                // Early return if we have stopped polling or component was unmounted
                // to avoid memory leaks
                return [2 /*return*/];
              }
              if (!this.isResponseOk(response_1) || responseError) {
                error = {
                  message:
                    "Failed to poll: " +
                    response_1.status +
                    " " +
                    response_1.statusText +
                    (responseError ? " - " + data_1 : ""),
                  data: data_1,
                  status: response_1.status,
                };
                this.setState({ loading: false, lastResponse: response_1, error: error });
                if (!this.props.localErrorOnly && this.props.onError) {
                  this.props.onError(
                    error,
                    function() {
                      return Promise.resolve();
                    },
                    response_1,
                  );
                }
              } else if (this.isModified(response_1, data_1)) {
                this.setState(function(prevState) {
                  return {
                    loading: false,
                    lastResponse: response_1,
                    previousData: prevState.data,
                    data: data_1,
                    error: null,
                    lastPollIndex: response_1.headers.get("x-polling-index") || undefined,
                  };
                });
              }
              // Wait for interval to pass.
              return [
                4 /*yield*/,
                new Promise(function(resolvePromise) {
                  return setTimeout(resolvePromise, interval);
                }),
              ];
            case 6:
              // Wait for interval to pass.
              _c.sent();
              this.cycle(); // Do it all again!
              return [3 /*break*/, 8];
            case 7:
              e_1 = _c.sent();
              return [3 /*break*/, 8];
            case 8:
              return [2 /*return*/];
          }
        });
      });
    };
    _this.start = function() {
      _this.keepPolling = true;
      if (!_this.state.polling) {
        _this.setState(function() {
          return { polling: true };
        }); // let everyone know we're done here.
      }
      _this.cycle();
    };
    _this.stop = function() {
      _this.keepPolling = false;
      _this.setState(function() {
        return { polling: false, finished: true };
      }); // let everyone know we're done here.
    };
    return _this;
  }
  ContextlessPoll.prototype.componentDidMount = function() {
    var _a = this.props,
      path = _a.path,
      lazy = _a.lazy;
    if (path === undefined) {
      throw new Error(
        '[restful-react]: You\'re trying to poll something without a path. Please specify a "path" prop on your Poll component.',
      );
    }
    if (!lazy) {
      this.start();
    }
  };
  ContextlessPoll.prototype.componentWillUnmount = function() {
    // Cancel the current query
    this.abortController.abort();
    // Stop the polling cycle
    this.stop();
  };
  ContextlessPoll.prototype.render = function() {
    var _a = this.state,
      response = _a.lastResponse,
      previousData = _a.previousData,
      data = _a.data,
      polling = _a.polling,
      loading = _a.loading,
      error = _a.error,
      finished = _a.finished;
    var _b = this.props,
      children = _b.children,
      base = _b.base,
      path = _b.path,
      resolve = _b.resolve;
    var meta = {
      response: response,
      absolutePath: composeUrl(base, "", path),
    };
    var states = {
      polling: polling,
      loading: loading,
      error: error,
      finished: finished,
    };
    var actions = {
      stop: this.stop,
      start: this.start,
    };
    // data is parsed only when poll has already resolved so response is defined
    var resolvedData = response && resolve ? resolve(data, previousData) : data;
    return children(resolvedData, states, actions, meta);
  };
  ContextlessPoll.defaultProps = {
    interval: 1000,
    wait: 60,
    base: "",
    resolve: function(data) {
      return data;
    },
  };
  return ContextlessPoll;
})(React.Component);
function Poll(props) {
  // Compose Contexts to allow for URL nesting
  return React.createElement(RestfulReactConsumer, null, function(contextProps) {
    return React.createElement(
      ContextlessPoll,
      __assign({}, contextProps, props, {
        requestOptions: __assign({}, contextProps.requestOptions, props.requestOptions),
      }),
    );
  });
}
export default Poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Qb2xsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxNQUFNLG9CQUFvQixDQUFDO0FBRXZDLE9BQU8sRUFBaUIsb0JBQW9CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWtKekQ7O0dBRUc7QUFDSDtJQUEyRCxtQ0FHMUQ7SUFIRDtRQUFBLHFFQWlMQztRQTdLaUIsV0FBSyxHQUF1QztZQUMxRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFlBQVksRUFBRSxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUN6QixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDekIsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFTTSxpQkFBVyxHQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFdkM7O1dBRUc7UUFDSyxxQkFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDeEMsWUFBTSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRXJDLGdCQUFVLEdBQUcsVUFBQyxRQUFrQixFQUFFLFFBQWU7WUFDdkQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDM0IsT0FBTyxL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
