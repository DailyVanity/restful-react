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
var _this = this;
export var resolveData = function(_a) {
  var data = _a.data,
    resolve = _a.resolve;
  return __awaiter(_this, void 0, void 0, function() {
    var resolvedData, resolveError, resolvedDataOrPromise, _b, err_1;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          resolvedData = null;
          resolveError = null;
          _c.label = 1;
        case 1:
          _c.trys.push([1, 7, , 8]);
          if (!resolve) return [3 /*break*/, 5];
          resolvedDataOrPromise = resolve(data);
          if (!resolvedDataOrPromise.then) return [3 /*break*/, 3];
          return [4 /*yield*/, resolvedDataOrPromise];
        case 2:
          _b = _c.sent();
          return [3 /*break*/, 4];
        case 3:
          _b = resolvedDataOrPromise;
          _c.label = 4;
        case 4:
          resolvedData = _b;
          return [3 /*break*/, 6];
        case 5:
          resolvedData = data;
          _c.label = 6;
        case 6:
          return [3 /*break*/, 8];
        case 7:
          err_1 = _c.sent();
          resolvedData = null;
          resolveError = {
            message: "RESOLVE_ERROR",
            data: JSON.stringify(err_1),
          };
          return [3 /*break*/, 8];
        case 8:
          return [
            2 /*return*/,
            {
              data: resolvedData,
              error: resolveError,
            },
          ];
      }
    });
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9yZXNvbHZlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQWdDQTtBQTlCQSxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsVUFBc0IsRUFNaEQ7UUFMQyxjQUFJLEVBQ0osb0JBQU87Ozs7OztvQkFLSCxZQUFZLEdBQWlCLElBQUksQ0FBQztvQkFDbEMsWUFBWSxHQUFnQyxJQUFJLENBQUM7Ozs7eUJBRS9DLE9BQU8sRUFBUCx3QkFBTztvQkFDSCxxQkFBcUIsR0FBMkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNwRCxxQkFBd0MsQ0FBQyxJQUFJLEVBQTlDLHdCQUE4QztvQkFDdkQscUJBQU0scUJBQXFCLEVBQUE7O29CQUE3QixLQUFDLENBQUMsU0FBMkIsQ0FBVyxDQUFBOzs7b0JBQ3hDLEtBQUMscUJBQStCLENBQUE7OztvQkFGcEMsWUFBWSxLQUV3QixDQUFDOzs7b0JBRXJDLFlBQVksR0FBRyxJQUFJLENBQUM7Ozs7O29CQUd0QixZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUNwQixZQUFZLEdBQUc7d0JBQ2IsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUcsQ0FBQztxQkFDMUIsQ0FBQzs7d0JBRUosc0JBQU87d0JBQ0wsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLEtBQUssRUFBRSxZQUFZO3FCQUNwQixFQUFDOzs7O0NBQ0gsQ0FBQyJ9
