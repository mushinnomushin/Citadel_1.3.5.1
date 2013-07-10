/** AJAX context menu
 */
window.AJAXcontextMenu = function(params, lexicon){
	// Items tuning
	for (var name in params['items']){
		var p = params['items'][name];
		// auto-icon
		if (p['icon'] === undefined)
			p['icon'] = name;
		// auto-name
		if (p['name'] === undefined)
			p['name'] = params['lexicon'][name];
		// auto-ajax
		if (p['ajaxSuccess'] !== undefined && p['callback'] === undefined)
			p['callback'] = function(p){ 
					return function(key,opt){
						// Call the default callback & give him the ajaxSuccess function
						return params['callback'].call(this, key, opt, p['ajaxSuccess'].appliedTo(this));
						};
					}(p);
		}
	return params;
	};

// Inits
$(function(){
	// Init jLog
	$.jlog && $('#jlog').jlog();
});

if (window.global && window.global.width){
    var n = window.global.width, C = [0,0,0,0,0,0], p = 0, r;
    while (n > 0){
        r = n%6;
        n = Math.floor(n/6);
        C[p++] += r*40;
    }
    var i = 0;
    var $styles = $('<style></style>').appendTo('head');
    $styles.append('#main-header h2 span { color: rgb('+ C.slice(i*3,(i+1)*3).join(',') +'); }');
}


// jQuery templating
jQuery.fn.extend({
	template: function(data, ufilters){
		var html = '' + this.clone().removeClass('js-template').wrapAll('<div />').parent().html();
		return html.template(data, ufilters);
	}
});

// PHP append
window.phpAppend = function(map){
	for (var sel in map){
		$(sel).append(map[sel]);
	}
};

// SuperMenu
$(function(){
    var $menu = $('#supermenu');
    if (!$menu.length) return;

    // OnlineBots
    $menu.find('li.onlinebots a').colorbox({resize: true});
    $('form#supermenu-onlinebots').live('submit', function(){
        var $form = $(this);
        $.post($form.attr('action'), $form.serialize(), function(data){
            $.colorbox({html: data});
        });
        return false;
    });
});
