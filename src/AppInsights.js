define(["require", "exports"], function (require, exports) {
    "use strict";
    var AppInsights = (function () {
        function AppInsights(WidgetHelpers) {
            this.WidgetHelpers = WidgetHelpers;
        }
        AppInsights.prototype.load = function (widgetSettings) {
            return this.getChangeSetData(widgetSettings);
        };
        AppInsights.prototype.reload = function (widgetSettings) {
            return this.getChangeSetData(widgetSettings);
        };
        AppInsights.prototype.getPrettyDate = function (dt) {
            var d = new Date(dt);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        };
        AppInsights.prototype.getEventGridRow = function (item) {
            var rowMarkup = '<tr>';
            rowMarkup += '<td><div>';
            rowMarkup += item.customEvent.name;
            rowMarkup += '</div><div class="meta-date">' + this.getPrettyDate(item.timestamp) + '</div></td>';
            rowMarkup += '</tr>';
            return rowMarkup;
        };
        AppInsights.prototype.getChangeSetData = function (widgetSettings) {
            var _this = this;
            var $itemsContainer = $("#items>tbody");
            var $widgetTitle = $("#widgetTitle");
            var $widgetSubTitle = $("#widgetSubTitle");
            var top = 6;
            if (widgetSettings.size.rowSpan === 3) {
                top = 10;
            }
            var settings = JSON.parse(widgetSettings.customSettings.data);
            console.log(widgetSettings);
            if (settings && settings.apiKey && settings.applicationId) {
                var applicationId = settings.applicationId;
                var apiKey = settings.apiKey;
                var setting = {
                    url: 'https://api.applicationinsights.io/beta/apps/' + applicationId + '/events/$all?$top=' + top,
                    headers: { "x-api-key": apiKey },
                };
                $itemsContainer.empty();
                $.ajax(setting).done(function (result) {
                    console.log(result);
                    $.each(result.value, function (index, item) {
                        if (item.type === 'customEvent') {
                            var r = _this.getEventGridRow(item);
                            $itemsContainer.append(r);
                        }
                    });
                }).fail(function (a, b, c) {
                    console.log(a);
                    if (a.responseJSON.error && a.responseJSON.error.innererror) {
                        $itemsContainer.append(a.responseJSON.error.innererror.message);
                    }
                    else if (a.responseJSON.error) {
                        $itemsContainer.append(a.responseJSON.error.message);
                    }
                });
                $widgetTitle.text("Recent custom events");
            }
            else {
                $itemsContainer.append("<tr><td>Please configure application id and api key.</td></tr>");
            }
            var settings = JSON.parse(widgetSettings.customSettings.data);
            return this.WidgetHelpers.WidgetStatusHelper.Success();
        };
        return AppInsights;
    }());
    exports.AppInsights = AppInsights;
});
