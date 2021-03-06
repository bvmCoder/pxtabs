$(function() {
    console.log("ready!");
    var $tabs = $('.cd-tabs');

    $(window).resize(function() {
        console.log('Window Resized'); // Window resize works like a charm
    });



    $tabs.each(function() {
        var tab = $(this),
            tabItems = tab.find('ul.cd-tabs-navigation'),
            tabContentWrapper = tab.children('ul.cd-tabs-content'),
            tabNavigation = tab.find('nav');

        tabItems.on('click', 'a', function(event) {
            event.preventDefault();
            var selectedItem = $(this);
            if (!selectedItem.hasClass('selected')) {
                var selectedTab = selectedItem.data('content'),
                    selectedContent = tabContentWrapper.find('li[data-content="' + selectedTab + '"]'),
                    slectedContentHeight = selectedContent.innerHeight();

                tabItems.find('a.selected').removeClass('selected');
                selectedItem.addClass('selected');
                selectedContent.addClass('selected').siblings('li').removeClass('selected');
                //animate tabContentWrapper height when content changes 
                tabContentWrapper.animate({
                    'height': slectedContentHeight
                }, 200);
            }
        });

        //hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
        checkScrolling(tabNavigation);
        tabNavigation.on('scroll', function() {
            checkScrolling($(this));
        });
    });

    $(window).resize(function() {
        $tabs.each(function() {
            var tab = $(this);
            checkScrolling(tab.find('nav'));
            tab.find('.cd-tabs-content').css('height', 'auto');
        });
    });

    function checkScrolling($tabs) {
        var totalTabWidth = parseInt($tabs.children('.cd-tabs-navigation').width()),
            tabsViewport = parseInt($tabs.width());
        if ($tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
            $tabs.parent('.cd-tabs').addClass('is-ended');
        } else {
            $tabs.parent('.cd-tabs').removeClass('is-ended');
        }
    }


});


const getStyle = function getStyle (elem, value) {
    let view = elem.ownerDocument.defaultView
    let map = {}
    if (!view || !view.opener ) {
            view = window
    }

    let getAllStyle = view.getComputedStyle(elem)
    if (Array.isArray(value)) {
        const length = value.length
        let i = 0

        for ( ; i < length; i++ ) {
                map[ value[ i ] ] = getAllStyle[value[i]]
        }

        return map
    }
    const styleValue = getAllStyle[value]
    return styleValue
};
