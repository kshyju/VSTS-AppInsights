define(["require", "exports", "src/AppInsights"], function (require, exports, AppInsights) {
    "use strict";
    VSS.require(["TFS/Dashboards/WidgetHelpers"], function (WidgetHelpers) {
        WidgetHelpers.IncludeWidgetStyles();
        VSS.register("AppInsightsWidget", function () {
            return new AppInsights.AppInsights(WidgetHelpers);
        });
        VSS.notifyLoadSucceeded();
    });
});
