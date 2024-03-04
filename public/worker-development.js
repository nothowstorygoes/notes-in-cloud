/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./worker/index.js":
/*!*************************!*\
  !*** ./worker/index.js ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("self.addEventListener(\"push\", (event)=>{\n    const data = event.data.json();\n    const options = {\n        body: data.body,\n        icon: data.icon,\n        badge: data.badge\n    };\n    event.waitUntil(self.registration.showNotification(data.title, options));\n});\nself.addEventListener(\"notificationclick\", (event)=>{\n    event.notification.close();\n    event.waitUntil(clients.openWindow(event.notification.data.url));\n});\nself.addEventListener(\"message\", (event)=>{\n    if (event.data && event.data.type === \"NOTIFICATION\") {\n        const { title, options } = event.data.payload;\n        event.waitUntil(self.registration.showNotification(title, options));\n    }\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi93b3JrZXIvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBRUFBLEtBQUtDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQ0M7SUFDN0IsTUFBTUMsT0FBT0QsTUFBTUMsSUFBSSxDQUFDQyxJQUFJO0lBQzVCLE1BQU1DLFVBQVU7UUFDZEMsTUFBTUgsS0FBS0csSUFBSTtRQUNmQyxNQUFNSixLQUFLSSxJQUFJO1FBQ2ZDLE9BQU9MLEtBQUtLLEtBQUs7SUFDbkI7SUFDQU4sTUFBTU8sU0FBUyxDQUFDVCxLQUFLVSxZQUFZLENBQUNDLGdCQUFnQixDQUFDUixLQUFLUyxLQUFLLEVBQUVQO0FBQ2pFO0FBRUFMLEtBQUtDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDQztJQUMxQ0EsTUFBTVcsWUFBWSxDQUFDQyxLQUFLO0lBQ3hCWixNQUFNTyxTQUFTLENBQUNNLFFBQVFDLFVBQVUsQ0FBQ2QsTUFBTVcsWUFBWSxDQUFDVixJQUFJLENBQUNjLEdBQUc7QUFDaEU7QUFHQWpCLEtBQUtDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQ0M7SUFDaEMsSUFBSUEsTUFBTUMsSUFBSSxJQUFJRCxNQUFNQyxJQUFJLENBQUNlLElBQUksS0FBSyxnQkFBZ0I7UUFDcEQsTUFBTSxFQUFFTixLQUFLLEVBQUVQLE9BQU8sRUFBRSxHQUFHSCxNQUFNQyxJQUFJLENBQUNnQixPQUFPO1FBQzdDakIsTUFBTU8sU0FBUyxDQUFDVCxLQUFLVSxZQUFZLENBQUNDLGdCQUFnQixDQUFDQyxPQUFPUDtJQUM1RDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3dvcmtlci9pbmRleC5qcz84MDVlIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdwdXNoJywgKGV2ZW50KSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGEuanNvbigpO1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBib2R5OiBkYXRhLmJvZHksXHJcbiAgICBpY29uOiBkYXRhLmljb24sXHJcbiAgICBiYWRnZTogZGF0YS5iYWRnZSxcclxuICB9O1xyXG4gIGV2ZW50LndhaXRVbnRpbChzZWxmLnJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKGRhdGEudGl0bGUsIG9wdGlvbnMpKTtcclxufSk7XHJcblxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ25vdGlmaWNhdGlvbmNsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgZXZlbnQubm90aWZpY2F0aW9uLmNsb3NlKCk7XHJcbiAgZXZlbnQud2FpdFVudGlsKGNsaWVudHMub3BlbldpbmRvdyhldmVudC5ub3RpZmljYXRpb24uZGF0YS51cmwpKTtcclxufSk7XHJcblxyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XHJcbiAgaWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS50eXBlID09PSAnTk9USUZJQ0FUSU9OJykge1xyXG4gICAgY29uc3QgeyB0aXRsZSwgb3B0aW9ucyB9ID0gZXZlbnQuZGF0YS5wYXlsb2FkO1xyXG4gICAgZXZlbnQud2FpdFVudGlsKHNlbGYucmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24odGl0bGUsIG9wdGlvbnMpKTtcclxuICB9XHJcbn0pOyJdLCJuYW1lcyI6WyJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZGF0YSIsImpzb24iLCJvcHRpb25zIiwiYm9keSIsImljb24iLCJiYWRnZSIsIndhaXRVbnRpbCIsInJlZ2lzdHJhdGlvbiIsInNob3dOb3RpZmljYXRpb24iLCJ0aXRsZSIsIm5vdGlmaWNhdGlvbiIsImNsb3NlIiwiY2xpZW50cyIsIm9wZW5XaW5kb3ciLCJ1cmwiLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./worker/index.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	!function() {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = function() {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: function(script) { return script; }
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	!function() {
/******/ 		__webpack_require__.ts = function(script) { return __webpack_require__.tt().createScript(script); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	!function() {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push(function(options) {
/******/ 			var originalFactory = options.factory;
/******/ 			options.factory = function(moduleObject, moduleExports, webpackRequire) {
/******/ 				var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				var cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : function() {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./worker/index.js");
/******/ 	
/******/ })()
;