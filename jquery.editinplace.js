/**
 * Plugin: jquery.editinplace
 * 
 * Version: 1.0
 * Copyright (c) 2011 Stanley Alston (stanleyalston.posterous.com)
 * Licensed under the MIT (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 *
 **/
 
(function ($) {
    $.fn.editinplace = function (options, fn) {
        var defaults = {
            submit: "?",
            cancel: "?",
            isHover: false,
            width: "200px",
            element: {
                type: "textarea",
                rows: 2,
                cols: 40,
                size: 40,
                maxlength: 10
            },
            onSubmit: invokeRequest,
            request: {
                url: "test.php",
                type: "json",
                param: "q=flowers",
                success: function (data) {
                    console.log(data);
                },
                error: function (x, t, e) {
                    console.log("error");
                }
            }
        }

        var options = $.extend(defaults, options);

        return this.each(function (i, e) {
            var $e = $(e);
            toEditInPlace(e, options);
        });
    };

    var toEditInPlace = function (e, options) {
        var current;
        $(e).css({ width: options.width });

        if (options.isHover) {
            $(e).live({
                mouseenter: function () {
                    $(this).css({ background: "#ffffbb", opacity: 0.5 });
                },
                mouseleave: function () {
                    $(this).css({ background: "none", opacity: 1 });
                }
            });
        }        

        $(e).live('click', function () {
            var output = "<span class=\"editinplace-section\">";
            output += elementFactory[options.element.type == undefined ?
					"textarea" : options.element.type].getTemplate(e, options);
            output += "<ul class=\"editinplace-buttons\">";
            output += "<li class=\"editinplace-save\">";
            output += options.submit;
            output += "</li>";
            output += "<li class=\"editinplace-cancel\">";
            output += options.cancel;
            output += "</li>";
            output += "</ul>";
            output += "</span>";
            
            $(this).hide().after(output);
            $('.editinplace-area').focus();
        });

        $('.editinplace-cancel').live("click", function () {
            $(e).show();
            $(".editinplace-section").remove();
        });

        $('.editinplace-save').live("click", function () {
            options.onSubmit(options.request);
        });
    };

    var invokeRequest = function (request) {
        var params = {
            url: request.url,
            dataType: request.type,
            data: request.param,
            async: true,
            success: request.success,
            error: request.error
        }

        $.ajax(params);
    }

    elementFactory = {
        "text": {
            getTemplate: function (e, options) {
                var output = "<input type=\"text\" class=\"editinplace-area\" ";
                output += "size=\"" + options.element.size + "\" ";
                output += "maxlength=\"" + options.element.maxlength + "\" value=\"" + $(e).text().trim() + "\" />";
                return output;
            }
        },
        "password": {
            getTemplate: function (e, options) {
                var output = "<input type=\"password\" class=\"editinplace-area\" ";
                output += "size=\"" + options.element.size + "\" ";
                output += "maxlength=\"" + options.element.maxlength + "\" value=\"" + $(e).text().trim() + "\" />";
                return output;
            }
        },
        "textarea": {
            getTemplate: function (e, options) {
                var output = "<textarea class=\"editinplace-area\" ";
                output += "rows=\"" + options.element.rows + "\" cols=\"" + options.element.cols + "\">";
                output += $(e).text().trim() + "</textarea>";
                return output;
            }
        }
    }
})(jQuery);