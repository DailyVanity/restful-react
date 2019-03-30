import url from "url";
export var composeUrl = function(base, parentPath, path) {
  if (base === void 0) {
    base = "";
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  if (path === void 0) {
    path = "";
  }
  var composedPath = composePath(parentPath, path);
  /* If the base contains a trailing slash, it will be trimmed during composition */
  return base.endsWith("/") ? "" + base.slice(0, -1) + composedPath : "" + base + composedPath;
};
/**
 * If the path starts with slash, it is considered as absolute url.
 * If not, it is considered as relative url.
 * For example,
 * parentPath = "/someBasePath" and path = "/absolute" resolves to "/absolute"
 * whereas,
 * parentPath = "/someBasePath" and path = "relative" resolves to "/someBasePath/relative"
 */
export var composePath = function(parentPath, path) {
  if (parentPath === void 0) {
    parentPath = "";
  }
  if (path === void 0) {
    path = "";
  }
  if (path.startsWith("/") && path.length > 1) {
    return url.resolve(parentPath, path);
  } else if (path !== "" && path !== "/") {
    return parentPath + "/" + path;
  } else {
    return parentPath;
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZVVybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2NvbXBvc2VVcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBRXRCLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxVQUFDLElBQWlCLEVBQUUsVUFBdUIsRUFBRSxJQUFpQjtJQUE3RCxxQkFBQSxFQUFBLFNBQWlCO0lBQUUsMkJBQUEsRUFBQSxlQUF1QjtJQUFFLHFCQUFBLEVBQUEsU0FBaUI7SUFDdEYsSUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRCxrRkFBa0Y7SUFDbEYsT0FBTyxJQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLElBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBYyxDQUFDLENBQUMsQ0FBQyxLQUFHLElBQUksR0FBRyxZQUFjLENBQUM7QUFDakcsQ0FBQyxDQUFDO0FBRUY7Ozs7Ozs7R0FPRztBQUNILE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxVQUFDLFVBQXVCLEVBQUUsSUFBaUI7SUFBMUMsMkJBQUEsRUFBQSxlQUF1QjtJQUFFLHFCQUFBLEVBQUEsU0FBaUI7SUFDcEUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQzNDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDdEM7U0FBTSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUN0QyxPQUFVLFVBQVUsU0FBSSxJQUFNLENBQUM7S0FDaEM7U0FBTTtRQUNMLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0FBQ0gsQ0FBQyxDQUFDIn0=
