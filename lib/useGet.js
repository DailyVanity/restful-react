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
import debounce from "lodash/debounce";
import merge from "lodash/merge";
import qs from "qs";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import url from "url";
import { Context } from "./Context";
import { processResponse } from "./util/processResponse";
import { useDeepCompareEffect } from "./util/useDeepCompareEffect";
function _fetchData(props, state, setState, context, abortController) {
  return __awaiter(this, void 0, void 0, function() {
    var _a,
      base,
      path,
      _b,
      resolve,
      queryParams,
      signal,
      requestOptions,
      contextRequestOptions,
      request,
      response,
      _c,
      data,
      responseError,
      error,
      e_1;
    return __generator(this, function(_d) {
      switch (_d.label) {
        case 0:
          (_a = props.base),
            (base = _a === void 0 ? context.base : _a),
            (path = props.path),
            (_b = props.resolve),
            (resolve =
              _b === void 0
                ? function(d) {
                    return d;
                  }
                : _b),
            (queryParams = props.queryParams);
          if (state.loading) {
            // Abort previous requests
            abortController.current.abort();
            abortController.current = new AbortController();
          }
          signal = abortController.current.signal;
          if (state.error || !state.loading) {
            setState(__assign({}, state, { error: null, loading: true }));
          }
          requestOptions =
            (typeof props.requestOptions === "function" ? props.requestOptions() : props.requestOptions) || {};
          contextRequestOptions =
            (typeof context.requestOptions === "function" ? context.requestOptions() : context.requestOptions) || {};
          request = new Request(
            url.resolve(base, queryParams ? path + "?" + qs.stringify(queryParams) : path),
            merge(contextRequestOptions, requestOptions, { signal: signal }),
          );
          _d.label = 1;
        case 1:
          _d.trys.push([1, 4, , 5]);
          return [4 /*yield*/, fetch(request)];
        case 2:
          response = _d.sent();
          return [4 /*yield*/, processResponse(response)];
        case 3:
          (_c = _d.sent()), (data = _c.data), (responseError = _c.responseError);
          if (signal.aborted) {
            return [2 /*return*/];
          } else if (!response.ok || responseError) {
            error = {
              message:
                "Failed to fetch: " + response.status + " " + response.statusText + (responseError ? " - " + data : ""),
              data: data,
              status: response.status,
            };
            setState(__assign({}, state, { loading: false, error: error }));
            if (!props.localErrorOnly && context.onError) {
              context.onError(
                error,
                function() {
                  return _fetchData(props, state, setState, context, abortController);
                },
                response,
              );
            }
          } else {
            setState(__assign({}, state, { loading: false, data: resolve(data) }));
          }
          return [3 /*break*/, 5];
        case 4:
          e_1 = _d.sent();
          setState(
            __assign({}, state, {
              loading: false,
              error: {
                message: "Failed to fetch: " + e_1.message,
                data: e_1.message,
              },
            }),
          );
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
var isCancellable = function(func) {
  return typeof func.cancel === "function" && typeof func.flush === "function";
};
export function useGet() {
  var props = typeof arguments[0] === "object" ? arguments[0] : __assign({}, arguments[1], { path: arguments[0] });
  var context = useContext(Context);
  var fetchData = useCallback(
    typeof props.debounce === "object"
      ? debounce(_fetchData, props.debounce.wait, props.debounce.options)
      : typeof props.debounce === "number"
      ? debounce(_fetchData, props.debounce)
      : props.debounce
      ? debounce(_fetchData)
      : _fetchData,
    [props.debounce],
  );
  // Cancel fetchData on unmount (if debounce)
  useEffect(
    function() {
      return isCancellable(fetchData)
        ? function() {
            return fetchData.cancel();
          }
        : undefined;
    },
    [fetchData],
  );
  var _a = __read(
      useState({
        data: null,
        response: null,
        loading: !props.lazy,
        error: null,
      }),
      2,
    ),
    state = _a[0],
    setState = _a[1];
  var abortController = useRef(new AbortController());
  useDeepCompareEffect(
    function() {
      if (!props.lazy) {
        fetchData(props, state, setState, context, abortController);
      }
      return function() {
        abortController.current.abort();
        abortController.current = new AbortController();
      };
    },
    [props.path, props.base, props.resolve, props.queryParams],
  );
  return __assign({}, state, {
    absolutePath: url.resolve(
      props.base || context.base,
      props.queryParams ? props.path + "?" + qs.stringify(props.queryParams) : props.path,
    ),
    cancel: function() {
      setState(__assign({}, state, { loading: false }));
      abortController.current.abort();
      abortController.current = new AbortController();
    },
    refetch: function(options) {
      if (options === void 0) {
        options = {};
      }
      return fetchData(__assign({}, props, options), state, setState, context, abortController);
    },
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlR2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZUdldC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzdFLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQztBQUV0QixPQUFPLEVBQUUsT0FBTyxFQUE2QixNQUFNLFdBQVcsQ0FBQztBQUUvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFnRG5FLFNBQWUsVUFBVSxDQUN2QixLQUF1QyxFQUN2QyxLQUE4QixFQUM5QixRQUFxRCxFQUNyRCxPQUFrQyxFQUNsQyxlQUF3RDs7Ozs7O29CQUVoRCxLQUE2RSxLQUFLLEtBQS9ELEVBQW5CLElBQUksbUJBQUcsT0FBTyxDQUFDLElBQUksS0FBQSxFQUFFLElBQUksR0FBb0QsS0FBSyxLQUF6RCxFQUFFLEtBQWtELEtBQUssUUFBdkIsRUFBaEMsT0FBTyxtQkFBRyxVQUFDLENBQU0sSUFBSyxPQUFBLENBQVUsRUFBVixDQUFVLEtBQUEsRUFBRSxXQUFXLEdBQUssS0FBSyxZQUFWLENBQVc7b0JBRTNGLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTt3QkFDakIsMEJBQTBCO3dCQUMxQixlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNoQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUks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
