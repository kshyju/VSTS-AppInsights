
export class AppInsightsWidgetConfiguration {

    $appIdTxt = $("#appId");
    $apiKeyTxt = $("#apiKey");

    constructor(private WidgetHelpers: any) {

    }

    public load(widgetSettings, widgetConfigurationContext) {
        var _this = this;
        var settings = JSON.parse(widgetSettings.customSettings.data);


        if (settings && settings.applicationId) {
            _this.$appIdTxt.val(settings.applicationId);
        }
        if (settings && settings.apiKey) {
            _this.$apiKeyTxt.val(settings.apiKey);
        }

        this.$appIdTxt.on("blur", function () {
            var customSettings = { data: JSON.stringify({ applicationId: _this.$appIdTxt.val(), apiKey: _this.$apiKeyTxt.val() }) };
            var eventName = _this.WidgetHelpers.WidgetEvent.ConfigurationChange;
            var eventArgs = _this.WidgetHelpers.WidgetEvent.Args(customSettings);
            widgetConfigurationContext.notify(eventName, eventArgs);
        });

        this.$apiKeyTxt.on("blur", function () {
            var customSettings = { data: JSON.stringify({ applicationId: _this.$appIdTxt.val(), apiKey: _this.$apiKeyTxt.val() }) };
            var eventName = _this.WidgetHelpers.WidgetEvent.ConfigurationChange;
            var eventArgs = _this.WidgetHelpers.WidgetEvent.Args(customSettings);
            widgetConfigurationContext.notify(eventName, eventArgs);
        });


        return this.WidgetHelpers.WidgetStatusHelper.Success();
    }

    public onSave() {
        var _this = this;
        var customSettings = { data: JSON.stringify({ applicationId:this.$appIdTxt.val(), apiKey: this.$apiKeyTxt.val() }) };
        return _this.WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);

    }

}

VSS.require(["TFS/Dashboards/WidgetHelpers"], (WidgetHelpers) => {
    WidgetHelpers.IncludeWidgetStyles();
    WidgetHelpers.IncludeWidgetConfigurationStyles();
    VSS.register("AppInsightsWidgetConfiguration", () => {
        return  new AppInsightsWidgetConfiguration(WidgetHelpers);
    })

    VSS.notifyLoadSucceeded();
});
