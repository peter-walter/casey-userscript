// ==UserScript==
// @name         Casey Tweaks
// @namespace    https://maruhub.com
// @version      0.2
// @description  Tidy the summary page and agent list in Casey
// @author       Peter Walter
// @include      /^https:\/\/casey\.maruhub\.com\/agent\/desk\/\d+$/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=maruhub.com0
// @updateURL    https://github.com/peter-walter/casey-userscript/raw/main/casey.user.js
// @downloadURL  https://github.com/peter-walter/casey-userscript/raw/main/casey.user.js
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    // find watcher/agents box
    let wa = $('div.card-body:first').addClass('watcher-agents').css({'margin-top': '0'});
    // find your goal box
    let yg = $('aside.inline-help:first').addClass('your-goal');

    // find the container that holds all the cards
    let bc = $('div.watcher-agents').closest('.row').parent().closest('.row');

    // move the watcher/agents and the your goal box to the bottom of the page
    $('<div>').addClass('col-md-8').appendTo(bc).append(wa);
    $('<div>').addClass('col-md-4').appendTo(bc).append(yg);

    // change the list item formatting for more compact view
    $('.watcher-agents li').css({'display': 'inline-block', 'padding-right': '0.75em'})
    $('.watcher-agents ul').css({'font-size': '14px'});
    // make full width blocks
    $('.watcher-agents .col-md-6').addClass('col-md-12').removeClass('col-md-6');


    // utility functions to get and set localstorage
    const hiddenKey = 'casey-agent-hiden';
    function getHidden() {
        let ls = localStorage.getItem(hiddenKey) || '';
        return ls.split(',');
    }
    function addHidden(name) {
        let ls = getHidden();
        ls.push(name);
        localStorage.setItem(hiddenKey, ls.join(','));
    }
    // utility function to deal with doubleclick event handler
    function eventAddHidden(event) {
        addHidden($(event.target).text());
        $(event.target).css({'display': 'none'});
    }

    // remove people who have left
    $('.watcher-agents li').each(function() {
        let el = $(this);

        // double click to remove names
        el.on('dblclick', eventAddHidden);

        // hide all previously hidden names
        let hidden = getHidden();
        if(hidden.includes(el.text())) el.css({'display': 'none'})

        // remove duplicates if they exist
        $($('.watcher-agents li:contains(' + el.text() + ')')[1]).css({'display': 'none'});
        $($('.watcher-agents li:contains(' + el.text() + ')')[2]).css({'display': 'none'});
    });



})(jQuery);
