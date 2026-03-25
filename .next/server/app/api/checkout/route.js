"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/checkout/route";
exports.ids = ["app/api/checkout/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcheckout%2Froute&page=%2Fapi%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcheckout%2Froute.ts&appDir=%2FUsers%2Fvpkartsistanbulhair%2FDocuments%2FTestTestTest-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvpkartsistanbulhair%2FDocuments%2FTestTestTest-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcheckout%2Froute&page=%2Fapi%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcheckout%2Froute.ts&appDir=%2FUsers%2Fvpkartsistanbulhair%2FDocuments%2FTestTestTest-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvpkartsistanbulhair%2FDocuments%2FTestTestTest-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_vpkartsistanbulhair_Documents_TestTestTest_main_app_api_checkout_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/checkout/route.ts */ \"(rsc)/./app/api/checkout/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/checkout/route\",\n        pathname: \"/api/checkout\",\n        filename: \"route\",\n        bundlePath: \"app/api/checkout/route\"\n    },\n    resolvedPagePath: \"/Users/vpkartsistanbulhair/Documents/TestTestTest-main/app/api/checkout/route.ts\",\n    nextConfigOutput,\n    userland: _Users_vpkartsistanbulhair_Documents_TestTestTest_main_app_api_checkout_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/checkout/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjaGVja291dCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY2hlY2tvdXQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjaGVja291dCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnZwa2FydHNpc3RhbmJ1bGhhaXIlMkZEb2N1bWVudHMlMkZUZXN0VGVzdFRlc3QtbWFpbiUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZ2cGthcnRzaXN0YW5idWxoYWlyJTJGRG9jdW1lbnRzJTJGVGVzdFRlc3RUZXN0LW1haW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2dDO0FBQzdHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtZXhhbXBsZS8/MGNkYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvdnBrYXJ0c2lzdGFuYnVsaGFpci9Eb2N1bWVudHMvVGVzdFRlc3RUZXN0LW1haW4vYXBwL2FwaS9jaGVja291dC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY2hlY2tvdXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jaGVja291dFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY2hlY2tvdXQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvdnBrYXJ0c2lzdGFuYnVsaGFpci9Eb2N1bWVudHMvVGVzdFRlc3RUZXN0LW1haW4vYXBwL2FwaS9jaGVja291dC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvY2hlY2tvdXQvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcheckout%2Froute&page=%2Fapi%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcheckout%2Froute.ts&appDir=%2FUsers%2Fvpkartsistanbulhair%2FDocuments%2FTestTestTest-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvpkartsistanbulhair%2FDocuments%2FTestTestTest-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/checkout/route.ts":
/*!***********************************!*\
  !*** ./app/api/checkout/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/stripe */ \"(rsc)/./lib/stripe.ts\");\n\n\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { productId, priceEur, productName, locale } = body;\n        if (!productId || !priceEur || !productName || !locale) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Missing required fields\"\n            }, {\n                status: 400\n            });\n        }\n        const appUrl = \"http://localhost:3000\" || 0;\n        const session = await _lib_stripe__WEBPACK_IMPORTED_MODULE_1__.stripe.checkout.sessions.create({\n            mode: \"subscription\",\n            line_items: [\n                {\n                    price_data: {\n                        currency: \"eur\",\n                        product_data: {\n                            name: productName\n                        },\n                        unit_amount: priceEur,\n                        recurring: {\n                            interval: \"month\"\n                        }\n                    },\n                    quantity: 1\n                }\n            ],\n            success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,\n            cancel_url: `${appUrl}/${locale}/checkout/cancelled`,\n            locale: locale === \"nl\" ? \"nl\" : \"en\",\n            metadata: {\n                productId,\n                productName,\n                veluraSource: \"webshop\"\n            }\n        });\n        if (!session.url) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to create stripe session url\"\n            }, {\n                status: 500\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            sessionId: session.id,\n            url: session.url\n        });\n    } catch (error) {\n        console.error(\"[STRIPE_CHECKOUT_ERROR]\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoZWNrb3V0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNMO0FBRS9CLGVBQWVFLEtBQUtDLEdBQVk7SUFDbkMsSUFBSTtRQUNBLE1BQU1DLE9BQU8sTUFBTUQsSUFBSUUsSUFBSTtRQUMzQixNQUFNLEVBQUVDLFNBQVMsRUFBRUMsUUFBUSxFQUFFQyxXQUFXLEVBQUVDLE1BQU0sRUFBRSxHQUFHTDtRQUVyRCxJQUFJLENBQUNFLGFBQWEsQ0FBQ0MsWUFBWSxDQUFDQyxlQUFlLENBQUNDLFFBQVE7WUFDcEQsT0FBT1QscURBQVlBLENBQUNLLElBQUksQ0FDcEI7Z0JBQUVLLE9BQU87WUFBMEIsR0FDbkM7Z0JBQUVDLFFBQVE7WUFBSTtRQUV0QjtRQUVBLE1BQU1DLFNBQVNDLHVCQUErQixJQUFJO1FBRWxELE1BQU1HLFVBQVUsTUFBTWYsK0NBQU1BLENBQUNnQixRQUFRLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDO1lBQ2xEQyxNQUFNO1lBQ05DLFlBQVk7Z0JBQ1I7b0JBQ0lDLFlBQVk7d0JBQ1JDLFVBQVU7d0JBQ1ZDLGNBQWM7NEJBQ1ZDLE1BQU1qQjt3QkFDVjt3QkFDQWtCLGFBQWFuQjt3QkFDYm9CLFdBQVc7NEJBQ1BDLFVBQVU7d0JBQ2Q7b0JBQ0o7b0JBQ0FDLFVBQVU7Z0JBQ2Q7YUFDSDtZQUNEQyxhQUFhLENBQUMsRUFBRWxCLE9BQU8sQ0FBQyxFQUFFSCxPQUFPLGtEQUFrRCxDQUFDO1lBQ3BGc0IsWUFBWSxDQUFDLEVBQUVuQixPQUFPLENBQUMsRUFBRUgsT0FBTyxtQkFBbUIsQ0FBQztZQUNwREEsUUFBUUEsV0FBVyxPQUFPLE9BQU87WUFDakN1QixVQUFVO2dCQUNOMUI7Z0JBQ0FFO2dCQUNBeUIsY0FBYztZQUNsQjtRQUNKO1FBRUEsSUFBSSxDQUFDakIsUUFBUWtCLEdBQUcsRUFBRTtZQUNkLE9BQU9sQyxxREFBWUEsQ0FBQ0ssSUFBSSxDQUNwQjtnQkFBRUssT0FBTztZQUFzQyxHQUMvQztnQkFBRUMsUUFBUTtZQUFJO1FBRXRCO1FBRUEsT0FBT1gscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUFFOEIsV0FBV25CLFFBQVFvQixFQUFFO1lBQUVGLEtBQUtsQixRQUFRa0IsR0FBRztRQUFDO0lBQ3ZFLEVBQUUsT0FBT3hCLE9BQVk7UUFDakIyQixRQUFRM0IsS0FBSyxDQUFDLDJCQUEyQkE7UUFDekMsT0FBT1YscURBQVlBLENBQUNLLElBQUksQ0FDcEI7WUFBRUssT0FBT0EsTUFBTTRCLE9BQU8sSUFBSTtRQUF3QixHQUNsRDtZQUFFM0IsUUFBUTtRQUFJO0lBRXRCO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1leGFtcGxlLy4vYXBwL2FwaS9jaGVja291dC9yb3V0ZS50cz9jOGU2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IHN0cmlwZSB9IGZyb20gJ0AvbGliL3N0cmlwZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICAgICAgICBjb25zdCB7IHByb2R1Y3RJZCwgcHJpY2VFdXIsIHByb2R1Y3ROYW1lLCBsb2NhbGUgfSA9IGJvZHk7XG5cbiAgICAgICAgaWYgKCFwcm9kdWN0SWQgfHwgIXByaWNlRXVyIHx8ICFwcm9kdWN0TmFtZSB8fCAhbG9jYWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgICAgICAgeyBlcnJvcjogJ01pc3NpbmcgcmVxdWlyZWQgZmllbGRzJyB9LFxuICAgICAgICAgICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFwcFVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQUF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc7XG5cbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHN0cmlwZS5jaGVja291dC5zZXNzaW9ucy5jcmVhdGUoe1xuICAgICAgICAgICAgbW9kZTogJ3N1YnNjcmlwdGlvbicsXG4gICAgICAgICAgICBsaW5lX2l0ZW1zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcmljZV9kYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogJ2V1cicsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X2RhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwcm9kdWN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0X2Ftb3VudDogcHJpY2VFdXIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWN1cnJpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbDogJ21vbnRoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3VjY2Vzc191cmw6IGAke2FwcFVybH0vJHtsb2NhbGV9L2NoZWNrb3V0L3N1Y2Nlc3M/c2Vzc2lvbl9pZD17Q0hFQ0tPVVRfU0VTU0lPTl9JRH1gLFxuICAgICAgICAgICAgY2FuY2VsX3VybDogYCR7YXBwVXJsfS8ke2xvY2FsZX0vY2hlY2tvdXQvY2FuY2VsbGVkYCxcbiAgICAgICAgICAgIGxvY2FsZTogbG9jYWxlID09PSAnbmwnID8gJ25sJyA6ICdlbicsXG4gICAgICAgICAgICBtZXRhZGF0YToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0TmFtZSxcbiAgICAgICAgICAgICAgICB2ZWx1cmFTb3VyY2U6ICd3ZWJzaG9wJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghc2Vzc2lvbi51cmwpIHtcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgICAgICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGNyZWF0ZSBzdHJpcGUgc2Vzc2lvbiB1cmwnIH0sXG4gICAgICAgICAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc2Vzc2lvbklkOiBzZXNzaW9uLmlkLCB1cmw6IHNlc3Npb24udXJsIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW1NUUklQRV9DSEVDS09VVF9FUlJPUl0nLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgICAgIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0ludGVybmFsIFNlcnZlciBFcnJvcicgfSxcbiAgICAgICAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJzdHJpcGUiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJwcm9kdWN0SWQiLCJwcmljZUV1ciIsInByb2R1Y3ROYW1lIiwibG9jYWxlIiwiZXJyb3IiLCJzdGF0dXMiLCJhcHBVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBQX1VSTCIsInNlc3Npb24iLCJjaGVja291dCIsInNlc3Npb25zIiwiY3JlYXRlIiwibW9kZSIsImxpbmVfaXRlbXMiLCJwcmljZV9kYXRhIiwiY3VycmVuY3kiLCJwcm9kdWN0X2RhdGEiLCJuYW1lIiwidW5pdF9hbW91bnQiLCJyZWN1cnJpbmciLCJpbnRlcnZhbCIsInF1YW50aXR5Iiwic3VjY2Vzc191cmwiLCJjYW5jZWxfdXJsIiwibWV0YWRhdGEiLCJ2ZWx1cmFTb3VyY2UiLCJ1cmwiLCJzZXNzaW9uSWQiLCJpZCIsImNvbnNvbGUiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/checkout/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/stripe.ts":
/*!***********************!*\
  !*** ./lib/stripe.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   stripe: () => (/* binding */ stripe)\n/* harmony export */ });\n/* harmony import */ var server_only__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! server-only */ \"(rsc)/./node_modules/next/dist/compiled/server-only/empty.js\");\n/* harmony import */ var server_only__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(server_only__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n/**\n * SECURITY: Server-side only. Never import from any 'use client' file.\n * These are Stripe TEST keys — safe for development, never for production.\n */ \n\nconst secretKey = process.env.STRIPE_SECRET_KEY;\nif (!secretKey) {\n    throw new Error(\"[VELURA] Missing STRIPE_SECRET_KEY environment variable. \" + \"Please add it to your .env.local file. \" + \"You can find your test key at https://dashboard.stripe.com/test/apikeys\");\n}\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__[\"default\"](secretKey, {\n    apiVersion: \"2026-02-25.clover\",\n    typescript: true\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3RyaXBlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7O0NBR0MsR0FDb0I7QUFDTztBQUU1QixNQUFNQyxZQUFZQyxRQUFRQyxHQUFHLENBQUNDLGlCQUFpQjtBQUUvQyxJQUFJLENBQUNILFdBQVc7SUFDZCxNQUFNLElBQUlJLE1BQ1IsOERBQ0EsNENBQ0E7QUFFSjtBQUVPLE1BQU1DLFNBQVMsSUFBSU4sOENBQU1BLENBQUNDLFdBQVc7SUFDMUNNLFlBQVk7SUFDWkMsWUFBWTtBQUNkLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1leGFtcGxlLy4vbGliL3N0cmlwZS50cz8wZTMzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU0VDVVJJVFk6IFNlcnZlci1zaWRlIG9ubHkuIE5ldmVyIGltcG9ydCBmcm9tIGFueSAndXNlIGNsaWVudCcgZmlsZS5cbiAqIFRoZXNlIGFyZSBTdHJpcGUgVEVTVCBrZXlzIOKAlCBzYWZlIGZvciBkZXZlbG9wbWVudCwgbmV2ZXIgZm9yIHByb2R1Y3Rpb24uXG4gKi9cbmltcG9ydCAnc2VydmVyLW9ubHknO1xuaW1wb3J0IFN0cmlwZSBmcm9tICdzdHJpcGUnO1xuXG5jb25zdCBzZWNyZXRLZXkgPSBwcm9jZXNzLmVudi5TVFJJUEVfU0VDUkVUX0tFWTtcblxuaWYgKCFzZWNyZXRLZXkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICdbVkVMVVJBXSBNaXNzaW5nIFNUUklQRV9TRUNSRVRfS0VZIGVudmlyb25tZW50IHZhcmlhYmxlLiAnICtcbiAgICAnUGxlYXNlIGFkZCBpdCB0byB5b3VyIC5lbnYubG9jYWwgZmlsZS4gJyArXG4gICAgJ1lvdSBjYW4gZmluZCB5b3VyIHRlc3Qga2V5IGF0IGh0dHBzOi8vZGFzaGJvYXJkLnN0cmlwZS5jb20vdGVzdC9hcGlrZXlzJ1xuICApO1xufVxuXG5leHBvcnQgY29uc3Qgc3RyaXBlID0gbmV3IFN0cmlwZShzZWNyZXRLZXksIHtcbiAgYXBpVmVyc2lvbjogJzIwMjYtMDItMjUuY2xvdmVyJyBhcyBhbnksXG4gIHR5cGVzY3JpcHQ6IHRydWUsXG59KTtcbiJdLCJuYW1lcyI6WyJTdHJpcGUiLCJzZWNyZXRLZXkiLCJwcm9jZXNzIiwiZW52IiwiU1RSSVBFX1NFQ1JFVF9LRVkiLCJFcnJvciIsInN0cmlwZSIsImFwaVZlcnNpb24iLCJ0eXBlc2NyaXB0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/stripe.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/stripe"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcheckout%2Froute&page=%2Fapi%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcheckout%2Froute.ts&appDir=%2FUsers%2Fvpkartsistanbulhair%2FDocuments%2FTestTestTest-main%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fvpkartsistanbulhair%2FDocuments%2FTestTestTest-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();