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
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
  };
import noop from "lodash/noop";
import * as React from "react";
export var Context = React.createContext({
  base: "",
  parentPath: "",
  resolve: function(data) {
    return data;
  },
  requestOptions: {},
  onError: noop,
});
var RestfulReactProvider = /** @class */ (function(_super) {
  __extends(RestfulReactProvider, _super);
  function RestfulReactProvider() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  RestfulReactProvider.prototype.render = function() {
    var _a = this.props,
      children = _a.children,
      value = __rest(_a, ["children"]);
    return React.createElement(
      Context.Provider,
      {
        value: __assign(
          {
            onError: noop,
            resolve: function(data) {
              return data;
            },
            requestOptions: {},
            parentPath: "",
          },
          value,
        ),
      },
      children,
    );
  };
  return RestfulReactProvider;
})(React.Component);
export default RestfulReactProvider;
export var RestfulReactConsumer = Context.Consumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db250ZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFDL0IsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUE4Qi9CLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFzQztJQUM5RSxJQUFJLEVBQUUsRUFBRTtJQUNSLFVBQVUsRUFBRSxFQUFFO0lBQ2QsT0FBTyxFQUFFLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUk7SUFDNUIsY0FBYyxFQUFFLEVBQUU7SUFDbEIsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFNSDtJQUFxRCx3Q0FBNkM7SUFBbEc7O0lBaUJBLENBQUM7SUFoQlEscUNBQU0sR0FBYjtRQUNFLElBQU0sZUFBbUMsRUFBakMsc0JBQVEsRUFBRSxnQ0FBdUIsQ0FBQztRQUMxQyxPQUFPLENBQ0wsb0JBQUMsT0FBTyxDQUFDLFFBQVEsSUFDZixLQUFLLGFBQ0gsT0FBTyxFQUFFLElBQUksRUFDYixPQUFPLEVBQUUsVUFBQyxJQUFTLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUM1QixjQUFjLEVBQUUsRUFBRSxFQUNsQixVQUFVLEVBQUUsRUFBRSxJQUNYLEtBQUssS0FHVCxRQUFRLENBQ1EsQ0FDcEIsQ0FBQztJQUNKLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBcUQsS0FBSyxDQUFDLFNBQVMsR0FpQm5FOztBQUVELE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMifQ==
