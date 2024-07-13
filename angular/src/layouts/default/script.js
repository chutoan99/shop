$(function () {
	$('.menu-link').click(function () {
		console.log('nv')
		$('.menu-link').removeClass('is-active')
		$(this).addClass('is-active')
	})
})

$(function () {
	$('.main-header-link').click(function () {
		console.log('nv')
		$('.main-header-link').removeClass('is-active')
		$(this).addClass('is-active')
	})
})

const dropdowns = document.querySelectorAll('.dropdown')
dropdowns.forEach((dropdown) => {
	dropdown.addEventListener('click', (e) => {
		console.log('nv')
		e.stopPropagation()
		dropdowns.forEach((c) => c.classList.remove('is-active'))
		dropdown.classList.add('is-active')
	})
})

$('.search-bar input')
	.focus(function () {
		$('.header').addClass('wide')
	})
	.blur(function () {
		$('.header').removeClass('wide')
	})

$(document).click(function (e) {
	console.log('nv')
	var container = $('.status-button')
	var dd = $('.dropdown')
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		dd.removeClass('is-active')
	}
})

$(function () {
	$('.dropdown').on('click', function (e) {
		console.log('nv')

		$('.content-wrapper').addClass('overlay')
		e.stopPropagation()
	})
	$(document).on('click', function (e) {
		if ($(e.target).is('.dropdown') === false) {
			$('.content-wrapper').removeClass('overlay')
		}
	})
})

$(function () {
	$('.status-button:not(.open)').on('click', function (e) {
		console.log('nv')

		$('.overlay-app').addClass('is-active')
	})
	$('.pop-up .close').click(function () {
		console.log('nv')

		$('.overlay-app').removeClass('is-active')
	})
})

$('.status-button:not(.open)').click(function () {
	console.log('nv')

	$('.pop-up').addClass('visible')
})

$('.pop-up .close').click(function () {
	console.log('nv')

	$('.pop-up').removeClass('visible')
})

const toggleButton = document.querySelector('.dark-light')

toggleButton.addEventListener('click', () => {
	document.body.classList.toggle('light-mode')
})
