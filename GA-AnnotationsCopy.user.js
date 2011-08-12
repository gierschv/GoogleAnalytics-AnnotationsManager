// ==UserScript==
// @name           Google Analytics - Copy profiles annotations
// @version        0.1
// @license        GPLv3 (see LICENSE)
// @author         Vincent Giersch <mail@vincent.sh>
// @description    Copy annotations of Google Analytics profiles
// @include        https://www.google.com/analytics/*
// ==/UserScript==

// Need an "unsafe" jQuery to trigger clicks
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
        GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined')
        window.setTimeout(GM_wait, 100);
    else
    {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

function letsJQuery() {
    var dumpAnnotations = function() {
        if ($('.C_ANNOTATIONS_COPY_CHCKBX').length > 0)
        {
            $('.C_ANNOTATIONS_COPY_WRAPPER').remove();
            $('.C_ANNOTATIONS_COPY_CHCKBX').remove();
            displayLinks();
            return false;
        }
        
        var dumpAnnotationsProcess = function() {
            var annotationsArray = [];
            $('.C_ANNOTATIONS_LIST > tbody:eq(1) > tr').each(function(idx, elem) {
                if ($(elem).find('input[type="checkbox"]').attr('checked') != undefined)
                {
                    annotationsArray.push({
                        date: $(elem).find('.C_ANNOTATIONS_DATE').text(),
                        text: $(elem).find('.C_ANNOTATIONS_TEXT > span:eq(1)').text(),
                        isPrivate: $(elem).find('.C_ANNOTATIONS_ACCESS_LABEL').css('display') == 'block'
                    });
                }
            });
            localStorage.setItem('annotations', JSON.stringify(annotationsArray));
            $('.C_ANNOTATIONS_COPY').html(annotationsArray.length + ' annotations are into localstorage.');
            $('.C_ANNOTATIONS_CURRENT').remove();
        };

        $('.C_ANNOTATIONS_LIST > tbody:eq(1) > tr').append('<td class="C_ANNOTATIONS_COPY_CHCKBX"><input type="checkbox" checked /></td>');
        dumpAnnotationsProcess();
        $('.C_ANNOTATIONS_COPY_CHCKBX > input').change(dumpAnnotationsProcess);
        return false;
    };

    var showAnnotations = function() {
        var annotationsArray = localStorage.getItem('annotations');
        if (!annotationsArray)
            return false;
        var str = "List of annotations stored in localstorage :\n";
        annotationsArray = JSON.parse(annotationsArray);
        for (var i = 0 ; i < annotationsArray.length ; ++i)
        {
            str += annotationsArray[i].date;
            if (annotationsArray[i].isPrivate)
                str += " [private]"
            str += ": " + annotationsArray[i].text + "\n";
        }
        alert(str);
        return false;
    };

    var pasteAnnotationsFill = function(annotation)
    {
        var form = $('.C_ANNOTATIONS_TABLE_WRAPPER > form');
        // Fill
        $(form).find('input[name="date"]').val(annotation.date);
        $(form).find('textarea[name="text"]').val(annotation.text);
        if (annotation.isPrivate)
            $(form).find('input[name="access"]').val('PRIVATE');
        // Active form validation link
        $(form).find('textarea[name="text"]').click();
        // Send
        $('.C_ANNOTATIONS_SAVE_BUTTON > b').click();
    }

    var pasteAnnotations = function() {
        var annotationsArray = localStorage.getItem('annotations');
        if (!annotationsArray)
            return false;
        annotationsArray = JSON.parse(annotationsArray);
        var pasteAnnotationsCurrent = 0;
        // Active form to get AnnotationsDrawer_list form tr id
        // Trigger click trigger on "Create annotation link" not catched ? use actionscript interface instead to activate form...
        unsafeWindow.ga.component.actionscript.installedFacades_[unsafeWindow.ga.component.actionscript.installedFacades_.length - 1].addNewAnnotation();
        // Async call : waiting for token in #AnnotationsDrawer_list > table > tr id
        $(document).bind('DOMAttrModified', function(event) {
            if (event.newValue == 'C_ANNOTATIONS_CREATE_NEW C_ANNOTATIONS_BUTTON disabled')
            {
                pasteAnnotationsFill(annotationsArray[pasteAnnotationsCurrent]);
                pasteAnnotationsCurrent++;
                if (pasteAnnotationsCurrent == annotationsArray.length)
                    $(document).unbind('DOMAttrModified');
            }
            else if (event.newValue == 'C_ANNOTATIONS_CREATE_NEW C_ANNOTATIONS_BUTTON' && pasteAnnotationsCurrent + 1 < annotationsArray.length)
                unsafeWindow.ga.component.actionscript.installedFacades_[unsafeWindow.ga.component.actionscript.installedFacades_.length - 1].addNewAnnotation();
        });
    };

    var displayLinks = function() {
        if ($('.C_ANNOTATIONS_COPY_WRAPPER').length > 0)
            return false;
        $('.C_ANNOTATIONS_CREATE_NEW').parent().append('<span class="C_ANNOTATIONS_COPY_WRAPPER">|&nbsp;\
                                <a class="C_ANNOTATIONS_COPY C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">Copy annotation(s)</a></span>');
        $('.C_ANNOTATIONS_COPY').click(dumpAnnotations);
        
        var annotationsArray = localStorage.getItem('annotations');
        if (!annotationsArray || !(annotationsArray = JSON.parse(annotationsArray).length) || annotationsArray == 0)
            return false;
        $('.C_ANNOTATIONS_CREATE_NEW').parent().append('<span class="C_ANNOTATIONS_CURRENT">\
                                                        |&nbsp;<a class="C_ANNOTATIONS_PASTE C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">Paste ' +
                                                        annotationsArray + ' annotation(s)</a>\
                                                        |&nbsp;<a class="C_ANNOTATIONS_SHOW C_ANNOTATIONS_BUTTON" onclick="return false;" href="#">\
                                                        Show annotation(s) in localstorage</a></span>');
        $('.C_ANNOTATIONS_PASTE').click(pasteAnnotations);
        $('.C_ANNOTATIONS_SHOW').click(showAnnotations);
        return true;
    }

    $(document).bind('DOMNodeInserted', function(event) {
        if (event.target.className.indexOf('C_ANNOTATIONS') >= 0)
            displayLinks();
    });
}
