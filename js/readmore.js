
// ;(function($) {

//   var readmore = 'readmore',
//       defaults = {
//         speed: 1000,
//         maxHeight: 200,
//         heightMargin: 16,
//         moreLink: '<a href="#">Read More</a>',
//         lessLink: '<a href="#">Close</a>',
//         embedCSS: true,
//         sectionCSS: 'display: block; width: 100%;',
//         startOpen: false,
//         expandedClass: 'readmore-js-expanded',
//         collapsedClass: 'readmore-js-collapsed',

//         // callbacks
//         beforeToggle: function(){},
//         afterToggle: function(){}
//       },
//       cssEmbedded = false;

//   function Readmore( element, options ) {
//     this.element = element;

//     this.options = $.extend( {}, defaults, options);

//     $(this.element).data('max-height', this.options.maxHeight);
//     $(this.element).data('height-margin', this.options.heightMargin);

//     delete(this.options.maxHeight);

//     if(this.options.embedCSS && ! cssEmbedded) {
//       var styles = '.readmore-js-toggle, .readmore-js-section { ' + this.options.sectionCSS + ' } .readmore-js-section { overflow: hidden; }';

//       (function(d,u) {
//         var css=d.createElement('style');
//         css.type = 'text/css';
//         if(css.styleSheet) {
//             css.styleSheet.cssText = u;
//         }
//         else {
//             css.appendChild(d.createTextNode(u));
//         }
//         d.getElementsByTagName('head')[0].appendChild(css);
//       }(document, styles));

//       cssEmbedded = true;
//     }

//     this._defaults = defaults;
//     this._name = readmore;

//     this.init();
//   }

//   Readmore.prototype = {

//     init: function() {
//       var $this = this;

//       $(this.element).each(function() {
//         var current = $(this),
//             maxHeight = (current.css('max-height').replace(/[^-\d\.]/g, '') > current.data('max-height')) ? current.css('max-height').replace(/[^-\d\.]/g, '') : current.data('max-height'),
//             heightMargin = current.data('height-margin');

//         if(current.css('max-height') != 'none') {
//           current.css('max-height', 'none');
//         }

//         $this.setBoxHeight(current);

//         if(current.outerHeight(true) <= maxHeight + heightMargin) {
//           // The block is shorter than the limit, so there's no need to truncate it.
//           return true;
//         }
//         else {
//           current.addClass('readmore-js-section ' + $this.options.collapsedClass).data('collapsedHeight', maxHeight);

//           var useLink = $this.options.startOpen ? $this.options.lessLink : $this.options.moreLink;
//           current.after($(useLink).on('click', function(event) { $this.toggleSlider(this, current, event) }).addClass('readmore-js-toggle'));

//           if(!$this.options.startOpen) {
//             current.css({height: maxHeight});
//           }
//         }
//       });

//       $(window).on('resize', function(event) {
//         $this.resizeBoxes();
//       });
//     },

//     toggleSlider: function(trigger, element, event)
//     {
//       event.preventDefault();

//       var $this = this,
//           newHeight = newLink = sectionClass = '',
//           expanded = false,
//           collapsedHeight = $(element).data('collapsedHeight');

//       if ($(element).height() <= collapsedHeight) {
//         newHeight = $(element).data('expandedHeight') + 'px';
//         newLink = 'lessLink';
//         expanded = true;
//         sectionClass = $this.options.expandedClass;
//       }

//       else {
//         newHeight = collapsedHeight;
//         newLink = 'moreLink';
//         sectionClass = $this.options.collapsedClass;
//       }

//       // Fire beforeToggle callback
//       $this.options.beforeToggle(trigger, element, expanded);

//       $(element).animate({'height': newHeight}, {duration: $this.options.speed, complete: function() {
//           // Fire afterToggle callback
//           $this.options.afterToggle(trigger, element, expanded);

//           $(trigger).replaceWith($($this.options[newLink]).on('click', function(event) { $this.toggleSlider(this, element, event) }).addClass('readmore-js-toggle'));

//           $(this).removeClass($this.options.collapsedClass + ' ' + $this.options.expandedClass).addClass(sectionClass);
//         }
//       });
//     },

//     setBoxHeight: function(element) {
//       var el = element.clone().css({'height': 'auto', 'width': element.width(), 'overflow': 'hidden'}).insertAfter(element),
//           height = el.outerHeight(true);

//       el.remove();

//       element.data('expandedHeight', height);
//     },

//     resizeBoxes: function() {
//       var $this = this;

//       $('.readmore-js-section').each(function() {
//         var current = $(this);

//         $this.setBoxHeight(current);

//         if(current.height() > current.data('expandedHeight') || (current.hasClass($this.options.expandedClass) && current.height() < current.data('expandedHeight')) ) {
//           current.css('height', current.data('expandedHeight'));
//         }
//       });
//     },

//     destroy: function() {
//       var $this = this;

//       $(this.element).each(function() {
//         var current = $(this);

//         current.removeClass('readmore-js-section ' + $this.options.collapsedClass + ' ' + $this.options.expandedClass).css({'max-height': '', 'height': 'auto'}).next('.readmore-js-toggle').remove();

//         current.removeData();
//       });
//     }
//   };

//   $.fn[readmore] = function( options ) {
//     var args = arguments;
//     if (options === undefined || typeof options === 'object') {
//       return this.each(function () {
//         if ($.data(this, 'plugin_' + readmore)) {
//           var instance = $.data(this, 'plugin_' + readmore);
//           instance['destroy'].apply(instance);
//         }

//         $.data(this, 'plugin_' + readmore, new Readmore( this, options ));
//       });
//     } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
//       return this.each(function () {
//         var instance = $.data(this, 'plugin_' + readmore);
//         if (instance instanceof Readmore && typeof instance[options] === 'function') {
//           instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
//         }
//       });
//     }
//   }
// })(jQuery);


// ВАРІАНТ ДВА

// (function($) {
//   $.fn.truncate = function(options) {

//     var defaults = {
//       length: 100,
//       minTrail: 10,
//       moreText: "",
//       lessText: "",
//       ellipsisText: ""
//     };

//     var options = $.extend(defaults, options);

//     function find(container, text, minLength) {
//       var curIndex = 0;

//       for (var nodes = Array.from(container.childNodes); nodes.length;) {
//         var node = nodes.shift();
//         if (node.nodeType == Node.ELEMENT_NODE) {
//           nodes.unshift(...node.childNodes);
//           continue;
//         }
//         var index = -1;
//         do {
//           index = node.textContent.indexOf(text, index + 1);
//         } while (index != -1 && curIndex + index < minLength);

//         if (index != -1) {
//           curIndex += index;
//           return [node, index];
//         } else {
//           curIndex += node.textContent.length;
//         }
//       }
//       return [null, -1];
//     }

//     return this.each(function() {
//       var obj = $(this);
//       var body = this.textContent;

//       if (body.length > options.length + options.minTrail) {
//         var textToFind = '.';
//         if (body.indexOf(textToFind, options.length) != -1) {

//           var [node, startIndex] = find(this, textToFind, options.length);
//           var splitLocation = startIndex + textToFind.length;

//           var str1 = node.textContent.substring(0, splitLocation);
//           var str2 = node.textContent.substring(splitLocation + 1);

//           node.textContent = str1;

//           if (str2.length) {
//             $(node).after(`<span  class="truncate_more">${str2}</span>`);
//           }

//           $(node).after(`<span class="truncate_ellipsis">${options.ellipsisText}</span>`);

//           var oi = 0;
//           while (node != this) {
//             var span = $('<span>').addClass('truncate_more');
//             for (var nextNode = node.nextSibling, savedNode; nextNode; nextNode = savedNode) {
//               if (nextNode.classList && (nextNode.classList.contains('truncate_more') || nextNode.classList.contains('truncate_ellipsis'))) continue;

//               savedNode = nextNode.nextSibling;
//               span.append(nextNode);
//             }
//             node = node.parentNode;
//             $(node).append(span);
//           }

//           obj.find('.truncate_more').css("display", "none");

//           obj.append(
//             '<div class="clearboth">' +
//             '<a href="#" class="truncate_more_link">' + options.moreText + '</a>' +
//             '</div>'
//           );

//           var moreLink = $('.truncate_more_link', obj);
//           var moreContent = $('.truncate_more', obj);
//           var ellipsis = $('.truncate_ellipsis', obj);
//           moreLink.click(function() {
//             if (moreLink.text() == options.moreText) {
//               moreContent.show('normal');
//               moreLink.text(options.lessText);
//               ellipsis.css("display", "none");
//             } else {
//               moreContent.hide('normal');
//               moreLink.text(options.moreText);
//               ellipsis.css("display", "inline");
//             }
//             return false;
//           });
//         }
//       }

//     });
//   };
// })(jQuery);

// $().ready(function() {
//   $('.story').truncate({
//     length: 100,
//     minTrail: 10,
//     moreText: 'Read more',
//     lessText: 'Less',
//     ellipsisText: ""
//   });
// });

// ВАРІАНТ ТРІ



// (function($) {
//   $.fn.truncate = function(options) {

//     var defaults = {
//       length: 100,
//       minTrail: 10,
//       moreText: "",
//       lessText: "",
//       ellipsisText: ""
//     };

//     var options = $.extend(defaults, options);

//     return this.each(function() {
//       obj = $(this);
//       var body = obj.html();

//       if (body.length > options.length + options.minTrail) {
//         var splitLocation = body.indexOf(' ', options.length);
//         if (splitLocation != -1) {

//           var splitLocation = body.indexOf(' ', options.length);
//           var str1 = body.substring(0, splitLocation);
//           var str2 = body.substring(splitLocation, body.length - 1);
//           obj.html(str1 + '<span class="truncate_ellipsis">' + options.ellipsisText +
//             '</span>' + '<span  class="truncate_more">' + str2 + '</span>');
//           obj.find('.truncate_more').css("display", "none");

//           obj.append(
//             '<div class="clearboth">' +
//             '<a href="#" class="truncate_more_link">' + options.moreText + '</a>' +
//             '</div>'
//           );

//           var moreLink = $('.truncate_more_link', obj);
//           var moreContent = $('.truncate_more', obj);
//           var ellipsis = $('.truncate_ellipsis', obj);
//           moreLink.click(function() {
//             if (moreLink.text() == options.moreText) {
//               moreContent.show('normal');
//               moreLink.text(options.lessText);
//               ellipsis.css("display", "none");
//             } else {
//               moreContent.hide('normal');
//               moreLink.text(options.moreText);
//               ellipsis.css("display", "inline");
//             }
//             return false;
//           });
//         }
//       }

//     });
//   };
// })(jQuery);

// $().ready(function() {
//   $('.story').truncate({
//     length: 0,
//     minTrail: 10,
//     moreText: 'Read more',
//     lessText: 'Less',
//     ellipsisText: " "
//   });
// });





// (() => {
//   const refs = {
//     openModalBtn: document.querySelector('[data-modal-open]'),
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     modal: document.querySelector('[data-modal]'),
//   };

//   refs.openModalBtn.addEventListener('click', toggleModal);
//   refs.closeModalBtn.addEventListener('click', toggleModal);

//   function toggleModal() {
//     refs.modal.classList.toggle('is-hidden');
//   }
// })();

// (() => {
//     const menuBtnRef = document.querySelector("[data-menu-button]");
//     const mobileMenuRef = document.querySelector("[data-menu]");
//     const mobileBtnClose = document.querySelector("[data-menu-close]");

//     menuBtnRef.addEventListener("click", () => {
//       mobileMenuRef.classList.toggle("is-open");
//     })

//     mobileBtnClose.addEventListener('click', () => {
//       mobileMenuRef.classList.toggle("is-open");
//     });
// })()