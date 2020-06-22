(function ($) {

'use strict';

/* * ==========================================================================
 * ==========================================================================
 * ==========================================================================
 * 
 * Cassio – Architect Portfolio AJAX HTML5 Template
 * 
 * [Table of Contents]
 * 
 * 1. ButtonCircle
 * 2. ButtonCircles
 * 3. Counter
 * 4. figureAward
 * 5. FigurePortfolioAnimation
 * 6. FigurePortfolioHover
 * 7. Filter
 * 8. fontObserver
 * 9. Form
 * 10. gmap
 * 11. grid
 * 12. Header
 * 13. lazyLoad
 * 14. menu
 * 15. MenuOverlay
 * 16. PJAX Animate Clonned Heading
 * 17. PJAX Animate Curtain
 * 18. PJAX Clone Heading
 * 19. PJAX Finish Loading
 * 20. PJAX Get Flying Direction
 * 21. PJAX Init New Page
 * 22. PJAX Prepare Transition
 * 23. PJAX Transition Flying Heading
 * 24. PJAX Transition General
 * 25. PJAX Transition Overlay Menu
 * 26. PJAX Update Body
 * 27. PJAX Update Head
 * 28. PJAX Update Nodes
 * 29. PJAX Update Trackers
 * 30. PJAX
 * 31. preloader
 * 32. createOSScene
 * 33. getScrollTop
 * 34. lockScroll
 * 35. restoreScrollTop
 * 36. scrollToVeryTop
 * 37. ScrollDown
 * 38. sectionAbout
 * 39. sectionAwards
 * 40. SectionContent
 * 41. sectionFullscreenSlider
 * 42. sectionMasthead
 * 43. sectionNavProjects
 * 44. SectionPortfolio
 * 45. sectionServices
 * 46. sectionTestimonials
 * 47. renderSliderCounter
 * 48. renderSliderDots
 * 49. setSliderOverlapEffect
 * 50. setSliderTestimonialsTransitions
 * 51. setSliderTextTransitions
 * 52. sliderFullscreen
 * 53. sliderHalfScreen
 * 54. SliderImages
 * 55. SliderLetters
 * 56. SliderProjects
 * 57. sliderTestimonials
 * 58. animateChars
 * 59. animateHeadline
 * 60. animateLines
 * 61. distributeByPosition
 * 62. doSplitText
 * 63. hideChars
 * 64. hideLines
 * 65. hideWords
 * 66. hideWordsVertical
 * 67. setChars
 * 68. setLines
 * 69. debounce
 * 70. fixMobileBarHeight
 * 71. isAnchor
 * 72. runOnHighPerformanceGPU
 * 73. syncAttributes

 * ==========================================================================
 * ==========================================================================
 * ==========================================================================
 */

window.$document = $(document);
window.$window = $(window);
window.$body = $('body');
window.$pageContent = $('.page-wrapper__content');
window.$pageHeader = $('.header');
window.$overlay = $('.header__wrapper-overlay-menu');
window.$barbaWrapper = $('[data-barba="wrapper"]');
window.PagePreloader = new Preloader();
window.$curtain = $('.transition-curtain');
window.triggerTextAlign = 'left';

/**
 * Try to use high performance GPU on dual-GPU systems
 */
runOnHighPerformanceGPU();

/**
 * Begin Page Load
 */
window.PagePreloader.start();

/**
 * Default Theme Options
 * Used to prevent errors if there is
 * no data provided from backend
 */
if (typeof window.theme === 'undefined') {
	window.theme = {
		fonts: ['Roboto', 'Playfair Display'],
		customPreventRules: '',
		animations: {
			flyingHeadingsStagger: 0.25,
			timeScale: {
				onScrollReveal: 1,
				overlayMenuOpen: 1,
				overlayMenuClose: 1.5,
			}
		}
	}
}

/**
 * ScrollMagic Setup
 */
window.SMController = new ScrollMagic.Controller();
window.SMController.enabled(false);
window.SMSceneTriggerHook = 0.85;
window.SMSceneReverse = false;

/**
 * Don't save scroll position
 * after AJAX transition
 */
if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}

/**
 * Page Load Strategy
 */
$window.on('load', function () {

	fontObserver()
		.then(function () {
			return doSplitText();
		})
		.then(function () {
			return setLines();
		})
		.then(function () {
			return setChars();
		})
		.then(function () {
			lazyLoad(window.$document);
			initComponents(window.$document);
			return window.PagePreloader.finish();
		})
		.then(function () {
			window.SMController.enabled(true);
			window.SMController.update(true);
		});

	new PJAX();

});

/**
 * Init Template Components
 */
function initComponents($scope = window.$document) {

	window.PageHeader = new Header();

	if (typeof window.PageMenu === 'undefined') {
		window.PageMenu = new MenuOverlay();
	}

	new SectionMasthead($scope);
	new SectionPortfolio($scope);
	new SectionNavProjects($scope);
	new SectionFullscreenSlider($scope);
	new SectionContent($scope);
	new SectionAbout($scope);
	new SectionServices($scope);
	new SectionTestimonials($scope);
	new SectionAwards($scope);
	new SliderImages($scope);
	new SliderProjects($scope);
	new SliderLetters($scope);
	$('.js-video').magnificPopup();
	new ScrollDown();
	new Form();
	new GMap($scope);
	new ButtonCircle($scope);
	new Grid();

	fixMobileBarHeight();
	lazyLoad($scope);
	$('[data-art-parallax]').artParallax({
		ScrollMagicController: window.SMController,
		SmoothScrollController: window.SB
	});

}

/* ======================================================================== */
/* 1. PJAX Animate Clonned Heading */
/* ======================================================================== */
function PJAXAnimateClonnedHeading(data, $customPositionElement) {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax(),
			$nextContainer = $(data.next.container),
			$trigger = $(data.trigger),
			$nextContent = $nextContainer.find('.page-wrapper__content'),
			$clonnedHeading = $('.js-text-to-fly.clone'),
			$clonnedHeadingChars = $clonnedHeading.find('.split-text__char.clone'),
			$mastheadHeading = $nextContainer.find('.section-masthead .js-text-to-fly'),
			staggerAmount = 0.25,
			$mastheadHeadingChars,
			$mastheadHeadingWords,
			$mastheadHeadingLines,
			coordinates = [],
			setMastheadHeadingChars,
			CSSProperties,
			from;

		if (!$mastheadHeading.length) {

			tl.set($nextContent, {
					y: '10vh',
					force3D: true
				})
				.to($clonnedHeading, 0.6, {
					autoAlpha: 0,
					display: 'none',
					y: '-100%'
				})
				.to(window.$curtain, 1.2, {
					y: '-100%',
					ease: Expo.easeInOut
				}, '0.6')
				.to($nextContent, 2.4, {
					y: '0vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '0')
				.set(window.$curtain, {
					y: '100%',
					display: 'none'
				})
				.set($trigger, {
					autoAlpha: 1
				})
				.add(function () {
					$clonnedHeading.remove();
				})
				.add(function () {
					resolve(true);
				}, '0.8');

			return;

		}

		if (window.theme !== 'undefined') {
			staggerAmount = window.theme.animations.flyingHeadingsStagger || 0.25;
		}

		$mastheadHeadingChars = $mastheadHeading.find('.split-text__char');
		$mastheadHeadingWords = $mastheadHeading.find('.split-text__word');
		$mastheadHeadingLines = $mastheadHeading.find('.split-text__line');
		CSSProperties = $mastheadHeadingChars.css(['text-align', 'font-size', 'line-height', 'color', 'opacity']);
		from = PJAXGetFlyingDirection($clonnedHeading, $mastheadHeading);

		// clear any transforms for the correct
		// position calculation
		setMastheadHeadingChars = new Promise(function (resolve, reject) {

			TweenMax.set([$nextContent, $mastheadHeadingChars, $mastheadHeadingWords, $mastheadHeadingLines], {
				clearProps: 'transform',
				onComplete: function () {

					$mastheadHeadingChars.each(function (index) {

						var current = $(this).get(0).getBoundingClientRect();

						coordinates[index] = {
							top: current.top,
							left: current.left
						};

					});

					resolve(true);

				}
			});

		});


		setMastheadHeadingChars.then(function () {

			tl
				.set($nextContent, {
					y: '10vh',
					force3D: true
				})
				.staggerTo($clonnedHeadingChars, 1.2, {
					position: 'absolute',
					fontSize: CSSProperties['font-size'],
					lineHeight: CSSProperties['line-height'],
					transform: 'none',
					autoAlpha: 1,
					cycle: {
						left: function (index) {

							if (coordinates[index]) {
								return coordinates[index].left + 'px';
							} else {
								$clonnedHeadingChars[index].remove();
								return '0px';
							}

						},
						top: function (index) {

							if (coordinates[index]) {
								return coordinates[index].top + 'px';
							} else {
								$clonnedHeadingChars[index].remove();
								return '0px';
							}

						}
					},
					stagger: distributeByPosition({
						amount: staggerAmount,
						from: from
					}),
					ease: Power3.easeInOut,
					force3D: true
				})
				.set([$mastheadHeadingChars, $mastheadHeadingWords, $mastheadHeadingLines], {
					autoAlpha: 1,
					clearProps: 'transform'
				}, '+=0.6')
				.add(function () {
					$clonnedHeading.remove();
				})
				.add(function () {
					if ($mastheadHeading.hasClass('section-masthead__heading-big')) {
						tl.to($clonnedHeadingChars, 1.2, {
							opacity: .3
						}, '0.6');
					}
				}, '0.6')
				.to($clonnedHeadingChars, 1.2, {
					color: CSSProperties['color'],
				}, '0.6')
				.to(window.$curtain, 1.2, {
					y: '-100%',
					ease: Expo.easeInOut
				}, '0.6')
				.to($nextContent, 2.4, {
					y: '0vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '0')
				.set(window.$curtain, {
					y: '100%',
					display: 'none'
				})
				.set($trigger, {
					autoAlpha: 1
				})
				.add(function () {
					resolve(true);
				}, '0.9');

		});

	});

}

/* ======================================================================== */
/* 2. PJAX Animate Curtain */
/* ======================================================================== */
function PJAXAnimateCurtain(direction = 'in') {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax(),
			$pageContent = $('.page-wrapper__content');

		if (!window.$curtain.length) {
			resolve(true);
			return;
		}

		tl.timeScale(1.5);

		if (direction == 'in') {

			tl
				.to(window.$curtain, 1.2, {
					y: '0%',
					ease: Expo.easeInOut
				}, '0')
				.to($pageContent, 1.2, {
					y: '-5vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '-=1.0')
				.add(function () {
					resolve(true);
				});

		} else if (direction == 'out') {

			tl
				.set($pageContent, {
					y: '10vh',
					force3D: true
				}, '0')
				.to($pageContent, 2.4, {
					y: '0vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '0')
				.to(window.$curtain, 1.2, {
					y: '-100%',
					ease: Expo.easeInOut
				}, '0.6')
				.add(function () {
					resolve(true);
				}, '-=1.0');

		}

	});

}

/* ======================================================================== */
/* 3. PJAX Clone Heading */
/* ======================================================================== */
function PJAXCloneHeading(data, $customPositionElement) {

	return new Promise(function (resolve, reject) {
		var
			tl = new TimelineMax(),
			$trigger = $(data.trigger),
			$pageContent = $('.page-wrapper__content'),
			$heading = $trigger.find('.js-text-to-fly'),
			$headingChars,
			CSSProperties = [],
			coordinates,
			$clone;

		window.cloneCoordinates = [];

		if (!$heading.length) {
			$heading = $trigger.parent().parent().find('.js-text-to-fly');
		}

		if (!$heading.length) {
			resolve(true);
		}

		CSSProperties = $heading.css([
			'font-size',
			'font-style',
			'font-weight',
			'line-height',
			'letter-spacing',
			'color',
			'text-align'
		]);

		$headingChars = $heading.find('.split-text__char');
		$clone = $heading.clone();
		$clone.css(CSSProperties);
		coordinates = $heading.get(0).getBoundingClientRect();

		if ($trigger.find('img').length) {

			tl.set($heading, {
				autoAlpha: 0
			});

		} else {

			tl.set($trigger, {
				autoAlpha: 0
			});

		}

		tl
			.add(function () {

				return new Promise(function (resolve, reject) {

					$clone.attr({
						'data-origin-top': coordinates['top'],
						'data-origin-left': coordinates['left'],
						'data-origin-right': coordinates['right'],
						'data-origin-bottom': coordinates['bottom'],
					});

					$headingChars.each(function (index) {

						var
							$current = $(this),
							current = $current.get(0).getBoundingClientRect(),
							$cloneChar = $clone.find('.split-text__char')[index];

						window.cloneCoordinates[index] = {
							top: current.top,
							left: current.left
						};

						TweenMax.set($cloneChar, {
							position: 'fixed',
							top: window.cloneCoordinates[index].top,
							left: window.cloneCoordinates[index].left,
							className: '+=clone',
							clearProps: 'transform',
							zIndex: 600
						});

					});

					resolve(true);

				});

			})
			.set($clone, {
				className: '+=clone',
				position: 'fixed',
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				margin: 0,
				padding: 0,
				zIndex: 600
			})
			.add(function () {
				$clone.appendTo(window.$barbaWrapper);
			})
			.add([
				window.PageHeader.hideOverlayMenu(1.5, false),
				TweenMax.to(window.$curtain, 1.2, {
					y: '0%',
					ease: Expo.easeInOut
				}),
				TweenMax.to($pageContent, 2.4, {
					y: '-5vh',
					force3D: true,
					ease: Expo.easeInOut,
				})
			])
			.add(function () {
				resolve(true);
			}, '-=1.2');

	});

}

/* ======================================================================== */
/* 4. PJAX Finish Loading */
/* ======================================================================== */
function PJAXFinishLoading(data) {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax();

		tl
			.add(function () {
				window.SMController.enabled(true);
				window.SMController.update(true);
				window.$pageHeader.removeClass('header_lock-submenus lockhover');
				window.$pageHeader.attr('data-header-animation', '');
			})
			.add(function () {
				lockScroll(false);
			}, '1.2')
			.add(function () {
				resolve(true);
			});

	});

}

/* ======================================================================== */
/* 5. PJAX Get Flying Direction */
/* ======================================================================== */
function PJAXGetFlyingDirection($clone, $target) {

	if (!$clone.length || !$target.length) {
		return 'start';
	}

	var coordinatesTarget = $target.get(0).getBoundingClientRect();

	if (
		$clone.attr('data-origin-left') > coordinatesTarget['left'] &&
		$clone.attr('data-origin-right') < coordinatesTarget['right'] &&
		$clone.css('text-align') == 'center' &&
		$target.css('text-align') == 'center'
	) {
		return 'center';
	}

	if ($clone.attr('data-origin-left') >= coordinatesTarget['left']) {
		return 'start';
	} else {
		return 'end';
	}

}

/* ======================================================================== */
/* 6. PJAX Init New Page */
/* ======================================================================== */
function PJAXInitNewPage(data) {

	return new Promise(function (resolve, reject) {

		var $nextContainer = $(data.next.container);

		Promise.all([
				// PJAXUpdateBody(data),
				PJAXUpdateNodes(data),
				PJAXUpdateHead(data),
			])
			.then(function () {
				return doSplitText();
			})
			.then(function () {
				return setLines($nextContainer);
			})
			.then(function () {
				return setChars($nextContainer);
			})
			.then(function () {

				return new Promise(function (resolve, reject) {

					// clear & re-init ScrollMagic
					window.SMController.destroy(true);
					window.SMController = new ScrollMagic.Controller();

					// re-init components
					initComponents($nextContainer);

					// don't start animations immediately
					window.SMController.enabled(false);

					// ensure that scroll is still locked
					lockScroll(true);

					// update ad trackers
					PJAXUpdateTrackers();

					setTimeout(function () {
						resolve(true);
					}, 100);

				});

			}).then(function () {

				// scroll at the page beginning
				scrollToVeryTop();

				setTimeout(function () {
					resolve(true);
				}, 100);

			});

	});

}

/* ======================================================================== */
/* 7. PJAX Prepare Transition */
/* ======================================================================== */
function PJAXPrepareTransition(data) {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax(),
			$trigger = $(data.trigger);

		tl
			.set(window.$curtain, {
				display: 'block',
				y: '100%',
				zIndex: 550
			})
			.add(function () {
				window.triggerTextAlign = $trigger.css('text-align');
			})
			.set($trigger, {
				className: '+=selected'
			})
			.add(function () {
				lockScroll(true);
			})
			.add(function () {
				resolve(true);
			})

	});

}

/* ======================================================================== */
/* 8. PJAX Transition Flying Heading */
/* ======================================================================== */
var PJAXTransitionFlyingHeading = {
	name: 'flyingHeading',
	custom: ({
		current,
		next,
		trigger
	}) => {
		return $(trigger).data('pjax-link') == 'flyingHeading';
	},

	before: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXPrepareTransition(data).then(function () {
				resolve(true);
			});

		});

	},

	beforeLeave: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXCloneHeading(data).then(function () {
				resolve(true);
			});

		});

	},

	beforeEnter: (data) => {

		return new Promise(function (resolve, reject) {

			var
				$nextContainer = $(data.next.container),
				$mastheadHeading = $nextContainer.find('.section-masthead .js-text-to-fly');

			// don't trigger reveal animation on heading
			$mastheadHeading.addClass('js-split-text_cancel-animation');
			resolve(true);

		});
	},

	enter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXInitNewPage(data).then(function () {
				resolve(true);
			});

		});
	},

	afterEnter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXAnimateClonnedHeading(data).then(function () {
				resolve(true);
			});

		});

	},

	after: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXFinishLoading(data).then(function () {
				resolve(true);
			});

		});

	}

}

/* ======================================================================== */
/* 9. PJAX Transition General */
/* ======================================================================== */
var PJAXTransitionGeneral = {

	before: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXPrepareTransition(data).then(function () {
				resolve(true);
			});

		});

	},

	beforeLeave: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXAnimateCurtain('in').then(function () {
				resolve(true);
			});

		});

	},

	enter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXInitNewPage(data).then(function () {
				resolve(true);
			});

		});
	},

	afterEnter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXAnimateCurtain('out').then(function () {
				resolve(true);
			});

		});

	},


	after: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXFinishLoading(data).then(function () {
				resolve(true);
			});

		});

	}

}

/* ======================================================================== */
/* 10. PJAX Transition Overlay Menu */
/* ======================================================================== */
var PJAXTransitionOverlayMenu = {
	name: 'overlayMenu',
	custom: ({
		current,
		next,
		trigger
	}) => {
		return $(trigger).data('pjax-link') == 'overlayMenu';
	},

	before: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXPrepareTransition(data).then(function () {
				resolve(true);
			});

		});

	},

	beforeLeave: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXCloneHeading(data).then(function () {
				resolve(true);
			});

		});

	},

	beforeEnter: (data) => {

		return new Promise(function (resolve, reject) {

			var
				$nextContainer = $(data.next.container),
				$mastheadHeading = $nextContainer.find('.section-masthead .js-text-to-fly');

			// don't trigger reveal animation on heading
			$mastheadHeading.addClass('js-split-text_cancel-animation');
			resolve(true);

		});
	},

	enter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXInitNewPage(data).then(function () {
				resolve(true);
			});

		});
	},

	afterEnter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXAnimateClonnedHeading(data).then(function () {
				resolve(true);
			});

		});

	},

	after: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXFinishLoading(data).then(function () {
				resolve(true);
			});

		});

	}

}

/* ======================================================================== */
/* 11. PJAX Update Body */
/* ======================================================================== */
function PJAXUpdateBody(data) {

	return new Promise(function (resolve, reject) {

		var
			regexp = /\<body.*\sclass=["'](.+?)["'].*\>/gi,
			match = regexp.exec(data.next.html);

		if (!match || !match[1]) {
			resolve(true);
		}

		document.body.setAttribute('class', match[1]);

		resolve(true);

	});

}

/* ======================================================================== */
/* 12. PJAX Update Head */
/* ======================================================================== */
function PJAXUpdateHead(data) {

	return new Promise(function (resolve, reject) {

		var
			head = document.head,
			newPageRawHead = data.next.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
			newPageHead = document.createElement('head');

		newPageHead.innerHTML = newPageRawHead;

		var headTags = [
			'meta[name="keywords"]',
			'meta[name="description"]',
			'meta[property^="og"]',
			'meta[name^="twitter"]',
			'meta[itemprop]',
			'link[itemprop]',
			'link[rel="prev"]',
			'link[rel="next"]',
			'link[rel="canonical"]',
			'link[rel="alternate"]',
			'link[id*="elementor"]',
			'style[id*="elementor"]'
		].join(',');

		var
			oldHeadTags = head.querySelectorAll(headTags),
			newHeadTags = newPageHead.querySelectorAll(headTags);

		for (var i = 0; i < oldHeadTags.length; i++) {
			head.removeChild(oldHeadTags[i]);
		}

		for (var i = 0; i < newHeadTags.length; i++) {
			head.insertBefore(newHeadTags[i], head.querySelector('link[rel="stylesheet"]'));
		}

		resolve(true);

	});

}

/* ======================================================================== */
/* 13. PJAX Update Nodes */
/* ======================================================================== */
function PJAXUpdateNodes(data) {

	return new Promise(function (resolve, reject) {

		var
			$nextContainer = $($.parseHTML(data.next.html)),
			nodesToUpdate = [
				'.header',
				'.header__wrapper-overlay-menu',
				'.transition-curtain'
			]; // selectors of elements that needed to update

		$.each(nodesToUpdate, function () {

			var
				$item = $(this),
				$nextItem = $nextContainer.find(this);

			// sync attributes if element exist in the new container
			if ($nextItem.length) {
				syncAttributes($nextItem, $item);
			}

		});

		resolve(true);
		f
	});

}

/* ======================================================================== */
/* 14. PJAX Update Trackers */
/* ======================================================================== */
function PJAXUpdateTrackers() {

	updateGA();
	updateFBPixel();
	updateYaMetrika();

	/**
	 * Google Analytics
	 */
	function updateGA() {

		if (typeof gtag === 'function') {

			if (window.gaData !== 'undefined' && Object.keys(window.gaData)[0] !== 'undefined') {

				var
					trackingID = Object.keys(window.gaData)[0],
					pageRelativePath = (window.location.href).replace(window.location.origin, '');

				gtag('js', new Date());
				gtag('config', trackingID, {
					'page_title': document.title,
					'page_path': pageRelativePath
				});

			}

		}

	}

	/**
	 * Facebook Pixel
	 */
	function updateFBPixel() {

		if (typeof fbq === 'function') {
			fbq('track', 'PageView');
		}

	}

	/**
	 * Yandex Metrika
	 */
	function updateYaMetrika() {

		if (typeof ym === 'function') {

			var trackingID = getYmTrackingNumber();

			ym(trackingID, 'hit', window.location.href, {
				title: document.title
			});

		}

		function getYmTrackingNumber() {

			if (typeof window.Ya !== 'undefined' && typeof window.Ya.Metrika2) {
				return window.Ya.Metrika2.counters()[0].id || null;
			}

			if (typeof window.Ya !== 'undefined' && typeof window.Ya.Metrika) {
				return window.Ya.Metrika.counters()[0].id || null;
			}

			return null;

		}

	}

}

/* ======================================================================== */
/* 15. PJAX */
/* ======================================================================== */
var PJAX = function () {

	var $barbaWrapper = $('[data-barba="wrapper"]');

	if (!$barbaWrapper.length) {
		return;
	}

	barba.init({

		timeout: 6000,

		// don't trigger barba for links outside wrapper 
		prevent: ({
			el
		}) => {

			var
				$el = $(el),
				exludeRules = [
					'[data-elementor-open-lightbox]', // Elementor lightbox gallery
					'.lang-switcher a' // Polylang & WPML language switcher
				];

			// elementor preview
			if (typeof elementor === 'object') {
				return true;
			}

			// clicked on elementor ouside barba wrapper
			if ($el.closest($barbaWrapper).length < 1) {
				return true;
			}

			// custom rules from WordPress Customizer
			if (window.theme.customPreventRules) {
				exludeRules.push(window.theme.customPreventRules);
			}

			// check against array of rules to prevent
			return $el.is(exludeRules.join(','));

		},
		// custom transitions
		transitions: [
			PJAXTransitionGeneral,
			PJAXTransitionFlyingHeading,
			PJAXTransitionOverlayMenu,
		]

	});


}

/* ======================================================================== */
/* 16. ButtonCircle */
/* ======================================================================== */
var ButtonCircle = function ($scope) {

	var $target = $scope.find('.js-button-circle');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			$current = $(this),
			$currentCircle = $current.find('.circle'),
			tl = new TimelineMax();

		tl.set($currentCircle, {
			drawSVG: '100% 100%'
		});

		$current.on('mouseenter touchstart', function () {

			tl
				.clear()
				.fromTo($currentCircle, 0.6, {
					drawSVG: '100% 100%'
				}, {
					drawSVG: '0% 100%',
					ease: Power3.easeInOut,
				});

		}).on('mouseleave touchend', function () {

			tl
				.clear()
				.to($currentCircle, 0.6, {
					drawSVG: '0% 0%',
					ease: Power3.easeInOut
				});

		});

	});

}

/* ======================================================================== */
/* 17. ButtonCircles */
/* ======================================================================== */
var ButtonCircles = function ($target) {

	if (!$target.length) {
		return;
	}

	var
		$circles = $target.find('.circle'),
		tl = new TimelineMax();

	tl.set($circles, {
		drawSVG: '0% 0%',
	});

	$target
		.on('mouseenter touchstart', function () {

			tl
				.clear()
				.staggerTo($circles, 0.6, {
					drawSVG: '0% 100%',
					ease: Power4.easeOut,
				}, 0.05);

		})
		.on('mouseleave touchend', function () {

			tl
				.clear()
				.staggerTo($circles, 0.6, {
					drawSVG: '0% 0%',
					ease: Power4.easeOut
				}, 0.05);

		});

}

/* ======================================================================== */
/* 18. Counter */
/* ======================================================================== */
var Counter = function ($target) {

	var $num = $target.find('.js-counter__number');

	if (!$target.length || !$num.length) {
		return;
	}

	var
		numberStart = $target.data('counter-start') || 0,
		numberTarget = $target.data('counter-target') || 100,
		animDuration = $target.data('counter-duration') || 4,
		counter = {
			val: numberStart
		};

	setCounterUp();
	animateCounterUp();

	function setCounterUp() {

		$num.text(numberStart.toFixed(0));

	}

	function animateCounterUp() {

		var tl = new TimelineMax();

		tl.to(counter, animDuration, {
			val: numberTarget.toFixed(0),
			ease: Power4.easeOut,
			onUpdate: function () {
				$num.text(counter.val.toFixed(0));
			}
		});

		createOSScene($target, tl);

	}

}

/* ======================================================================== */
/* 19. figureAward */
/* ======================================================================== */
var FigureAward = function ($target) {

	if (!$target.length) {
		return;
	}

	var
		tl = new TimelineMax();

	tl
		.add(animateLines($target, 1.2, 0.1), '0')
		.add(animateChars($target, 1.2, 0.3, Power3.easeOut), '0');

	createOSScene($target, tl);

}

/* ======================================================================== */
/* 20. FigurePortfolioAnimation */
/* ======================================================================== */
var FigurePortfolioAnimation = function ($target, animDelay = 0) {

	var
		$heading,
		$category,
		$letter,
		$imgWrapper,
		tl;

	$heading = $target.find('.figure-portfolio-big__heading');
	$category = $target.find('.figure-portfolio-big__category');
	$letter = $target.find('.figure-portfolio-big__wrapper-letter');
	$imgWrapper = $target.find('.figure-portfolio-big__wrapper-img');
	tl = new TimelineMax();

	prepare();
	animate();

	function prepare() {

		setChars($target, 0, -20);

		TweenMax.set($imgWrapper, {
			scaleY: 1.25,
			y: '25%',
			transformOrigin: 'top center',
			autoAlpha: 0
		});

		TweenMax.set($letter, {
			autoAlpha: 0,
			y: '200px'
		});

	}

	function animate() {

		tl
			.to($letter, 1.2, {
				y: 0,
				yPercent: 0,
				autoAlpha: 1,
				ease: Power3.easeOut,
				force3D: true
			})
			.to($imgWrapper, 1.2, {
				autoAlpha: 1,
				scaleY: 1,
				y: '0%',
				ease: Power3.easeOut,
				force3D: true,
				z: 0.01
			}, '-=0.8')
			.add(animateChars($heading, 1.2, 0.3, Power3.easeOut), '-=0.8')
			.add(animateChars($category, 1.2, 0.3, Power3.easeOut), '-=1.2');

		createOSScene($target, tl, null, false, animDelay);

	}

}

/* ======================================================================== */
/* 21. FigurePortfolioHover */
/* ======================================================================== */
var FigurePortfolioHover = function ($target) {

	var
		tl,
		$curtain,
		$category,
		$heading,
		$icon,
		$img;

	if (!$target.length) {
		return;
	}

	tl = new TimelineMax();
	$curtain = $target.find('.figure-portfolio__curtain');
	$category = $target.find('.figure-portfolio__category');
	$heading = $target.find('.figure-portfolio__heading');
	$img = $target.find('img');
	$icon = $target.find('.figure-portfolio__icon');

	setChars($target, 50);

	TweenMax.set($category, {
		autoAlpha: 0,
		y: '-40px'
	});

	TweenMax.set($icon, {
		autoAlpha: 0,
		x: '40px'
	});

	$target
		.on('mouseenter touchstart', function () {

			tl
				.clear()
				.to($curtain, 0.6, {
					y: '0%',
					skewY: '-5deg',
					ease: Power3.easeInOut
				})
				.to($img, 0.6, {
					y: '-40px',
					ease: Power3.easeInOut
				}, '0')
				.add(animateChars($heading, 0.6, 0.2, Power3.easeOut), '0.2')
				.to($category, 0.6, {
					autoAlpha: 1,
					y: '0px',
					ease: Power3.easeOut
				}, '0.2')
				.to($icon, 0.6, {
					autoAlpha: 1,
					x: '0px',
					ease: Power3.easeOut
				}, '0.4');

		})
		.on('mouseleave touchend', function () {

			tl
				.clear()
				.add(hideChars($heading, 0.6, 0.2, Power3.easeOut, 50, 0, 'end'), '0')
				.to($category, 0.6, {
					autoAlpha: 0,
					y: '-40px',
					ease: Power3.easeOut
				}, '0')
				.to($icon, 0.6, {
					autoAlpha: 0,
					x: '40px',
					ease: Power3.easeOut
				}, '0.2')
				.to($curtain, 0.6, {
					y: '100%',
					skewY: '0deg',
					ease: Power3.easeOut,
				}, '0.3')
				.to($img, 0.6, {
					y: '0px',
					ease: Power3.easeOut
				}, '0.3');


		});

}

/* ======================================================================== */
/* 22. Filter */
/* ======================================================================== */
var Filter = function ($scope, $filter) {

	if (!$filter.length) {
		return;
	}

	var
		self = this,
		itemClass = '.js-filter__item',
		$items = $scope.find(itemClass),
		activeItemClass = 'filter__item_active';

	this.$filter = $scope.find($filter);
	this.$items = $scope.find($items);

	bindEvents();
	updateLinePosition();

	function bindEvents() {

		$($scope)
			.on('mouseenter', itemClass, function () {

				updateLinePosition($(this));

			})
			.on('mouseleave', itemClass, function () {

				updateLinePosition($items.filter('.' + activeItemClass));

			})
			.on('click', itemClass, function () {

				var $el = $(this);

				$items.removeClass(activeItemClass);
				$el.addClass(activeItemClass);
				updateLinePosition($el);

			});

	}

	function updateLinePosition($target) {

		var
			$line = self.$filter.find('.js-filter__underline');

		if (!$line.length) {
			return;
		}

		if (!$target || !$target.length) {

			TweenMax.to($line, 0.6, {
				width: 0,
				ease: Expo.easeOut,
			});

		} else {

			var
				$heading = $target.find('div'),
				headingWidth = $heading.innerWidth(),
				headingPos = $heading.position(),
				colPos = $target.position();

			TweenMax.to($line, 0.6, {
				ease: Expo.easeInOut,
				width: headingWidth,
				x: headingPos.left + colPos.left,
			});

		}

	}

	function setActiveItem(index) {

		var $target = $items.eq(index);
		if (!$target) {
			return;
		}

		$items.removeClass(activeItemClass);
		$target.addClass(activeItemClass);
		updateLinePosition($target, self.$filter);

	}

	this.setActiveItem = function (index) {
		setActiveItem(index);
	}

}

/* ======================================================================== */
/* 23. fontObserver */
/* ======================================================================== */
function fontObserver() {

	return new Promise(function (resolve, reject) {

		var observers = [];

		if (!window.theme.fonts) {
			resolve(true);
		}

		$.each(window.theme.fonts, function () {

			var currentObserver = new FontFaceObserver(this);

			observers.push(currentObserver.load());

		});

		Promise.all(observers).then(function () {
			resolve(true);
		});

	});

}

/* ======================================================================== */
/* 24. Form */
/* ======================================================================== */
var Form = function () {

	floatLabels();
	ajaxForm();

	function floatLabels() {

		var
			INPUT_CLASS = '.input-float__input',
			INPUT_NOT_EMPTY = 'input-float__input_not-empty',
			INPUT_FOCUSED = 'input-float__input_focused';

		if (!$(INPUT_CLASS).length) {
			return;
		}

		$(INPUT_CLASS).each(function () {

			var
				$currentField = $(this),
				$currentControlWrap = $currentField.parent('.wpcf7-form-control-wrap');

			if ($currentField.val()) {
				$currentField.addClass(INPUT_NOT_EMPTY);
				$currentControlWrap.addClass(INPUT_NOT_EMPTY);
			} else {
				$currentField.removeClass([INPUT_FOCUSED, INPUT_NOT_EMPTY]);
				$currentControlWrap.removeClass([INPUT_FOCUSED, INPUT_NOT_EMPTY]);
			}

		});

		$(document).on('focusin', INPUT_CLASS, function () {

			var
				$currentField = $(this),
				$currentControlWrap = $currentField.parent('.wpcf7-form-control-wrap');

			$currentField.addClass(INPUT_FOCUSED).removeClass(INPUT_NOT_EMPTY);
			$currentControlWrap.addClass(INPUT_FOCUSED).removeClass(INPUT_NOT_EMPTY);

		}).on('focusout', INPUT_CLASS, function () {

			var
				$currentField = $(this),
				$currentControlWrap = $currentField.parent('.wpcf7-form-control-wrap');

			if ($currentField.val()) {
				$currentField.removeClass(INPUT_FOCUSED).addClass(INPUT_NOT_EMPTY);
				$currentControlWrap.removeClass(INPUT_FOCUSED).addClass(INPUT_NOT_EMPTY);
			} else {
				$currentField.removeClass(INPUT_FOCUSED);
				$currentControlWrap.removeClass(INPUT_FOCUSED);
			}

		});

	}

	function ajaxForm() {

		var $form = $('.js-ajax-form');

		if (!$form.length) {
			return;
		}

		$form.validate({
			errorElement: 'span',
			errorPlacement: function (error, element) {
				error.appendTo(element.parent()).addClass('form__error');
			},
			submitHandler: function (form) {
				ajaxSubmit(form);
			}
		});

		function ajaxSubmit(form) {

			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize()
			}).done(function () {
				alert($form.attr('data-message-success'));
				$form.trigger('reset');
				floatLabels();
			}).fail(function () {
				alert($form.attr('data-message-error'));
			});
		}

	}

}

/* ======================================================================== */
/* 25. gmap */
/* ======================================================================== */
var GMap = function ($scope) {

	var
		$wrapper = $scope.find('.gmap'),
		prevInfoWindow = false;

	if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
		return;
	}

	createMap($wrapper);

	/**
	 * 
	 * @param {Map jQuery Object} $wrapper 
	 */
	function createMap($wrapper) {

		var $mapContainer = $wrapper.find('.gmap__container');

		if (!$mapContainer.length) {
			return;
		}

		var
			$markers = $wrapper.find('.gmap__marker'),
			ZOOM = parseInt($wrapper.attr('data-gmap-zoom')),
			SNAZZY_STYLES = $wrapper.attr('data-gmap-snazzy-styles');

		var argsMap = {
			center: new google.maps.LatLng(0, 0),
			zoom: ZOOM,
			scrollwheel: false
		};

		if (SNAZZY_STYLES) {

			try {
				SNAZZY_STYLES = JSON.parse(SNAZZY_STYLES);
				$.extend(argsMap, {
					styles: SNAZZY_STYLES
				});
			} catch (err) {
				console.error('Google Map: Invalid Snazzy Styles');
			}

		};

		var map = new google.maps.Map($mapContainer[0], argsMap);

		map.markers = [];

		$markers.each(function () {
			createMarker($(this), map);
		});

		centerMap(ZOOM, map);

	}

	/**
	 * 
	 * @param {Marker jQuery object} $marker 
	 * @param {Google Map Instance} map
	 */
	function createMarker($marker, map) {

		if (!$marker.length) {
			return;
		}

		var
			MARKER_LAT = parseFloat($marker.attr('data-marker-lat')),
			MARKER_LON = parseFloat($marker.attr('data-marker-lon')),
			MARKER_IMG = $marker.attr('data-marker-img'),
			MARKER_WIDTH = $marker.attr('data-marker-width'),
			MARKER_HEIGHT = $marker.attr('data-marker-height'),
			MARKER_CONTENT = $marker.attr('data-marker-content');

		/**
		 * Marker
		 */
		var argsMarker = {
			position: new google.maps.LatLng(MARKER_LAT, MARKER_LON),
			map: map
		};

		if (MARKER_IMG) {

			$.extend(argsMarker, {
				icon: {
					url: MARKER_IMG
				}
			});

		}

		if (MARKER_IMG && MARKER_WIDTH && MARKER_HEIGHT) {

			$.extend(argsMarker.icon, {
				scaledSize: new google.maps.Size(MARKER_WIDTH, MARKER_HEIGHT)
			});

		}

		var marker = new google.maps.Marker(argsMarker)

		map.markers.push(marker);

		/**
		 * Info Window (Content)
		 */
		if (MARKER_CONTENT) {

			var infoWindow = new google.maps.InfoWindow({
				content: MARKER_CONTENT
			});

			marker.addListener('click', function () {

				if (prevInfoWindow) {
					prevInfoWindow.close();
				}

				prevInfoWindow = infoWindow;

				infoWindow.open(map, marker);

			});

		}

	}

	/**
	 * 
	 * @param {Map Zoom} zoom 
	 * @param {Google Map Instance} map
	 */
	function centerMap(zoom, map) {

		var
			bounds = new google.maps.LatLngBounds(),
			newZoom;

		$.each(map.markers, function () {

			var item = this;

			if (typeof item.position === 'undefined') {
				return;
			}

			newZoom = new google.maps.LatLng(item.position.lat(), item.position.lng());
			bounds.extend(newZoom);

		});

		if (map.markers.length == 1) {

			map.setCenter(bounds.getCenter());
			map.setZoom(zoom);

		} else {

			map.fitBounds(bounds);

		}
	}

}

/* ======================================================================== */
/* 26. grid */
/* ======================================================================== */
var Grid = function ($target = $('.js-grid')) {

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			$current = $(this),
			$currentLazyImages = $current.find('img[data-src]'),
			currentInstance;

		currentInstance = $current.isotope({
			itemSelector: '.js-grid__item',
			columnWidth: '.js-grid__sizer',
			percentPosition: true
		});

		loadLazyImages($currentLazyImages, false, function () {
			$current.imagesLoaded().always(function () {
				currentInstance.isotope('layout');
			});
		});

		// update non-lazy images
		$current.imagesLoaded().always(function () {
			currentInstance.isotope('layout');
		});

	});

	return $target;

}

/* ======================================================================== */
/* 27. Header */
/* ======================================================================== */
var Header = function () {

	var $overlay = $('.header__wrapper-overlay-menu');

	this.hideOverlayMenu = function (speed, setMenu) {

		return closeOverlayMenu(speed, setMenu);

	};

	if (!$overlay.length) {
		return;
	}

	var
		$stickyHeader = $('.js-sticky-header'),
		$burger = $('#js-burger'),
		$menuLinks = $overlay.find('.menu-overlay > li > a'),
		$allLinks = $overlay.find('a'),
		$submenu = $overlay.find('.menu-overlay .sub-menu'),
		$submenuButton = $('#js-submenu-back'),
		$submenuLinks = $submenu.find('> li > a'),
		$overlayWidgets = $overlay.find('.header__wrapper-overlay-widgets'),
		$social = $overlayWidgets.find('.social'),
		$headerLeft = $('.header__col-left'),
		$headerRight = $('.header__col-right'),
		$langSwitcher = $('.lang-switcher'),
		$curtain = $('.header__curtain'),
		$circleLetters = $('.header__circle-letters'),
		$widgetListElements = $('.header__wrapper-overlay-widgets ul li'),
		OPEN_CLASS = 'header__burger_opened',
		STICKY_CLASS = 'header_sticky',
		STICKY_THEME = $stickyHeader.attr('data-header-sticky-theme');

	clickBurger();
	setOverlayMenu();
	stickHeader();

	function stickHeader() {

		if (!$stickyHeader.length) {
			return;
		}

		if (window.SB === undefined) {

			window.stickyScene = new $.ScrollMagic.Scene({
					offset: '1px',
				})
				.setClassToggle($stickyHeader, STICKY_CLASS + ' ' + STICKY_THEME)
				.addTo(SMController);

		} else {

			window.SB.addListener(changeHeaderClass);

		}

	}

	function unstickHeader() {

		if (!$stickyHeader.length) {
			return;
		}

		if (window.SB === undefined) {

			if (window.stickyScene) {

				window.stickyScene.destroy(true);
				$stickyHeader.removeClass(STICKY_CLASS);

			}

		} else {

			window.SB.removeListener(changeHeaderClass);
			$stickyHeader.removeClass(STICKY_CLASS);

		}

	}

	function changeHeaderClass() {

		if (window.SB.offset.y >= 1) {
			$stickyHeader.addClass(STICKY_CLASS).addClass(STICKY_THEME);
		} else {
			$stickyHeader.removeClass(STICKY_CLASS).removeClass(STICKY_THEME);
		}

	}

	function setOverlayMenu() {

		getScrollTop();

		TweenMax.set($overlay, {
			autoAlpha: 0,
			className: '-=opened',
		});

		TweenMax.set([$submenu, $submenuButton], {
			autoAlpha: 0
		});

		TweenMax.set($submenu, {
			className: '-=opened'
		});

		TweenMax.set($curtain, {
			y: '-110%',
		});

		TweenMax.set($circleLetters, {
			autoAlpha: 0
		});

		TweenMax.set($menuLinks.find('.split-text__line'), {
			y: '100%',
			autoAlpha: 0
		});

		TweenMax.set($menuLinks.find('.split-text__char'), {
			clearProps: 'transform',
			autoAlpha: 1
		});

		setLines($overlayWidgets);

		TweenMax.set($social, {
			autoAlpha: 0,
			y: '100%'
		});

		TweenMax.set($submenuLinks.find('.split-text__line'), {
			clearProps: 'transform',
			autoAlpha: 1
		});

		TweenMax.set($submenuLinks.find('.split-text__char'), {
			x: '50px',
			autoAlpha: 0
		});

		TweenMax.set($widgetListElements, {
			autoAlpha: 0,
			y: '50px'
		});

		$allLinks.removeClass('selected');

	};

	function openOverlayMenu() {

		var
			tl = new TimelineMax(),
			$pageContent = $('.page-wrapper__content');

		// adjust animation menu master speed
		if (window.theme !== 'undefined') {

			var scale = window.theme.animations.timeScale.overlayMenuOpen || 1;
			tl.timeScale(scale);

		}

		tl
			.set($overlay, {
				autoAlpha: 1,
				zIndex: 500
			}, '0')
			.add(function () {
				window.$pageHeader.attr('data-header-animation', 'intransition');
				getScrollTop();
			})
			.set($overlay, {
				className: '+=opened'
			})
			.to($curtain, 1.2, {
				y: '0%',
				ease: Expo.easeInOut,
			})
			.to($pageContent, 1.2, {
				y: '10vh',
				force3D: true,
				ease: Expo.easeInOut
			}, '-=1.2')
			.add(animateLines($menuLinks, 1.2, 0.05), '-=0.6')
			.staggerTo($widgetListElements, 0.6, {
				autoAlpha: 1,
				y: '0px'
			}, 0.03, '-=1.2')
			.add(animateLines($overlayWidgets, 1.2, 0.05), '-=1.2')
			.to($social, 0.6, {
				autoAlpha: 1,
				y: '0%'
			}, '-=1.2')
			.to($circleLetters, 1.2, {
				autoAlpha: 1,
			}, '-=1.2')
			.to([$headerLeft, $langSwitcher, $headerRight], 1.2, {
				x: '30px',
				autoAlpha: 0,
				ease: Expo.easeInOut
			}, '0')
			.to($pageContent, 0.3, {
				display: 'none'
			})
			.add(function () {
				unstickHeader();
			}, '0.6')
			.add(function () {
				lockScroll(true);
			}, '1.2')
			.add(function () {
				window.$pageHeader.attr('data-header-animation', '');
			});

	};

	function closeOverlayMenu(speed, setMenu = true) {

		var
			tl = new TimelineMax(),
			$pageContent,
			$submenuLinksCurrent;

		if (!$overlay.hasClass('opened')) {
			return tl;
		}

		$pageContent = $('.page-wrapper__content');
		$submenuLinksCurrent = $submenu.filter('.opened').find($submenuLinks);

		// adjust animation menu master speed
		if (window.theme !== 'undefined' && !speed) {

			var scale = window.theme.animations.timeScale.overlayMenuClose || 1;
			tl.timeScale(scale);

		} else {

			tl.timeScale(speed);

		}

		tl
			.set($overlay, {
				zIndex: 500
			})
			.add(function () {
				window.$pageHeader.attr('data-header-animation', 'intransition');
			})
			.add(function () {

				restoreScrollTop();
				stickHeader();

				if (typeof window.SB !== 'undefined' && window.SB.offset.y >= 1) {
					$stickyHeader.addClass(STICKY_CLASS);
				}

				if (setMenu === true) {
					lockScroll(false);
				}

			}, '0.6')
			.set($burger, {
				className: '-=header__burger_opened'
			}, '0')
			.set($pageContent, {
				y: '5vh',
				force3D: true
			}, '0')
			.add(hideLines($menuLinks, 1.2, 0.05, '-100%', true), '0')
			.add(hideLines($submenuLinksCurrent, 1.2, 0.05, '-100%', Power3.easeInOut, true), '0')
			.add(hideLines($overlayWidgets, 0.6), '0')
			.to($social, 0.6, {
				autoAlpha: 0,
				y: '-100%'
			}, '0')
			.staggerTo($widgetListElements, 0.6, {
				autoAlpha: 0,
				y: '-30px'
			}, 0.03, '0')
			.to($circleLetters, 1.2, {
				autoAlpha: 0,
			}, '0')
			.to($curtain, 1.2, {
				y: '-110%',
				ease: Expo.easeInOut
			}, '0.6')
			.to($pageContent, 2.4, {
				y: '0vh',
				force3D: true,
				autoAlpha: 1,
				ease: Expo.easeInOut,
				display: 'block'
			}, '0')
			.to($submenuButton, 0.6, {
				x: '-10px',
				autoAlpha: 0
			}, '0')
			.staggerFromTo([$headerLeft, $langSwitcher, $headerRight], 2.4, {
				x: '-50px',
			}, {
				x: '0px',
				autoAlpha: 1,
				ease: Expo.easeInOut
			}, 0.05, '0.4')
			.set($overlay, {
				className: '-=opened'
			}, '1')
			.add(function () {
				window.$pageHeader.attr('data-header-animation', '');
				if (setMenu === true) {
					setOverlayMenu();
				}
			});

		return tl;

	};

	function clickBurger() {

		$burger.off().on('click', function (e) {

			e.preventDefault();

			if (window.$pageHeader.attr('data-header-animation') !== 'intransition') {

				if ($burger.hasClass(OPEN_CLASS)) {
					closeOverlayMenu();
					$burger.removeClass(OPEN_CLASS);
				} else {
					openOverlayMenu();
					$burger.addClass(OPEN_CLASS);
				}

			}

		});

	};

}

/* ======================================================================== */
/* 28. menu */
/* ======================================================================== */
/* ======================================================================== */
/* Menu */
/* ======================================================================== */
var Menu = function () {

	var $menu = $('.js-overlay-menu');

	if (!$menu.length) {
		return;
	}

	var
		$overlay = $('.header__wrapper-overlay-menu'),
		$links = $menu.find('.menu-item-has-children > a'),
		$submenus = $menu.find('.overlay-sub-menu'),
		$submenuButton = $('.js-submenu-back'),
		OPEN_CLASS = 'opened',
		tl = new TimelineMax();

	function openSubmenu($submenu, $currentMenu) {

		var
			$currentLinks = $currentMenu.find('> li > a .overlay-menu__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .overlay-menu__item-wrapper');

		tl
			.clear()
			.set($submenu, {
				autoAlpha: 1,
				zIndex: 100,
				y: '0px'
			})
			.to($currentLinks, 0.6, {
				y: '-100%',
				ease: Power4.easeIn
			}, '-=0.3')
			.staggerTo($submenuLinks, 0.6, {
				y: '0%',
				ease: Power4.easeOut
			}, 0.05);

		$submenus.removeClass(OPEN_CLASS);
		$submenu.not($menu).addClass(OPEN_CLASS);

		if ($submenus.hasClass(OPEN_CLASS)) {
			tl.to($submenuButton, 0.3, {
				autoAlpha: 1,
				y: '0px'
			}, '-=0.6');
		} else {
			tl.to($submenuButton, 0.3, {
				autoAlpha: 0,
				y: '10px'
			}, '-=0.6');
		}

	}

	function closeSubmenu($submenu, $currentMenu) {

		var
			$currentLinks = $currentMenu.find('> li > a .overlay-menu__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .overlay-menu__item-wrapper');

		tl
			.clear()
			.set($submenu, {
				zIndex: -1
			})
			.to($submenuLinks, 0.6, {
				y: '100%',
				ease: Power4.easeIn
			}, '-=0.3')
			.staggerTo($currentLinks, 0.6, {
				y: '0%',
				ease: Power4.easeOut
			}, 0.05)
			.set($submenu, {
				autoAlpha: 0,
				y: '10px'
			});

		$submenus.removeClass(OPEN_CLASS);
		$currentMenu.not($menu).addClass(OPEN_CLASS);

		if ($submenus.hasClass(OPEN_CLASS)) {
			TweenMax.to($submenuButton, 0.3, {
				autoAlpha: 1,
				y: '0px'
			}, '-=0.6');
		} else {
			TweenMax.to($submenuButton, 0.3, {
				autoAlpha: 0,
				y: '10px'
			}, '-=0.6');
		}

	}

	$links.on('click', function (e) {

		e.preventDefault();

		if (!$overlay.hasClass('in-transition')) {
			var
				$el = $(this),
				$currentMenu = $el.parents('ul'),
				$submenu = $el.next('.overlay-sub-menu');

			openSubmenu($submenu, $currentMenu);
		}

	});

	$submenuButton.on('click', function (e) {

		e.preventDefault();

		if (!$overlay.hasClass('in-transition')) {
			var
				$el = $(this),
				$openedMenu = $submenus.filter('.' + OPEN_CLASS),
				$prevMenu = $openedMenu.parent('li').parent('ul');

			closeSubmenu($openedMenu, $prevMenu);
		}

	});

}

/* ======================================================================== */
/* 29. lazyLoad */
/* ======================================================================== */
function lazyLoad($scope = $window.document) {

	var
		$elements = $scope.find('.lazy'),
		$images = $elements.find('img[data-src]'),
		$backgrounds = $scope.find('.lazy-bg[data-src]');

	prepareLazyImages($images, $backgrounds);
	loadLazyImages($images, $backgrounds);

}

function prepareLazyImages($images, $backgrounds) {

	$images.each(function () {

		var
			$el = $(this),
			$elParent = $el.parent(),
			elPB,
			elWidth = $el.attr('width') || false,
			elHeight = $el.attr('height') || false;

		// we need both width and height of element
		// to calculate proper value for "padding-bottom" hack
		if (!elWidth || !elHeight) {
			return;
		}

		elPB = (elHeight / elWidth) * 100 + '%';

		TweenMax.set($el, {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%'
		});

		TweenMax.set($elParent, {
			width: '100%',
			position: 'relative',
			overflow: 'hidden',
			paddingBottom: elPB
		});

	});

};

function loadLazyImages($images, $backgrounds, lazyCallback) {

	var
		lazyInstance,
		lazyInstanceBackgrounds;

	if ($images.length) {

		lazyInstance = $images.Lazy({
			threshold: 1000,
			chainable: false,
			// beforeLoad: function (el) {

			// 	var
			// 		$el = $(el),
			// 		$elParent = $el.parent();

			// 	TweenMax.set($elParent, {
			// 		className: '+=lazy_loaded'
			// 	});

			// },
			afterLoad: function (el) {

				var
					$el = $(el),
					$elParent = $el.parent();

				$el.imagesLoaded({
					background: true
				}).always(function () {

					TweenMax.set($elParent, {
						className: '+=lazy_loaded'
					});

				});

				// update scrollbar geometry
				if (window.SB !== undefined) {
					window.SB.update();
				}

				if (lazyCallback !== undefined) {
					lazyCallback();
				}

			}

		});

	}

	if ($backgrounds.length) {

		lazyInstanceBackgrounds = $backgrounds.Lazy({
			threshold: 1000,
			chainable: false,
			afterLoad: function (el) {
				$(el).addClass('lazy-bg_loaded');
			}
		});

	}

	// update lazy load instance when smooth scroll is enabled
	if (window.SB !== undefined && lazyInstance && lazyInstance.config('delay') !== 0) {

		window.SB.addListener(function () {
			lazyInstance.update(true);
		});

	}

	// update lazy load instance when smooth scroll is enabled
	if (window.SB !== undefined && lazyInstanceBackgrounds && lazyInstanceBackgrounds.config('delay') !== 0) {

		window.SB.addListener(function () {
			lazyInstanceBackgrounds.update(true);
		});

	}

};

/* ======================================================================== */
/* 30. MenuOverlay */
/* ======================================================================== */
var MenuOverlay = function () {

	var $menu = $('.js-menu-overlay');

	if (!$menu.length) {
		return;
	}

	var
		$overlay = $('.header__wrapper-overlay-menu'),
		$overlayWidgets = $overlay.find('.header__wrapper-overlay-widgets'),
		$social = $overlayWidgets.find('.social'),
		$links = $menu.find('.menu-item-has-children > a'),
		$allLinks = $menu.find('a'),
		$submenus = $menu.find('.sub-menu'),
		$submenuButton = $('#js-submenu-back'),
		OPEN_CLASS = 'opened',
		SELECTED_CLASS = 'selected',
		tl = new TimelineMax();

	function openSubmenu($submenu, $currentMenu) {

		var
			$currentLinks = $currentMenu.find('> li > a .menu-overlay__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .menu-overlay__item-wrapper');

		tl
			.clear()
			.add(function () {
				window.$pageHeader.attr('data-header-animation', 'intransition');
			})
			.set($submenu, {
				autoAlpha: 1,
				zIndex: 100,
			}, '0')
			.add(hideChars($currentLinks, 0.6, 0.4, Power3.easeOut, -50, 0, 'start'))
			.add(animateChars($submenuLinks, 0.6, 0.4, Power3.easeOut, 'start'), '-=0.6')
			.add(function () {
				$allLinks.removeClass(SELECTED_CLASS);
			})
			.add(function () {
				window.$pageHeader.attr('data-header-animation', '');
			});

		$submenus.removeClass(OPEN_CLASS);
		$submenu.not($menu).addClass(OPEN_CLASS);

		if ($submenus.hasClass(OPEN_CLASS)) {

			tl
				.to($submenuButton, 0.3, {
					autoAlpha: 1,
					x: '0px'
				}, '-=1.2');

			if (isMediumScreen()) {
				tl
					.to($social, 0.6, {
						autoAlpha: 0,
						y: '100%'
					}, '0.2')
					.add(hideLines($overlayWidgets, 0.6, 0.07, '100%', Power3.easeOut, true), '0');
			}

		} else {

			tl
				.to($submenuButton, 0.3, {
					autoAlpha: 0,
					x: '-10px'
				}, '-=1.2');

			tl
				.to($social, 0.6, {
					autoAlpha: 1,
					y: '0%'
				}, '0.2')
				.add(animateLines($overlayWidgets, 0.6, 0.07), '-=1.2');

		}

	}

	function closeSubmenu($submenu, $currentMenu) {

		var
			$currentLinks = $currentMenu.find('> li > a .menu-overlay__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .menu-overlay__item-wrapper');

		tl
			.clear()
			.add(function () {
				window.$pageHeader.attr('data-header-animation', 'intransition');
			})
			.add(hideChars($submenuLinks, 0.6, 0.4, Power3.easeOut, 50, 0, 'end'))
			.add(animateChars($currentLinks, 0.6, 0.4, Power3.easeOut, 'end'), '-=0.6')
			.set($submenu, {
				autoAlpha: 0,
				zIndex: -1,
			})
			.add(function () {
				window.$pageHeader.attr('data-header-animation', '');
			});

		$submenus.removeClass(OPEN_CLASS);
		$currentMenu.not($menu).addClass(OPEN_CLASS);


		if ($submenus.hasClass(OPEN_CLASS)) {

			TweenMax.to($submenuButton, 0.3, {
				autoAlpha: 1,
				x: '0px'
			});

			if (isMediumScreen()) {
				tl
					.to($social, 0.6, {
						autoAlpha: 0,
						y: '-100%'
					}, '0.2')
					.add(hideLines($overlayWidgets, 0.6, 0.07, '100%', Power3.easeOut, true), '0');
			}

		} else {

			TweenMax.to($submenuButton, 0.3, {
				autoAlpha: 0,
				x: '-10px'
			});

			tl.to($social, 0.6, {
					autoAlpha: 1,
					y: '0%'
				}, '0.2')
				.add(animateLines($overlayWidgets, 0.6, 0.07), '0');

		}

	}

	$links.on('click', function (e) {

		e.preventDefault();

		if (window.$pageHeader.attr('data-header-animation') !== 'intransition') {
			var
				$el = $(this),
				$currentMenu = $el.parents('ul'),
				$submenu = $el.next('.sub-menu');

			$el.addClass(SELECTED_CLASS);

			openSubmenu($submenu, $currentMenu);
		}

	});

	$submenuButton.on('click', function (e) {

		e.preventDefault();

		if (window.$pageHeader.attr('data-header-animation') !== 'intransition') {
			var
				$openedMenu = $submenus.filter('.' + OPEN_CLASS),
				$prevMenu = $openedMenu.parent('li').parent('ul');

			closeSubmenu($openedMenu, $prevMenu);
		}

	})

	function isMediumScreen() {
		return Modernizr.mq('(max-width: 991px)');
	}

}

/* ======================================================================== */
/* 31. preloader */
/* ======================================================================== */
function Preloader() {

	var
		tl = new TimelineMax(),
		$preloader = $('.js-preloader'),
		$curtainInner = $preloader.find('.preloader__curtain_inner'),
		$curtainOuter = $preloader.find('.preloader__curtain_outer'),
		$logo = $preloader.find('.preloader__wrapper-logo'),
		$pageContent = $('.page-wrapper__content');

	tl.timeScale(2);

	this.start = function () {

		if (!$preloader.length) {
			return;
		}

		TweenMax.set($pageContent, {
			y: '10vh',
			force3D: true
		});

	}

	this.finish = function () {
		return new Promise(function (resolve, reject) {

			if (!$preloader.length) {
				resolve(true);
				return;
			}

			tl
				.set($curtainInner, {
					animationPlayState: 'paused',
				})
				.to($curtainInner, 1.2, {
					animation: 'none',
					scaleX: 1,
					transformOrigin: 'left center',
					ease: Expo.easeInOut
				})
				.to($curtainInner, 1.2, {
					top: '0px',
					y: '0%',
					ease: Expo.easeInOut,
				})
				.to($logo, 1.2, {
					y: '-50px',
					ease: Expo.easeInOut,
				}, '-=1.1')
				.set($logo, {
					autoAlpha: 0
				})
				.to($curtainInner, 1.2, {
					y: '-102%',
					ease: Expo.easeInOut,
				})
				.to($curtainOuter, 1.2, {
					y: '-100%',
					ease: Expo.easeInOut,
				}, '-=0.9')
				.to($pageContent, 2.4, {
					y: '0vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '-=1.9')
				.add(function () {
					resolve(true);
				}, '-=1.5')
				.set($preloader, {
					display: 'none'
				});

		});
	}

}

/* ======================================================================== */
/* 32. createOSScene */
/* ======================================================================== */
function createOSScene($el, tl, $customTrigger, noReveal = false, animDelay = 0) {

	var
		$trigger = $el,
		scene,
		scale,
		delayAttr = parseFloat($trigger.attr('data-os-animation-delay')) || 0,
		masterTL = new TimelineMax();

	if ($customTrigger && $customTrigger.length) {
		$trigger = $customTrigger;
	}

	if (!noReveal) {
		// reveal hidden element first
		masterTL.add(TweenMax.set($el, {
			autoAlpha: 1
		}), '0');
	}


	if (!animDelay && delayAttr) {
		masterTL.delay(delayAttr);
		// masterTL.shiftChildren(delayAttr, true);
	}

	if (animDelay && delayAttr) {
		masterTL.delay(animDelay);
		// masterTL.shiftChildren(animDelay, true);
	}

	masterTL
		.add(tl, '0')
		.add(function () {

			// update scrollbar geometry
			if (window.SB !== undefined) {
				window.SB.update();
			}

		}, '0');

	// set animation reveal master speed
	if (window.theme !== undefined) {

		scale = window.theme.animations.timeScale.onScrollReveal || 1;
		masterTL.timeScale(scale);

	}

	scene = new $.ScrollMagic.Scene({
			triggerElement: $trigger,
			triggerHook: window.SMSceneTriggerHook,
			reverse: window.SMSceneReverse
		})
		.setTween(masterTL)
		.addTo(window.SMController);


	// update scene when smooth scroll is enabled
	if (window.SB !== undefined) {

		window.SB.addListener(function () {
			scene.refresh();
		});

	}

}

/* ======================================================================== */
/* 33. getScrollTop */
/* ======================================================================== */
function getScrollTop() {

	if (window.SB !== undefined) {
		window.lastTop = window.SB.scrollTop;
	} else {
		window.lastTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	}

	return window.lastTop;
}

/* ======================================================================== */
/* 34. lockScroll */
/* ======================================================================== */
function lockScroll(lock) {

	var LOCK_CLASS = 'body_lock-scroll';

	if (lock === true) {

		if (!window.$body.hasClass(LOCK_CLASS)) {

			window.$body.addClass(LOCK_CLASS);

			if (window.SB !== undefined) {

				window.SB.updatePluginOptions('lockscroll', {
					lock: true
				});

			}

		}

	} else {

		window.$body.removeClass(LOCK_CLASS);

		if (window.SB !== undefined) {

			window.SB.updatePluginOptions('lockscroll', {
				lock: false
			});

		}

	}

}

/* ======================================================================== */
/* 35. restoreScrollTop */
/* ======================================================================== */
function restoreScrollTop() {

	if (window.SB !== undefined) {

		setTimeout(function () {
			window.SB.scrollTop = window.lastTop;
		}, 100);

	} else {

		$('html, body').animate({
			scrollTop: window.lastTop
		}, 100);

	}

}

/* ======================================================================== */
/* 36. scrollToVeryTop */
/* ======================================================================== */
function scrollToVeryTop() {

	window.scrollTo(0, 0);

	// safari fix
	try {
		window.top.scrollTo(0, 0);
	} catch (error) {

	}

	if (window.SB !== undefined) {
		window.SB.scrollTop = 0;
	}

}

/* ======================================================================== */
/* 37. ScrollDown */
/* ======================================================================== */
var ScrollDown = function () {

	var $el = $('.js-scroll-down');

	if (!$el.length) {
		return;
	}

	$el.on('click', function (e) {

		e.preventDefault();

		$('html, body').animate({
			scrollTop: window.innerHeight
		}, 600, 'swing');

		if (window.SB !== undefined) {

			window.SB.scrollTo(0, window.innerHeight, 1200, {
				easing: function (pos) {
					if (pos === 0) return 0;
					if (pos === 1) return 1;
					if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
					return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
				}
			});
		}

	});

};

/* ======================================================================== */
/* 38. sectionAbout */
/* ======================================================================== */
var SectionAbout = function ($scope) {

	var
		$target = $scope.find('.section-about'),
		$counters,
		$animTarget;

	if (!$target.length) {
		return;
	}

	$animTarget = $scope.find('.section-about[data-os-animation]');
	$counters = $target.find('.js-counter');

	$counters.each(function () {

		new Counter($(this));

	});

	$animTarget.each(function () {

		var
			$current = $(this),
			// $heading = $current.find('.section-about__heading'),
			$header = $current.find('.section-about__header'),
			$headline = $current.find('.section__headline'),
			tl = new TimelineMax();

		prepare();
		animate();

		function prepare() {

			TweenMax.set($headline, {
				scaleX: 0
			});

		}

		function animate() {

			tl
				.add(animateHeadline($headline), '0')
				.add(animateChars($current, 1.2, 0.6, Power3.easeOut), '-=1.2')
				.add(animateLines($current, 1.2, 0.07, Power3.easeOut), '-=1.2')

			createOSScene($current, tl, $header);

		}

	});

}

/* ======================================================================== */
/* 39. sectionAwards */
/* ======================================================================== */
var SectionAwards = function ($scope) {

	var
		$target = $scope.find('.section-awards'),
		$figureAward = $target.find('.figure-award[data-os-animation]');

	$figureAward.each(function () {
		new FigureAward($(this));
	});

}

/* ======================================================================== */
/* 40. SectionContent */
/* ======================================================================== */
var SectionContent = function ($scope) {

	var $target = $scope.find('.section-content[data-os-animation]');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			tl = new TimelineMax(),
			$current = $(this),
			$header = $current.find('.section-content__header'),
			$wrapperButton = $current.find('.section-content__wrapper-button'),
			$headline = $current.find('.section__headline');

		prepare();
		animate();

		function prepare() {

			TweenMax.set($headline, {
				scaleX: 0,
				transformOrigin: 'left center'
			});

			TweenMax.set($wrapperButton, {
				autoAlpha: 0,
				y: '50%'
			});

		}

		function animate() {

			var $trigger = $current;

			if ($header.length) {
				$trigger = $header
			}

			tl
				.add(animateChars($current, 1.2, 0.3, Power3.easeOut), '0')
				.add(animateLines($current, 1.2, 0.05), '0')
				.add(animateHeadline($headline), '0')
				.to($wrapperButton, 1.2, {
					autoAlpha: 1,
					y: '0%'
				}, '-=0.9');

			createOSScene($current, tl, $trigger);

		}

	});

}

/* ======================================================================== */
/* 41. sectionFullscreenSlider */
/* ======================================================================== */
var SectionFullscreenSlider = function ($scope) {

	var $target = $scope.find('.section-fullscreen-slider[data-os-animation]');

	if (!$target.length) {

		return;

	}

	$target.each(function () {

		var
			tl = new TimelineMax(),
			$current = $(this),
			$slider = $current.find('.js-slider-fullscreen'),
			$buttonWrapper = $slider.find('.slider__wrapper-button');

		prepare().then(function () {
			animate();
		});


		function prepare() {

			return new Promise(function (resolve, reject) {

				var tl = new TimelineMax();

				tl
					.set($buttonWrapper, {
						autoAlpha: 0,
						y: '20px'
					})
					.add(function () {
						new SliderFullScreen($slider);
					})
					.add(function () {
						resolve(true);
					});

			});

		}

		function animate() {

			var
				$activeSlide = $target.find('.swiper-slide-active'),
				$activeHeading = $activeSlide.find('.slider__heading'),
				$activeSubheading = $activeSlide.find('.slider__subheading'),
				$activeButton = $activeSlide.find('.slider__wrapper-button');

			$activeSlide.imagesLoaded({
				background: true,
			}, function () {

				tl
					.delay(0.6)
					.add(animateChars($activeHeading, 1.2, 0.3, Power3.easeOut), '0')
					.add(animateChars($activeSubheading, 1.2, 0.3, Power3.easeOut), '0')
					.to($activeButton, 1.2, {
						y: '0px',
						autoAlpha: 1,
						ease: Power3.easeOut
					}, '-=1.2');

				createOSScene($current, tl);

			});

		}

	})

}

/* ======================================================================== */
/* 42. sectionNavProjects */
/* ======================================================================== */
var SectionNavProjects = function ($scope) {

	var $target = $scope.find('.section-nav-projects');

	if (!$target.length) {
		return;
	}

	var
		$allButton = $target.find('.section-nav-projects__inner_all'),
		$prevHeading = $target.find('.section-nav-projects__heading_prev'),
		$nextHeading = $target.find('.section-nav-projects__heading_next'),
		$prevArrow = $target.find('.section-nav-projects__arrow_prev'),
		$nextArrow = $target.find('.section-nav-projects__arrow_next'),
		$prevButton = $target.find('.section-nav-projects__inner_prev'),
		$nextButton = $target.find('.section-nav-projects__inner_next'),
		tl = new TimelineMax(),
		duration = 0.6,
		offset = 75,
		stagger = 0.2;

	new ButtonCircles($allButton);

	setChars($prevButton, offset);
	setChars($nextButton, offset);


	if (Modernizr.mq('(min-width: 767px)')) {

		window.$document
			.on('mouseenter touchstart', '.section-nav-projects__inner_prev', function () {
				tl
					.clear()
					.to($prevArrow, duration / 2, {
						autoAlpha: 0,
						x: (-1) * offset / 2 + 'px'
					}, '0')
					.add(animateChars($prevHeading, duration, stagger, Power4.easeOut), '0.2')
					.add(hideChars($nextHeading, duration, stagger, Power4.easeOut, (-1) * offset, 0, 'start'), '0.2');
			})
			.on('mouseleave touchend', '.section-nav-projects__inner_prev', function () {
				tl
					.clear()
					.to($prevArrow, duration / 2, {
						autoAlpha: 1,
						x: '0px'
					}, '0.2')
					.add(hideChars($prevHeading, duration, stagger, Power4.easeOut, offset, 0, 'end'), '0')
					.add(hideChars($nextHeading, duration, stagger, Power4.easeOut, (-1) * offset, 0, 'start'), '0');
			})
			.on('mouseenter touchstart', '.section-nav-projects__inner_next', function () {
				tl
					.clear()
					.to($nextArrow, duration / 2, {
						autoAlpha: 0,
						x: offset / 2 + 'px'
					}, '0')
					.add(animateChars($nextHeading, duration, stagger, Power4.easeOut), '0.2')
					.add(hideChars($prevHeading, duration, stagger, Power4.easeOut, offset, 0, 'end'), '0.2');
			})
			.on('mouseleave touchend', '.section-nav-projects__inner_next', function () {
				tl
					.clear()
					.to($nextArrow, duration / 2, {
						autoAlpha: 1,
						x: '0px'
					}, '0.2')
					.add(hideChars($nextHeading, duration, stagger, Power4.easeOut, (-1) * offset, 0, 'start'), '0')
					.add(hideChars($prevHeading, duration, stagger, Power4.easeOut, offset, 0, 'end'), '0');
			})
			.on('click', '.section-nav-projects__inner_prev', function () {
				tl
					.clear()
					.stop();

			})
			.on('click', '.section-nav-projects__inner_next', function () {
				tl
					.clear()
					.stop();

			});

	} else {

		animateChars($prevHeading, 0, 0, Power4.easeOut);
		animateChars($nextHeading, 0, 0, Power4.easeOut);

	}

}

/* ======================================================================== */
/* 43. SectionPortfolio */
/* ======================================================================== */
var SectionPortfolio = function ($scope) {

	var
		$target = $scope.find('.section-portfolio'),
		$filter,
		$grid,
		$figurePortfolioHover,
		$figurePortfolio,
		animDelay,
		$animTarget,
		colsDesktop,
		colsTablet,
		colsMobile,
		lg,
		md,
		cols,
		FilterPortfolio,
		GridPortfolio;

	if (!$target.length) {
		return;
	}

	$animTarget = $scope.find('.section-portfolio[data-os-animation]');
	$figurePortfolioHover = $target.find('.figure-portfolio-item_hover');
	$figurePortfolio = $animTarget.find('.figure-portfolio[data-os-animation]');
	animDelay = $animTarget.data('os-animation-delay');
	$filter = $target.find('.js-filter');
	$grid = $target.find('.js-grid');
	colsDesktop = parseInt($grid.data('grid-columns'), 10) || -1;
	colsTablet = parseInt($grid.data('grid-columns-tablet'), 10) || -1;
	colsMobile = parseInt($grid.data('grid-columns-mobile'), 10) || -1;
	lg = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.lg - 1 : 1024;
	md = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.md - 1 : 767;
	cols = colsDesktop;

	if (Modernizr.mq('(max-width: ' + lg + 'px)')) {
		cols = colsTablet;
	}

	if (Modernizr.mq('(max-width: ' + md + 'px)')) {
		cols = colsMobile;
	}

	bindGridFilter();
	animateHover();
	animate();

	function bindGridFilter() {

		if (!$filter.length || !$grid.length) {
			return;
		}

		FilterPortfolio = new Filter($scope, $filter);
		GridPortfolio = new Grid($grid);

		if ($filter.length) {

			FilterPortfolio.setActiveItem(0);

			FilterPortfolio.$items.on('click', function (e) {

				e.preventDefault();

				var filterBy = $(this).data('filter');

				GridPortfolio.isotope({
					filter: filterBy
				});

			});

		}

		GridPortfolio.isotope({
			filter: '*'
		});

	}

	function animateHover() {

		$figurePortfolioHover.each(function () {

			var $current = $(this);

			new FigurePortfolioHover($current);

		});

	}

	function animate() {

		var
			tl = new TimelineMax();

		$figurePortfolio.each(function (index) {

			var
				$current = $(this),
				currentDelay = 0;

			if (index < cols) {
				currentDelay = animDelay;
			}

			new FigurePortfolioAnimation($current, currentDelay)

		});

		createOSScene($animTarget, tl);

	}

}

/* ======================================================================== */
/* 44. sectionMasthead */
/* ======================================================================== */
var SectionMasthead = function ($scope) {

	var $target = $scope.find('.section-masthead[data-os-animation]');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			$current = $(this),
			$currentBig = $current.filter('.section-masthead_big-heading'),
			tl = new TimelineMax(),
			$background = $current.find('.section-masthead__background'),
			$curtain = $current.find('.section-masthead__curtain'),
			$heading = $current.find('.section-masthead__heading'),
			$headingBig = $current.find('.section-masthead__heading-big'),
			$text = $current.find('.section-masthead__text'),
			$subheading = $current.find('.section-masthead__subheading'),
			$button = $current.find('.section-masthead__wrapper-button'),
			$headline = $current.find('.section__headline');

		prepare();
		animate();

		function prepare() {

			TweenMax.set($headline, {
				scaleX: 0,
				transformOrigin: 'left center'
			});

			TweenMax.set($curtain, {
				scaleY: 0,
				transformOrigin: 'bottom center'
			});

			TweenMax.set($background, {
				scale: 1.1,
			});

			TweenMax.set($button, {
				y: '100%',
				autoAlpha: 0
			});

		}

		function animate() {

			tl
				.set($current, {
					autoAlpha: 1
				}, '0')
				.add(animateChars($subheading, 1.2, 0.4, Power3.easeInOut))
				.add(animateLines($text, 1.2, 0.08, Power3.easeOut), '0.9')
				.add(animateHeadline($headline), '-=1.2')
				.add(hideChars($headingBig, 0.6, 0.1, Power3.easeInOut, 0, '-200%'), '+=0.1')
				.to($currentBig, 0.3, {
					display: 'none',
					onComplete: function () {
						new Grid();
					}
				}, '-=0.6');

			if (!$heading.hasClass('js-split-text_cancel-animation')) {
				tl.add(animateChars($heading, 1.2, 0.4, Power3.easeInOut), '0');
			}

			if ($curtain.length) {
				tl.to($curtain, 1.2, {
					scaleY: 1,
					ease: Expo.easeInOut
				}, '0');
			}

			if ($background.length) {
				tl.to($background, 2.4, {
					scale: 1
				}, '0');
			}

			if ($button.length) {
				tl.to($button, 1.2, {
					y: '0%',
					autoAlpha: 1,
					ease: Power3.easeOut
				}, '0.9');
			}

			createOSScene($current, tl);

		}

	});

}

/* ======================================================================== */
/* 45. sectionServices */
/* ======================================================================== */
var SectionServices = function ($scope) {

	var $target = $scope.find('.section-services[data-os-animation]');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			$current = $(this),
			$serviceItem = $current.find('.section-services__wrapper-item'),
			$lines = $current.find('.section-services__border-line'),
			$bg = $current.find('.section-services__bg'),
			tl = new TimelineMax(),
			tlChild = new TimelineMax();

		prepare();
		animate();

		function prepare() {

			TweenMax.set($bg, {
				x: '-100%',
			});

			TweenMax.set($lines, {
				x: '-200%',
			})

		}

		function animate() {

			tl
				.to([$bg, $lines], 1.2, {
					x: '0%',
					ease: Expo.easeInOut
				});

			$serviceItem.each(function () {

				var
					$currentServiceItem = $(this),
					$counter = $currentServiceItem.find('.section-services__counter'),
					$heading = $currentServiceItem.find('.section-services__heading'),
					$link = $currentServiceItem.find('.section-services__wrapper-button');


				tlChild
					.add([
						animateChars($heading, 1.2, 0.4, Power3.easeOut),
						animateChars($counter, 1.2, 0.1, Power3.easeOut)
					], 'start')
					.fromTo($link, 0.6, {
						y: '100%',
						autoAlpha: 0
					}, {
						y: '0%',
						autoAlpha: 1
					}, 'start')

			});

			tl.add(tlChild, '-=0.2');

			createOSScene($target, tl);

		}

	});

}

/* ======================================================================== */
/* 46. sectionTestimonials */
/* ======================================================================== */
var SectionTestimonials = function ($scope) {

	var $target = $scope.find('.section-testimonials');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			tl = new TimelineMax(),
			$current = $(this),
			$slider = $target;

		prepare().then(function () {
			animate();
		});


		function prepare() {

			return new Promise(function (resolve, reject) {

				var tl = new TimelineMax();

				tl
					.add(function () {
						new SliderTestimonials($slider);
					})
					.add(function () {
						resolve(true);
					});

			});

		}

		function animate() {

			var
				$activeSlide = $target.find('.swiper-slide-active'),
				$activeText = $activeSlide.find('.slider-testimonials__text'),
				$activeAuthor = $activeSlide.find('.slider-testimonials__author');


			tl
				.add(animateLines($activeText, 1.2, 0.1, Power3.easeOut))
				.add(animateChars($activeAuthor, 1.2, 0.3, Power3.easeOut), '-=0.6');

		}

	})

}

/* ======================================================================== */
/* 47. renderSliderCounter */
/* ======================================================================== */
function renderSliderCounter(sliderMain, sliderCounter, slideClass, elTotal, sliderSecondary) {

	if ($(sliderMain).length && $(sliderSecondary).length && !$(sliderCounter)) {
		sliderSecondary.controller.control = sliderMain;
		sliderMain.controller.control = sliderSecondary;
	}

	if (!$(sliderMain).length || !$(sliderCounter).length || !$(elTotal).length) {
		return;
	}

	var
		numOfSlides = sliderMain.slides.length,
		startSlides = parseInt(sliderMain.params.slidesPerView, 10),
		prefixCurrent = '00',
		prefixTotal = numOfSlides >= 10 ? '0' : '00';

	var counter = new Swiper(sliderCounter, {
		direction: 'vertical',
		simulateTouch: false,
		allowTouchMove: false
	});

	counter.removeAllSlides();

	for (var index = startSlides; index <= numOfSlides; index++) {

		if (index >= 10) {

			prefixCurrent = '0';

		}

		counter.appendSlide('<div class="swiper-slide"><div class="' + slideClass + '">' + prefixCurrent + index + '</div></div>');

	}


	$(elTotal).html(prefixTotal + numOfSlides);

	sliderMain.controller.control = counter;
	counter.controller.control = sliderMain;

	if ($(sliderSecondary).length) {
		sliderSecondary.controller.control = counter;
		counter.controller.control = sliderSecondary;
	}

}

/* ======================================================================== */
/* 48. renderSliderDots */
/* ======================================================================== */
function renderSliderDots(slider, $dotsContainer) {

	var
		$dots = $dotsContainer.find('.slider__dot'),
		$circles;

	if (!$dots.length) {
		return false;
	} else {

		// append SVG circle
		$dots.append('<svg viewBox="0 0 152 152" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none" fill-rule="evenodd"><g transform="translate(-134.000000, -98.000000)"><path class="circle" d="M135,174a75,75 0 1,0 150,0a75,75 0 1,0 -150,0"></path></g></g></svg>');
		$circles = $dots.find('.circle');

	}

	TweenMax.set($circles, {
		drawSVG: false,
	});

	slider
		.on('transitionStart', function () {
			unsetDots();
		})
		.on('transitionEnd', function () {
			setCurrentDot();
		});

	// on init
	setCurrentDot();

	function setCurrentDot() {

		var
			$currentDot = $dots.eq(slider.realIndex),
			$currentCircle = $currentDot.find('.circle'),
			autoPlaydelay = parseFloat(slider.params.speed / 1000) / 2;

		if (slider.params.autoplay.enabled) {
			autoPlaydelay = parseFloat(slider.params.autoplay.delay / 1000);
		}

		TweenMax.fromTo($currentCircle, autoPlaydelay, {
			drawSVG: '100% 100%',
			ease: Power4.easeInOut
		}, {
			drawSVG: '0% 100%'
		});

	}

	function unsetDots() {

		var
			transitionSpeed = parseFloat(slider.params.speed / 1000) / 2;

		if (slider.params.autoplay.enabled) {
			transitionSpeed = parseFloat(slider.params.speed / 1000);
		}

		TweenMax.to($circles, transitionSpeed, {
			drawSVG: '0% 0%',
			ease: Power4.easeInOut
		});

	}

}

/* ======================================================================== */
/* 49. setSliderOverlapEffect */
/* ======================================================================== */
function setSliderOverlapEffect(slider, overlapFactor) {

	var
		i,
		innerOffset,
		innerTranslate,
		background;

	initialSet();

	/**
	 * Resize handling (with debounce)
	 */
	$(window).on('resize', debounce(function () {
		slider.update();
		initialSet();
	}, 250));

	function initialSet() {

		innerOffset = slider.width * overlapFactor;
		innerTranslate = innerOffset * (-1);
		background = slider.slides[1].querySelector('.slider__bg');

		TweenMax.set(background, {
			clearProps: 'transform'
		});

		TweenMax.set(background, {
			y: slider.params.direction == 'vertical' ? innerTranslate + 'px' : '',
			x: slider.params.direction == 'horizontal' ? innerTranslate + 'px' : '',
			transition: slider.params.speed + 'ms',
			z: 0.01,
			force3D: true
		});

	}

	slider
		.on('progress', function () {

			for (i = 0; i < slider.slides.length; i++) {

				innerTranslate = slider.slides[i].progress * innerOffset;
				background = slider.slides[i].querySelector('.slider__bg');

				try {
					TweenMax.set(background, {
						y: slider.params.direction == 'vertical' ? innerTranslate + 'px' : '',
						x: slider.params.direction == 'horizontal' ? innerTranslate + 'px' : '',
						transition: slider.params.speed + 'ms',
						z: 0.01,
						force3D: true
					});
				} catch (error) {

				}

			}

		})
		.on('touchStart', function () {

			for (i = 0; i < slider.slides.length; i++) {

				background = slider.slides[i].querySelector('.slider__bg');

				try {
					TweenMax.set(background, {
						transition: '',
						z: 0.01,
						force3D: true
					});
				} catch (error) {

				}

			}

		});

}

/* ======================================================================== */
/* 50. setSliderTestimonialsTransitions */
/* ======================================================================== */
function setSliderTestimonialsTransitions(slider, direction, offset = 40, $text, $author, $line) {

	var
		tl = new TimelineMax(),
		textAlign = $text.css('text-align'),
		offsetXNextIn = 0,
		offsetXNextOut = 0,
		offsetYNextIn = 0,
		offsetYNextOut = 0,
		offsetXPrevIn = 0,
		offsetXPrevOut = 0,
		offsetYPrevIn = 0,
		offsetYPrevOut = 0,

		fromNextIn = 'start',
		fromNextOut = 'start',
		fromPrevIn = 'end',
		fromPrevOut = 'end';


	switch (textAlign) {
		case 'left':
			// text align left & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset;
				offsetXNextOut = offset * (-1);
				offsetXPrevIn = offset * (-1);
				offsetXPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'start';
				fromPrevOut = 'end';
				fromPrevIn = 'end';

			}
			// text align left & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset;
				offsetYNextOut = offset * (-1);
				offsetYPrevIn = offset * (-1);
				offsetYPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'end';
				fromPrevOut = 'end';
				fromPrevIn = 'start';
			}
			break;
		case 'center':
			// text align center & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset;
				offsetXNextOut = offset * (-1);
				offsetXPrevIn = offset * (-1);
				offsetXPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'start';
				fromPrevOut = 'end';
				fromPrevIn = 'end';

			}
			// text align left & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset / 2;
				offsetYNextOut = offset * (-1) / 2;
				offsetYPrevIn = offset * (-1) / 2;
				offsetYPrevOut = offset / 2;

				fromNextOut = 'center';
				fromNextIn = 'center';
				fromPrevOut = 'center';
				fromPrevIn = 'center';
			}
			break;
		case 'right':
			// text align right & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset * (-1);
				offsetXNextOut = offset;
				offsetXPrevIn = offset;
				offsetXPrevOut = offset * (-1);

				fromNextOut = 'end';
				fromNextIn = 'end';
				fromPrevOut = 'start';
				fromPrevIn = 'start';

			}
			// text align right & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset * (-1);
				offsetYNextOut = offset;
				offsetYPrevIn = offset;
				offsetYPrevOut = offset * (-1);

				fromNextOut = 'end';
				fromNextIn = 'start';
				fromPrevOut = 'start';
				fromPrevIn = 'end';
			}
			break;
	}

	slider
		.on('slideNextTransitionStart', function () {

			var
				$activeSlide = $(slider.slides[slider.activeIndex]),
				$activeText = $activeSlide.find($text),
				$activeAuthor = $activeSlide.find($author),
				$activeLine = $activeSlide.find($line);

			tl.clear();

			$text.each(function () {

				tl
					.to($line, 0.6, {
						ease: Power3.easeInOut,
						scaleX: 0,
						transformOrigin: 'right center'
					}, '0')
					.add(hideLines($(this), 0.6, 0.05, offsetYNextOut, Power3.easeOut), '0')
					.add(hideChars($author, 0.6, 0.3, Power3.easeInOut, offsetYNextIn, 0, fromNextIn), '0')
					.add(hideLines($(this), 0, 0, offsetYNextIn, Power3.easeInOut))
					.add(hideChars($author, 0, 0, Power3.easeInOut, offsetYNextOut, 0));

			});

			tl
				.add(animateLines($activeText, 1.2, 0.1, Power3.easeOut, fromNextIn))
				.add(animateChars($activeAuthor, 1.2, 0.3, Power3.easeOut, fromNextIn), '-=1.2')
				.add(animateHeadline($activeLine, 0.6, Power3.easeInOut, 'left center'), '-=1.2');

		})
		.on('slidePrevTransitionStart', function () {

			var
				$activeSlide = $(slider.slides[slider.activeIndex]),
				$activeText = $activeSlide.find($text),
				$activeAuthor = $activeSlide.find($author),
				$activeLine = $activeSlide.find($line);

			tl.clear();

			$text.each(function () {

				tl
					.to($line, 0.6, {
						ease: Power3.easeInOut,
						scaleX: 0,
						transformOrigin: 'left center'
					}, '0')
					.add(hideLines($(this), 0.6, 0.05, offsetYPrevOut, Power3.easeOut, true), '0')
					.add(hideChars($author, 0.6, 0.3, Power3.easeInOut, offsetYNextOut, 0, fromPrevIn), '0')
					.add(hideLines($(this), 0, 0, offsetYPrevIn, Power3.easeInOut))
					.add(hideChars($author, 0, 0, Power3.easeInOut, offsetYPrevOut, 0));

			});

			tl
				.add(animateLines($activeText, 1.2, 0.1, Power3.easeOut, fromPrevIn))
				.add(animateChars($activeAuthor, 1.2, 0.3, Power3.easeOut, fromPrevIn), '-=1.2')
				.add(animateHeadline($activeLine, 0.6, Power3.easeInOut, 'right center'), '-=1.2');

		});


}

/* ======================================================================== */
/* 51. setSliderTextTransitions */
/* ======================================================================== */
function setSliderTextTransitions(slider, direction, offset = 40, $heading, $subheading, $description, $link) {

	var
		tl = new TimelineMax(),
		textAlign = $heading.css('text-align'),
		offsetXNextIn = 0,
		offsetXNextOut = 0,
		offsetYNextIn = 0,
		offsetYNextOut = 0,
		offsetXPrevIn = 0,
		offsetXPrevOut = 0,
		offsetYPrevIn = 0,
		offsetYPrevOut = 0,

		fromNextIn = 'start',
		fromNextOut = 'start',
		fromPrevIn = 'end',
		fromPrevOut = 'end';


	switch (textAlign) {
		case 'left':
			// text align left & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset;
				offsetXNextOut = offset * (-1);
				offsetXPrevIn = offset * (-1);
				offsetXPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'start';
				fromPrevOut = 'end';
				fromPrevIn = 'end';

			}
			// text align left & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset;
				offsetYNextOut = offset * (-1);
				offsetYPrevIn = offset * (-1);
				offsetYPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'end';
				fromPrevOut = 'end';
				fromPrevIn = 'start';
			}
			break;
		case 'center':
			// text align center & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset;
				offsetXNextOut = offset * (-1);
				offsetXPrevIn = offset * (-1);
				offsetXPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'start';
				fromPrevOut = 'end';
				fromPrevIn = 'end';

			}
			// text align left & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset / 2;
				offsetYNextOut = offset * (-1) / 2;
				offsetYPrevIn = offset * (-1) / 2;
				offsetYPrevOut = offset / 2;

				fromNextOut = 'center';
				fromNextIn = 'center';
				fromPrevOut = 'center';
				fromPrevIn = 'center';
			}
			break;
		case 'right':
			// text align right & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset * (-1);
				offsetXNextOut = offset;
				offsetXPrevIn = offset;
				offsetXPrevOut = offset * (-1);

				fromNextOut = 'end';
				fromNextIn = 'end';
				fromPrevOut = 'start';
				fromPrevIn = 'start';

			}
			// text align right & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset * (-1);
				offsetYNextOut = offset;
				offsetYPrevIn = offset;
				offsetYPrevOut = offset * (-1);

				fromNextOut = 'end';
				fromNextIn = 'start';
				fromPrevOut = 'start';
				fromPrevIn = 'end';
			}
			break;
	}

	slider
		.on('slideNextTransitionStart', function () {

			var
				$activeSlide = $(slider.slides[slider.activeIndex]),
				$activeHeading = $activeSlide.find($heading),
				$activeSubheading = $activeSlide.find($subheading),
				$activeDescription = $activeSlide.find($description),
				$activeLink = $activeSlide.find($link);

			tl.clear();

			$heading.each(function () {

				tl
					.add(hideChars($(this), 0.6, 0.3, Power3.easeInOut, offsetXNextOut, offsetYNextOut, fromNextOut), '0')
					.add(hideChars($subheading, 0.6, 0.3, Power3.easeInOut, offsetXNextOut, offsetYNextOut, fromNextOut), '0')
					.add(hideLines($description, 0.6, 0.05, offsetYNextOut, Power3.easeOut, true), '0')
					.add(hideButton(), '-=0.6')
					.add(hideChars($(this), 0, 0, Power3.easeInOut, offsetXNextIn, offsetYNextIn))
					.add(hideChars($subheading, 0, 0, Power3.easeInOut, offsetXNextIn, offsetYNextIn))
					.add(hideLines($activeDescription, 0, 0, offsetYNextIn))
					.add(setButton());

			});

			tl
				.add(animateChars($activeHeading, 1.2, 0.3, Power3.easeOut, fromNextIn))
				.add(animateLines($activeDescription, 1.2, 0.1, Power3.easeOut, fromNextIn), '-=1.2')
				.add(animateChars($activeSubheading, 1.2, 0.3, Power3.easeOut, fromNextIn), '-=1.2')
				.add(showButton($activeLink), '-=0.9');

		})
		.on('slidePrevTransitionStart', function () {

			var
				$activeSlide = $(slider.slides[slider.activeIndex]),
				$activeHeading = $activeSlide.find($heading),
				$activeSubheading = $activeSlide.find($subheading),
				$activeDescription = $activeSlide.find($description),
				$activeLink = $activeSlide.find($link);

			tl.clear();

			$heading.each(function () {

				tl
					.add(hideChars($(this), 0.6, 0.3, Power3.easeInOut, offsetXPrevOut, offsetYPrevOut, fromPrevOut), '0')
					.add(hideChars($subheading, 0.6, 0.3, Power3.easeInOut, offsetXPrevOut, offsetYPrevOut, fromPrevOut), '0')
					.add(hideLines($description, 0.6, 0.05, offsetYPrevOut, Power3.easeOut), '0')
					.add(hideButton(), '-=0.6')
					.add(hideChars($(this), 0, 0, Power3.easeInOut, offsetXPrevIn, offsetYPrevIn))
					.add(hideChars($subheading, 0, 0, Power3.easeInOut, offsetXPrevIn, offsetYPrevIn))
					.add(hideLines($activeDescription, 0, 0, offsetYPrevIn))
					.add(setButton($link));

			});

			tl
				.add(animateChars($activeHeading, 1.2, 0.3, Power3.easeOut, fromPrevIn))
				.add(animateLines($activeDescription, 1.2, 0.1, Power3.easeOut, fromNextIn), '-=1.2')
				.add(animateChars($activeSubheading, 1.2, 0.3, Power3.easeOut, fromPrevIn), '-=1.2')
				.add(showButton($activeLink), '-=0.9');

		});

	function hideButton() {

		var tl = new TimelineMax();

		if (typeof $link != 'undefined' && $link.length) {
			tl.to($link, 0.6, {
				y: (offsetYNextOut || offsetXNextOut) * (-1) / 2 + 'px',
				autoAlpha: 0,
				// ease: Power3.easeOut
			});
		}

		return tl;

	}

	function showButton($activeLink) {

		var tl = new TimelineMax();

		if (typeof $activeLink != 'undefined' && $activeLink.length) {
			tl.to($activeLink, 0.6, {
				y: '0px',
				autoAlpha: 1,
				// ease: Power3.easeOut
			});
		}

		return tl;

	}

	function setButton() {

		var tl = new TimelineMax();

		if (typeof $link != 'undefined' && $link.length) {
			tl.set($link, {
				y: (offsetYNextIn || offsetXNextIn) / 2 + 'px',
				autoAlpha: 0
			});
		}

		return tl;

	}

}

/* ======================================================================== */
/* 52. sliderHalfScreen */
/* ======================================================================== */
var SliderHalfScreen = function ($slider) {

	if (!$slider.length) {
		return;
	}

	var
		$heading = $slider.find('.slider__heading'),
		$subheading = $slider.find('.slider__subheading'),
		$description = $slider.find('p'),
		$link = $slider.find('.slider-halfscreen__wrapper-button'),
		$sliderImg = $slider.find('.js-slider-halfscreen__images'),
		$sliderContent = $slider.find('.js-slider-halfscreen__content'),
		$inner = $slider.find('.slider__images-slide-inner'),
		sliderSpeed = $sliderImg.data('speed') || 1200,
		overlapFactor = $sliderImg.data('overlap-factor') || 0;

	createSliders();

	function createSliders() {

		var sliderImg = new Swiper($sliderImg, {
			direction: $sliderImg.data('direction') || 'vertical',
			preloadImages: true,
			updateOnImagesReady: true,
			keyboardControl: true,
			lazy: {
				loadPrevNextAmount: 6,
				loadPrevNext: true,
				loadOnTransitionStart: true
			},
			speed: $sliderImg.data('speed') || 1200,
			allowTouchMove: false,
			watchSlidesProgress: true
		});

		var sliderContent = new Swiper($sliderContent, {
			// simulateTouch: false,
			autoHeight: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			autoplay: {
				enabled: $sliderImg.data('autoplay-enabled') || false,
				delay: $sliderImg.data('autoplay-delay') || 6000,
			},
			mousewheel: {
				eventsTarged: '.page-wrapper__content',
				releaseOnEdges: true,
			},
			navigation: {
				nextEl: '.js-slider-halfscreen__next',
				prevEl: '.js-slider-halfscreen__prev',
			},
			pagination: {
				el: '.js-slider-dots',
				type: 'bullets',
				bulletElement: 'div',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'slider__dot_active'
			},
			speed: $sliderImg.data('speed') || 1200,
			allowTouchMove: false,
			breakpoints: {
				992: {
					autoHeight: true
				}
			}
		});

		TweenMax.set($inner, {
			transitionDelay: sliderSpeed + 'ms' || '1200ms'
		});

		renderSliderCounter(
			sliderContent,
			$slider.find('.js-slider-halfscreen__counter-current'),
			'',
			$slider.find('.js-slider-halfscreen__counter-total'),
			sliderImg
		);

		setSliderTextTransitions(sliderContent, sliderImg.params.direction, 25, $heading, $subheading, $description, $link);
		setSliderOverlapEffect(sliderImg, overlapFactor);

	}

}

/* ======================================================================== */
/* 53. sliderFullscreen */
/* ======================================================================== */
var SliderFullScreen = function ($slider) {

	if (!$slider.length) {
		return;
	}

	var
		$heading = $slider.find('.slider__heading'),
		$subheading = $slider.find('.slider__subheading'),
		$description = $slider.find('p'),
		$link = $slider.find('.slider-fullscreen__wrapper-button'),
		$sliderImg = $slider.find('.js-slider-fullscreen__images'),
		$sliderContent = $slider.find('.js-slider-fullscreen__content'),
		$inner = $slider.find('.slider__images-slide-inner'),
		sliderSpeed = $sliderImg.data('speed') || 1200,
		overlapFactor = $sliderImg.data('overlap-factor') || 0;

	createSliders();

	function createSliders() {

		var sliderImg = new Swiper($sliderImg, {
			direction: $sliderImg.data('direction') || 'vertical',
			preloadImages: true,
			updateOnImagesReady: true,
			keyboardControl: true,
			lazy: {
				loadPrevNextAmount: 6,
				loadPrevNext: true,
				loadOnTransitionStart: true
			},
			speed: sliderSpeed,
			allowTouchMove: false,
			watchSlidesProgress: true
		});

		var sliderContent = new Swiper($sliderContent, {
			autoHeight: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: false
			},
			autoplay: {
				disableOnInteraction: false,
				enabled: $sliderImg.data('autoplay-enabled') || true,
				delay: $sliderImg.data('autoplay-delay') || 6000,
			},
			mousewheel: {
				eventsTarged: '.page-wrapper__content',
				releaseOnEdges: true,
			},
			navigation: {
				nextEl: '.js-slider-fullscreen__next',
				prevEl: '.js-slider-fullscreen__prev',
			},
			speed: $sliderImg.data('speed') || 1200,
			allowTouchMove: false,
			pagination: {
				el: '.js-slider-dots',
				type: 'bullets',
				bulletElement: 'div',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'slider__dot_active'
			},
		});

		TweenMax.set($inner, {
			transitionDelay: sliderSpeed + 'ms' || '1200ms'
		});

		renderSliderDots(sliderContent, $slider.find('.js-slider-dots'));
		renderSliderCounter(
			sliderContent,
			$slider.find('.js-slider-fullscreen__counter-current'),
			'',
			$slider.find('.js-slider-fullscreen__counter-total'),
			sliderImg
		);

		setSliderTextTransitions(sliderContent, sliderImg.params.direction, 25, $heading, $subheading, $description, $link);
		setSliderOverlapEffect(sliderImg, overlapFactor);

	}

}

/* ======================================================================== */
/* 54. SliderImages */
/* ======================================================================== */
var SliderImages = function ($scope) {

	var $slider = $scope.find('.js-slider-images');

	if (!$slider.length) {
		return;
	}

	$slider.each(function () {

		var
			$current = $(this),
			$sliderCaptions = $current.find('.js-slider-images__captions'),
			sliderCaptions,
			breakpoints = {},
			lg = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.lg - 1 : 1024,
			md = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.md - 1 : 767;

		breakpoints[lg] = {
			slidesPerView: $current.data('slides-per-view-tablet') || 1.33,
			spaceBetween: $current.data('space-between-tablet') || 20,
			centeredSlides: $current.data('centered-slides-tablet') || true,
		};
		breakpoints[md] = {
			slidesPerView: $current.data('slides-per-view-mobile') || 1.16,
			spaceBetween: $current.data('space-between-mobile') || 10,
			centeredSlides: $current.data('centered-slides-mobile') || true,
		};

		var slider = new Swiper($current, {
			autoHeight: $current.data('auto-height') || false,
			speed: $current.data('speed') || 1200,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true
			},
			observer: true,
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			centeredSlides: $current.data('centered-slides') || false,
			slidesPerView: $current.data('slides-per-view') || 1.5,
			autoplay: {
				disableOnInteraction: false,
				enabled: $current.data('autoplay-enabled') || false,
				delay: $current.data('autoplay-delay') || 6000,
			},
			spaceBetween: $current.data('space-between') || 60,
			pagination: {
				el: '.js-slider-images__dots',
				type: 'bullets',
				bulletElement: 'div',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'slider__dot_active'
			},
			navigation: {
				nextEl: '.js-slider-images__next',
				prevEl: '.js-slider-images__prev',
			},
			breakpoints: breakpoints
		});

		if ($sliderCaptions.length) {

			sliderCaptions = new Swiper($sliderCaptions, {
				autoHeight: true,
				direction: 'vertical',
				// effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
				speed: $current.data('speed') || 1200,
				// slidesPerView: 1,
				// centeredSlides: true,
				allowTouchMove: false,
				watchSlidesProgress: true
			});

		}

		// update height after images are loaded
		slider.on('lazyImageReady', function () {

			setTimeout(function () {
				slider.update();
			}, 300);

		});

		renderSliderDots(slider, $current.find('.js-slider-images__dots'));
		renderSliderCounter(
			slider,
			$current.find('.js-slider-images__counter-current'),
			'',
			$current.find('.js-slider-images__counter-total'),
			sliderCaptions
		);

	});

}

/* ======================================================================== */
/* 55. SliderLetters */
/* ======================================================================== */
var SliderLetters = function ($scope) {

	var
		$SVGLetters = $('.vector-letters'),
		$letters = $SVGLetters.find('.vector-letter'),
		$menuItems = $scope.find('.menu-overlay a'),
		tl = new TimelineMax();

	if (!$SVGLetters.length || !$letters.length) {
		return;
	}

	hoverMenuitems();

	function hoverMenuitems() {

		$menuItems.each(function () {

			var
				$current = $(this),
				currentLetter = $current.data('letter'),
				targetLetter = $letters.filter('#vector-' + currentLetter);

			$current
				.on('mouseenter touchstart', function () {
					tl
						.clear()
						.to($letters[0], 0.6, {
							morphSVG: targetLetter,
							ease: Expo.easeInOut
						});
				});

		});

	}

}

/* ======================================================================== */
/* 56. sliderTestimonials */
/* ======================================================================== */
var SliderTestimonials = function ($target) {

	if (!$target.length) {
		return;
	}

	var
		$footer = $target.parent().find('.js-slider-testimonials__footer'),
		$text = $target.find('.slider-testimonials__text'),
		$author = $target.find('.slider-testimonials__author'),
		$line = $target.find('.slider-testimonials__author-line');

	var slider = new Swiper($target, {
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		allowTouchMove: false,
		direction: 'horizontal',
		autoHeight: true,
		speed: $target.data('speed') || 1200,
		autoplay: {
			disableOnInteraction: false,
			enabled: $target.data('autoplay-enabled') || false,
			delay: $target.data('autoplay-delay') || 6000,
		},
		pagination: {
			el: '.js-slider-testimonials__dots',
			type: 'bullets',
			bulletElement: 'div',
			clickable: true,
			bulletClass: 'slider__dot',
			bulletActiveClass: 'slider__dot_active'
		},
		navigation: {
			nextEl: '.js-slider-testimonials__next',
			prevEl: '.js-slider-testimonials__prev',
		},
	});

	renderSliderDots(slider, $footer.find('.js-slider-testimonials__dots'));
	renderSliderCounter(
		slider,
		$footer.find('.js-slider-testimonials__counter-current'),
		'',
		$footer.find('.js-slider-testimonials__counter-total')
	);
	setSliderTestimonialsTransitions(slider, 'vertical', 20, $text, $author, $line);

}

/* ======================================================================== */
/* 57. SliderProjects */
/* ======================================================================== */
var SliderProjects = function ($scope) {

	var $slider = $scope.find('.js-slider-projects');

	if (!$slider.length) {
		return;
	}

	$slider.each(function () {

		var
			$current = $(this),
			breakpoints = {},
			lg = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.lg - 1 : 1024,
			md = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.md - 1 : 767;

		breakpoints[lg] = {
			slidesPerView: $current.data('slides-per-view-tablet') || 1.33,
			spaceBetween: $current.data('space-between-tablet') || 20,
			centeredSlides: $current.data('centered-slides-tablet') || true,
		};
		breakpoints[md] = {
			slidesPerView: $current.data('slides-per-view-mobile') || 1.33,
			spaceBetween: $current.data('space-between-mobile') || 20,
			centeredSlides: $current.data('centered-slides-mobile') || true,
		};

		var slider = new Swiper($current, {
			autoHeight: $current.data('auto-height') || false,
			speed: $current.data('speed') || 1200,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true
			},
			observer: true,
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			centeredSlides: $current.data('centered-slides') || false,
			slidesPerView: $current.data('slides-per-view') || 4,
			autoplay: {
				disableOnInteraction: false,
				enabled: $current.data('autoplay-enabled') || false,
				delay: $current.data('autoplay-delay') || 6000,
			},
			spaceBetween: $current.data('space-between') || 0,
			pagination: {
				el: '.js-slider-projects__dots',
				type: 'bullets',
				bulletElement: 'div',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'slider__dot_active'
			},
			navigation: {
				nextEl: '.js-slider-projects__next',
				prevEl: '.js-slider-projects__prev',
			},
			breakpoints: breakpoints
		});

		// update height after images are loaded
		slider.on('lazyImageReady', function () {

			setTimeout(function () {
				slider.update();
			}, 300);

		});

		renderSliderDots(slider, $current.find('.js-slider-projects__dots'));
		renderSliderCounter(
			slider,
			$current.find('.js-slider-projects__counter-current'),
			'',
			$current.find('.js-slider-projects__counter-total')
		);

	});

}

/* ======================================================================== */
/* 58. animateChars */
/* ======================================================================== */
function animateChars($target, duration = 1.2, stagger = 0.3, ease = Power3.easeInOut, from) {

	var
		$chars = $target.find('.split-text__char'),
		tl = new TimelineMax();

	if (!$chars.length || $target.hasClass('js-split-text_cancel-animation')) {
		return tl;
	}

	var textAlign = $target.css('text-align');

	if (!from) {

		switch (textAlign) {
			case 'left':
				from = 'start';
				break;
			case 'center':
				from = 'center';
				break;
			case 'right':
				from = 'end';
				break;
		}

	}

	tl.staggerTo($chars, duration, {
		x: '0px',
		y: '0px',
		xPercent: 0,
		yPercent: 0,
		autoAlpha: 1,
		ease: ease,
		stagger: distributeByPosition({
			amount: stagger,
			from: from
		})
	});

	return tl;

}

/* ======================================================================== */
/* 59. animateHeadline */
/* ======================================================================== */
function animateHeadline($target, duration = 1.2, ease = Power3.easeInOut, origin) {

	var
		tl = new TimelineMax();

	if (!$target.length) {
		return tl;
	}

	var textAlign = $target.css('text-align');

	if (!origin) {

		switch (textAlign) {
			case 'left':
				origin = 'left center';
				break;
			case 'center':
				origin = 'center center';
				break;
			case 'right':
				origin = 'right center';
				break;
		}

	}

	tl.to($target, duration, {
		scaleX: 1,
		scaleY: 1,
		transformOrigin: origin,
		ease: ease
	});

	return tl;

}

/* ======================================================================== */
/* 60. animateLines */
/* ======================================================================== */
function animateLines($target, duration = 1.2, stagger = 0.02, ease = Power3.easeOut) {

	var
		tl = new TimelineMax(),
		$lines = $target.find('.split-text__line');

	if (!$lines.length || $target.hasClass('js-split-text_cancel-animation')) {
		return tl;
	}

	tl
		.staggerTo($lines, duration, {
			y: '0px',
			yPercent: 0,
			ease: ease,
			autoAlpha: 1,
		}, stagger);

	return tl;

}

/* ======================================================================== */
/* 61. distributeByPosition */
/* ======================================================================== */
/*
pass in an object with any of the following optional properties (just like the stagger special object):
{
  amount: amount (in seconds) that should be distributed
  from: "center" | "end" | "start" | index value (integer)
  ease: any ease, like Power1.easeOut
  axis: "x" | "y" (or omit, and it'll be based on both the x and y positions)
}
*/
function distributeByPosition(vars) {
	var ease = vars.ease,
		from = vars.from || 0,
		base = vars.base || 0,
		axis = vars.axis,
		ratio = {
			center: 0.5,
			end: 1
		} [from] || 0,
		distances;
	return function (i, target, a) {
		var l = a.length,
			originX, originY, x, y, d, j, minX, maxX, minY, maxY, positions;
		if (!distances) {
			distances = [];
			minX = minY = Infinity;
			maxX = maxY = -minX;
			positions = [];
			for (j = 0; j < l; j++) {
				d = a[j].getBoundingClientRect();
				x = (d.left + d.right) / 2; //based on the center of each element
				y = (d.top + d.bottom) / 2;
				if (x < minX) {
					minX = x;
				}
				if (x > maxX) {
					maxX = x;
				}
				if (y < minY) {
					minY = y;
				}
				if (y > maxY) {
					maxY = y;
				}
				positions[j] = {
					x: x,
					y: y
				};
			}
			originX = isNaN(from) ? minX + (maxX - minX) * ratio : positions[from].x || 0;
			originY = isNaN(from) ? minY + (maxY - minY) * ratio : positions[from].y || 0;
			maxX = 0;
			minX = Infinity;
			for (j = 0; j < l; j++) {
				x = positions[j].x - originX;
				y = originY - positions[j].y;
				distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs((axis === "y") ? y : x);
				if (d > maxX) {
					maxX = d;
				}
				if (d < minX) {
					minX = d;
				}
			}
			distances.max = maxX - minX;
			distances.min = minX;
			distances.v = l = vars.amount || (vars.each * l) || 0;
			distances.b = (l < 0) ? base - l : base;
		}
		l = (distances[i] - distances.min) / distances.max;
		return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
	};
}

/* ======================================================================== */
/* 62. doSplitText */
/* ======================================================================== */
function doSplitText($target = window.$document) {

	return new Promise(function (resolve, reject) {

		var
			$texts = $target.find('.js-split-text'),
			$content,
			type;

		if (!$texts.length) {
			resolve(true);
			return;
		}

		$texts.each(function () {

			var $current = $(this);

			type = $current.data('split-text-type');
			$content = $current;

			if ($current.children(':not(br)').length > 0) {
				$content = $current.find('> *');
			}

			new SplitText($content, {
				type: type,
				linesClass: 'split-text__line',
				wordsClass: 'split-text__word',
				charsClass: 'split-text__char'
			});

			$current.removeClass('js-split-text');

		});

		resolve(true);

	});

}

/* ======================================================================== */
/* 63. hideChars */
/* ======================================================================== */
function hideChars($target, duration = 1.2, stagger = 0.3, ease = Power3.easeInOut, x = 0, y = 100, from) {

	var tl = new TimelineMax();

	if (typeof $target == 'undefined' || !$target.length) {
		return tl;
	}

	var
		$chars = $target.find('.split-text__char'),
		textAlign = $target.css('text-align');

	if (!from) {

		switch (textAlign) {
			case 'left':
				from = 'start';
				break;
			case 'center':
				from = 'center';
				break;
			case 'right':
				from = 'end';
				break;
		}

	}

	tl.staggerTo($chars, duration, {
		x: x,
		y: y,
		autoAlpha: 0,
		ease: ease,
		stagger: distributeByPosition({
			amount: stagger,
			from: from
		})
	});

	return tl;

}

/* ======================================================================== */
/* 64. hideLines */
/* ======================================================================== */
function hideLines($target, duration = 0.6, stagger = 0.02, offset = '-100%', ease = Power3.easeInOut, reverse) {

	var
		tl = new TimelineMax(),
		$lines = $target.find('.split-text__line');

	if (reverse) {
		$lines = $lines.get().reverse();
	}

	if ($lines.length) {

		tl.staggerTo($lines, duration, {
			y: offset,
			autoAlpha: 0,
			ease: ease
		}, stagger);

	};

	return tl;

}

/* ======================================================================== */
/* 65. hideWords */
/* ======================================================================== */
function hideWords($target, duration = 0.6, stagger = 0.02, offset = -30, reverse, masterStagger, direction = 'x') {

	var masterTL = new TimelineMax();

	if ($target.length) {

		$target.each(function () {

			var
				tl = new TimelineMax(),
				$chars = $(this).find('.split-chars__char'),
				options = {};

			if (reverse) {
				$chars = $chars.get().reverse();
			}

			if (!masterStagger) {
				masterStagger = '-=' + duration;
			}

			if (direction == 'x') {
				options = {
					x: offset,
					autoAlpha: 0
				};
			} else {
				options = {
					y: offset,
					autoAlpha: 0
				}
			}

			tl.staggerTo($chars, duration, options, stagger);

			masterTL.add(tl, masterStagger);
		});

	};

	return masterTL;

}

/* ======================================================================== */
/* 66. hideWordsVertical */
/* ======================================================================== */
function hideWordsVertical($target, duration = 0.6, stagger = 0.02, offset = -30, reverse, masterStagger) {

	var masterTL = new TimelineMax();

	if ($target.length) {

		$target.each(function () {

			var
				tl = new TimelineMax(),
				$chars = $(this).find('.split-chars__char');

			if (reverse) {
				$chars = $chars.get().reverse();
			}

			if (!masterStagger) {
				masterStagger = '-=' + duration;
			}

			tl.staggerTo($chars, duration, {
				y: offset,
				autoAlpha: 0
			}, stagger);

			masterTL.add(tl, masterStagger);
		});

	};

	return masterTL;

}

/* ======================================================================== */
/* 67. setChars */
/* ======================================================================== */
function setChars($scope = window.$document, x = '50', y = 0, from) {

	return new Promise(function (resolve, reject) {

		var $target = $scope.find('[data-split-text-set="chars"]');

		if (!$target.length) {
			resolve(true);
			return;
		}

		TweenMax.set($target, {
			clearProps: 'all'
		});

		$target.each(function () {

			var
				$current = $(this),
				$lines = $current.find('.split-text__line'),
				textAlign = $current.css('text-align');

			if (!from) {

				switch (textAlign) {
					case 'left':
						setFromLeft($lines);
						break;
					case 'center':
						setFromCenter($lines);
						break;
					case 'right':
						setFromRight($lines);
						break;
				}

			}

		});

		function setFromLeft($lines) {

			if (!$lines || !$lines.length) {
				return;
			}

			var $chars = $lines.find('.split-text__char');

			TweenMax.set($chars, {
				x: x + 'px',
				y: y + 'px',
				autoAlpha: 0
			});

			resolve(true);

		}

		function setFromCenter($lines) {

			if (!$lines || !$lines.length) {
				return;
			}

			$lines.each(function () {

				var
					$currentLine = $(this),
					$wordsInCurrentLine = $currentLine.find('.split-text__word');

				// only 1 word in the current line
				if ($wordsInCurrentLine.length === 1) {

					var
						$charsInWord = $wordsInCurrentLine.find('.split-text__char'),
						halfWord = Math.ceil($charsInWord.length / 2),
						$fistHalfWord = $charsInWord.slice(0, halfWord),
						$secondHalfWord = $charsInWord.slice(halfWord, $charsInWord.length);

					TweenMax.set($fistHalfWord, {
						x: x * (-1) + 'px',
						y: y * (-1) + 'px',
						autoAlpha: 0
					});

					TweenMax.set($secondHalfWord, {
						x: x + 'px',
						y: y + 'px',
						autoAlpha: 0
					});

				}

				// odd number of words in line
				if ($wordsInCurrentLine.length !== 1 && $wordsInCurrentLine.length % 2 !== 0) {


					var
						halfLine = Math.ceil($wordsInCurrentLine.length / 2),
						$fistHalf = $wordsInCurrentLine.slice(0, halfLine),
						$secondHalf = $wordsInCurrentLine.slice(halfLine, $wordsInCurrentLine.length),
						$middleWord = $wordsInCurrentLine.eq(halfLine - 1),
						$charsInMiddleWord = $middleWord.find('.split-text__char'),
						halfLineMiddleWord = Math.ceil($charsInMiddleWord.length / 2),
						$fistHalfMiddleWord = $charsInMiddleWord.slice(0, halfLineMiddleWord),
						$secondHalfMiddleWord = $charsInMiddleWord.slice(halfLineMiddleWord, $charsInMiddleWord.length);

					// first half
					$fistHalf.each(function () {

						var $charsInWord = $(this).find('.split-text__char');

						TweenMax.set($charsInWord, {
							x: x * (-1) + 'px',
							y: y * (-1) + 'px',
							autoAlpha: 0
						});

					});

					// second half
					$secondHalf.each(function () {

						var $charsInWord = $(this).find('.split-text__char');

						TweenMax.set($charsInWord, {
							x: x + 'px',
							y: y + 'px',
							autoAlpha: 0
						});

					});

					// middle word first half
					$fistHalfMiddleWord.each(function () {

						var $charsInWord = $(this);
						TweenMax.set($charsInWord, {
							x: x * (-1) + 'px',
							y: y * (-1) + 'px',
							autoAlpha: 0
						});

					});

					// middle word second half
					$secondHalfMiddleWord.each(function () {

						var $charsInWord = $(this);
						TweenMax.set($charsInWord, {
							x: x + 'px',
							y: y + 'px',
							autoAlpha: 0
						});

					});

				}

				// even number of words in line
				if ($wordsInCurrentLine.length !== 1 && $wordsInCurrentLine.length % 2 === 0) {

					var
						halfLine = Math.ceil($wordsInCurrentLine.length / 2),
						$fistHalf = $wordsInCurrentLine.slice(0, halfLine),
						$secondHalf = $wordsInCurrentLine.slice(halfLine, $wordsInCurrentLine.length);

					// first half
					$fistHalf.each(function () {

						var $charsInWord = $(this).find('.split-text__char');

						TweenMax.set($charsInWord, {
							x: x * (-1) + 'px',
							y: y * (-1) + 'px',
							autoAlpha: 0
						});

					});

					// second half
					$secondHalf.each(function () {

						var $charsInWord = $(this).find('.split-text__char');

						TweenMax.set($charsInWord, {
							x: x + 'px',
							y: y + 'px',
							autoAlpha: 0
						});

					});

				}

			});

			resolve(true);

		}

		function setFromRight($lines) {

			if (!$lines || !$lines.length) {
				return;
			}

			var $chars = $lines.find('.split-text__char');

			TweenMax.set($chars, {
				x: x * (-1) + 'px',
				y: y * (-1) + 'px',
				autoAlpha: 0
			});

			resolve(true);

		}

	});

}

/* ======================================================================== */
/* 68. setLines */
/* ======================================================================== */
function setLines($target = window.$document, offset = '100%') {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax(),
			$lines = $target.find('[data-split-text-set="lines"] .split-text__line');

		if (!$lines.length) {
			resolve(true);
			return;
		}

		tl
			.set($lines, {
				y: offset,
				autoAlpha: 0
			})
			.add(function () {
				resolve(true);
			});

	});

}

/* ======================================================================== */
/* 69. debounce */
/* ======================================================================== */
function debounce(func, wait, immediate) {

	var timeout;

	return function () {

		var
			context = this,
			args = arguments;

		var later = function () {

			timeout = null;

			if (!immediate) {
				func.apply(context, args)
			};

		};

		var callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args)
		};

	};

};

/* ======================================================================== */
/* 70. fixMobileBarHeight */
/* ======================================================================== */
function fixMobileBarHeight() {

	var vh;

	/**
	 * Initial set
	 */
	createStyleElement();
	setVh();

	/**
	 * Resize handling (with debounce)
	 */
	$(window).on('resize', debounce(function () {
		setVh();
	}, 250));

	/**
	 * 100vh elements height correction
	 */
	function setVh() {

		vh = window.innerHeight * 0.01;

		$('#cassio-fix-bar').html(':root { --fix-bar-vh: ' + vh + 'px; }');

	}

	function createStyleElement() {

		if (!$('#cassio-fix-bar').length) {
			$('head').append('<style id=\"cassio-fix-bar\"></style>');
		}

	}

}

/* ======================================================================== */
/* 71. isAnchor */
/* ======================================================================== */
function checkIsAnchor($el) {

	var link = $el.attr('href');

	if ($el.length && link.length && link !== '#') {

		return true;

	}

	return false;

}

/* ======================================================================== */
/* 72. runOnHighPerformanceGPU */
/* ======================================================================== */
function runOnHighPerformanceGPU() {

	var webGLCanvas = document.getElementById('js-webgl');

	if (typeof webGLCanvas !== 'undefined' && webGLCanvas !== null) {
		webGLCanvas.getContext('webgl', {
			powerPreference: 'high-performance'
		});
	}

}

/* ======================================================================== */
/* 73. syncAttributes */
/* ======================================================================== */
function syncAttributes($sourceElement, $targetElement) {

	if (!$sourceElement.length || !$targetElement.length) {
		return;
	}

	var sourceAttrs = $sourceElement.getAllAttributes();

	$targetElement.attr(sourceAttrs);

}


})(jQuery);

//# sourceMappingURL=components.js.map
