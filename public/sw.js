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

/***/ "./public/worker/index.js":
/*!********************************!*\
  !*** ./public/worker/index.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("// sw.js\n// Import Workbox\nimportScripts(\"https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js\");\n// Use Workbox to precache assets\nworkbox.precaching.precacheAndRoute([]);\n// Additional service worker code...\nself.addEventListener(\"push\", (event)=>{\n    const data = event.data.json();\n    const options = {\n        body: data.body,\n        icon: data.icon,\n        badge: data.badge\n    };\n    event.waitUntil(self.registration.showNotification(data.title, options));\n});\nself.addEventListener(\"notificationclick\", (event)=>{\n    event.notification.close();\n    event.waitUntil(clients.openWindow(event.notification.data.url));\n});\n// Listen for messages from the client\nself.addEventListener(\"message\", (event)=>{\n    if (event.data && event.data.type === \"NOTIFICATION\") {\n        const { title, options } = event.data.payload;\n        event.waitUntil(self.registration.showNotification(title, options));\n    }\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvd29ya2VyL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBLFFBQVE7QUFDUixpQkFBaUI7QUFDakJBLGNBQWM7QUFFZCxpQ0FBaUM7QUFDakNDLFFBQVFDLFVBQVUsQ0FBQ0MsZ0JBQWdCLENBQUNDLEtBQUtDLGFBQWE7QUFFdEQsb0NBQW9DO0FBRXBDRCxLQUFLRSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUNDO0lBQzdCLE1BQU1DLE9BQU9ELE1BQU1DLElBQUksQ0FBQ0MsSUFBSTtJQUM1QixNQUFNQyxVQUFVO1FBQ2RDLE1BQU1ILEtBQUtHLElBQUk7UUFDZkMsTUFBTUosS0FBS0ksSUFBSTtRQUNmQyxPQUFPTCxLQUFLSyxLQUFLO0lBQ25CO0lBQ0FOLE1BQU1PLFNBQVMsQ0FBQ1YsS0FBS1csWUFBWSxDQUFDQyxnQkFBZ0IsQ0FBQ1IsS0FBS1MsS0FBSyxFQUFFUDtBQUNqRTtBQUVBTixLQUFLRSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQ0M7SUFDMUNBLE1BQU1XLFlBQVksQ0FBQ0MsS0FBSztJQUN4QlosTUFBTU8sU0FBUyxDQUFDTSxRQUFRQyxVQUFVLENBQUNkLE1BQU1XLFlBQVksQ0FBQ1YsSUFBSSxDQUFDYyxHQUFHO0FBQ2hFO0FBRUEsc0NBQXNDO0FBQ3RDbEIsS0FBS0UsZ0JBQWdCLENBQUMsV0FBVyxDQUFDQztJQUNoQyxJQUFJQSxNQUFNQyxJQUFJLElBQUlELE1BQU1DLElBQUksQ0FBQ2UsSUFBSSxLQUFLLGdCQUFnQjtRQUNwRCxNQUFNLEVBQUVOLEtBQUssRUFBRVAsT0FBTyxFQUFFLEdBQUdILE1BQU1DLElBQUksQ0FBQ2dCLE9BQU87UUFDN0NqQixNQUFNTyxTQUFTLENBQUNWLEtBQUtXLFlBQVksQ0FBQ0MsZ0JBQWdCLENBQUNDLE9BQU9QO0lBQzVEO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcHVibGljL3dvcmtlci9pbmRleC5qcz9mZDhkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHN3LmpzXHJcbi8vIEltcG9ydCBXb3JrYm94XHJcbmltcG9ydFNjcmlwdHMoJ2h0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS93b3JrYm94LWNkbi9yZWxlYXNlcy82LjEuNS93b3JrYm94LXN3LmpzJyk7XHJcblxyXG4vLyBVc2UgV29ya2JveCB0byBwcmVjYWNoZSBhc3NldHNcclxud29ya2JveC5wcmVjYWNoaW5nLnByZWNhY2hlQW5kUm91dGUoc2VsZi5fX1dCX01BTklGRVNUKTtcclxuXHJcbi8vIEFkZGl0aW9uYWwgc2VydmljZSB3b3JrZXIgY29kZS4uLlxyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdwdXNoJywgKGV2ZW50KSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGEuanNvbigpO1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBib2R5OiBkYXRhLmJvZHksXHJcbiAgICBpY29uOiBkYXRhLmljb24sXHJcbiAgICBiYWRnZTogZGF0YS5iYWRnZSxcclxuICB9O1xyXG4gIGV2ZW50LndhaXRVbnRpbChzZWxmLnJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKGRhdGEudGl0bGUsIG9wdGlvbnMpKTtcclxufSk7XHJcblxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ25vdGlmaWNhdGlvbmNsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgZXZlbnQubm90aWZpY2F0aW9uLmNsb3NlKCk7XHJcbiAgZXZlbnQud2FpdFVudGlsKGNsaWVudHMub3BlbldpbmRvdyhldmVudC5ub3RpZmljYXRpb24uZGF0YS51cmwpKTtcclxufSk7XHJcblxyXG4vLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIGZyb20gdGhlIGNsaWVudFxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcclxuICBpZiAoZXZlbnQuZGF0YSAmJiBldmVudC5kYXRhLnR5cGUgPT09ICdOT1RJRklDQVRJT04nKSB7XHJcbiAgICBjb25zdCB7IHRpdGxlLCBvcHRpb25zIH0gPSBldmVudC5kYXRhLnBheWxvYWQ7XHJcbiAgICBldmVudC53YWl0VW50aWwoc2VsZi5yZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbih0aXRsZSwgb3B0aW9ucykpO1xyXG4gIH1cclxufSk7Il0sIm5hbWVzIjpbImltcG9ydFNjcmlwdHMiLCJ3b3JrYm94IiwicHJlY2FjaGluZyIsInByZWNhY2hlQW5kUm91dGUiLCJzZWxmIiwiX19XQl9NQU5JRkVTVCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImRhdGEiLCJqc29uIiwib3B0aW9ucyIsImJvZHkiLCJpY29uIiwiYmFkZ2UiLCJ3YWl0VW50aWwiLCJyZWdpc3RyYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwidGl0bGUiLCJub3RpZmljYXRpb24iLCJjbG9zZSIsImNsaWVudHMiLCJvcGVuV2luZG93IiwidXJsIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/worker/index.js\n"));

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
/******/ 	var __webpack_exports__ = __webpack_require__("./public/worker/index.js");
/******/ 	
/******/ })()
;