
import AppInsights = require("src/AppInsights")
VSS.require(["TFS/Dashboards/WidgetHelpers"], (WidgetHelpers) => {
     WidgetHelpers.IncludeWidgetStyles();
       
    VSS.register("AppInsightsWidget", () => {
        return  new AppInsights.AppInsights(WidgetHelpers);            
    })
    VSS.notifyLoadSucceeded();
});
